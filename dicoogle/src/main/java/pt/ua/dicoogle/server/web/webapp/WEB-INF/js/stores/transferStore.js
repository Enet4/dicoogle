'use strict';

import Reflux from 'reflux';
import {TransferActions} from '../actions/transferActions';
import {getTransferSettings} from '../handlers/requestHandler';

const TransferStore = Reflux.createStore({
    listenables: TransferActions,
    init: function () {
       this._contents = {};
    },

    onGet: function() {
      console.log("onGet");
      //Check if store is a non-empty object
      if(Object.keys(this._contents).length !== 0) {
        this.trigger({
          data: this._contents,
          success: true
        });
        return;
      }
      getTransferSettings((error, data) => {
          if (error) {
            //FAILURE
            this.trigger({
                success: false,
                status: error.status
              });
            return;
          }
          //SUCCESS
          console.log("success", data);
          this._contents = data;

          this.trigger({
            data: this._contents,
            success: true
          });
      });
    },

    onSet: function(index, indexOption, value){
      console.log(this._contents);
      console.log("sdf: ", index);

      this._contents[index].options[indexOption].value = value;
      this.trigger({
        data: this._contents,
        success: true
      });
    }
});

export {TransferStore};
