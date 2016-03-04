'use strict';

import Reflux from 'reflux';
import $ from 'jquery';

import {ExportActions} from '../actions/exportActions';
import {Endpoints} from '../constants/endpoints';
import {getDICOMFieldList} from '../handlers/requestHandler';

const ExportStore = Reflux.createStore({
    listenables: ExportActions,
    init: function () {
       this._contents = {};
    },

    onGetFieldList: function(data){
      const self = this;
      getDICOMFieldList((error, data) => {
        if (error) {
          //FAILURE
          self.trigger({
              success: false,
              status: error.status
            });
          return;
        }

        //SUCCESS
        //console.log("success", data);
        self._contents = data;

        self.trigger({
          data: self._contents,
          success: true
        });
      });
    },

    onExportCSV: function(data, fields){

      var freetext = data.text;
      var isKeyword = data.keyword;
      if(data.text.length === 0)
      {
        freetext = "*:*";
        isKeyword = true;
      }

      console.log(fields);
      $.post(Endpoints.base + "/exportFile",
      {
        query: freetext,
        keyword: isKeyword,
        fields: JSON.stringify(fields)
      },
        function(data, status){
          //Response
          var response = JSON.parse(data);
          console.log("\NUID: " + response.uid);
          var link = document.createElement("a");
          link.download = "file";
          link.href = Endpoints.base + "/exportFile?UID=" + response.uid;
          link.click();
        });

    }
});

export {ExportStore};
