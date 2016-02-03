'use strict';

import Reflux from 'reflux';
import ServiceAction from '../actions/servicesAction';
import {Endpoints} from '../constants/endpoints';
import $ from 'jquery';
import dicoogleClient from 'dicoogle-client';

const Dicoogle = dicoogleClient();

const ServicesStore = Reflux.createStore({
    listenables: ServiceAction,
    init: function () {
       this._storageRunning = false;
       this._storagePort = 0;
       this._storageAutostart = false;
       this._queryRunning = false;
       this._queryPort = 0;
       this._queryAutostart = false;

      this._querySettings = {
        acceptTimeout: "...",
        connectionTimeout: "...",
        idleTimeout: "...",
        maxAssociations: "...",
        maxPduReceive: "...",
        maxPduSend: "...",
        responseTimeout: "..."
      };

      this._contents = {
        storageRunning: false,
        storagePort: 0,
        storageAutostart: false,
        queryRunning: false,
        queryPort: 0,
        queryAutostart: false,
        querySettings: this._querySettings
       };
    },

    onGetStorage() {
      Dicoogle.getStorageServiceStatus((error, data) => {
        if (error) {
          console.log("onGetStoreage: failure", error);
          return;
        }

        this._contents.storageRunning = data.isRunning;
        this._contents.storagePort = data.port;
        this._contents.storageAutostart = data.autostart;
        this.trigger(this._contents);
      });
    },

    onGetQuery() {
      Dicoogle.getQueryRetrieveServiceStatus((error, data) => {
        if (error) {
          console.log("onGetStoreage: failure");
          return;
        }

        this._contents.queryRunning = data.isRunning;
        this._contents.queryPort = data.port;
        this._contents.queryAutostart = data.autostart;
        this.trigger(this._contents);
      });
    },
    onSetStorage: function(running){
      let self = this;
      $.post(Endpoints.base + "/management/dicom/storage", { running }, function(data, status){
          //Response
          console.log("Data: " + data + "\nStatus: " + status);
          self._contents.storageRunning = running;
          self.trigger(self._contents);
        });
    },
    onSetStorageAutostart (enabled) {
      let self = this;
      $.post(Endpoints.base + "/management/dicom/storage",
      {
        autostart: enabled
      },
        function(data, status){
          console.log("Data: " + data + "\nStatus: " + status);
          self._contents.storageAutostart = enabled;
          self.trigger(self._contents);
        });
    },
    onSetQuery: function(state){
      var self = this;
      console.log(state);
      $.post(Endpoints.base + "/management/dicom/query",
      {
        running: state
      },
        function(data, status) {
          //Response
          console.log("Data: " + data + "\nStatus: " + status);
          self._contents.queryRunning = state;
          self.trigger(self._contents);

        });
    },
    onSetQueryAutostart (enabled) {
      let self = this;
      $.post(Endpoints.base + "/management/dicom/query",
      {
        autostart: enabled
      },
        function(data, status){
          console.log("Data: " + data + "\nStatus: " + status);
          self._contents.queryAutostart = enabled;
          self.trigger(self._contents);
        });
    },

    onGetQuerySettings: function() {
      Dicoogle.request('GET', ['management', 'settings', 'dicom', 'query'], {}, (error, data) => {
        if (error) {
          console.log("onGetQuerySettings: failure");
          return;
        }
        if (typeof data.text === 'string') {
          data = JSON.parse(data.text);
        }
        this._querySettings = data;
        this._contents.querySettings = this._querySettings;
        this.trigger(this._contents);
      });
    },
  onSaveQuerySettings: function(connectionTimeout, acceptTimeout, idleTimeout, maxAssociations, maxPduReceive, maxPduSend, responseTimeout) {
    $.post(Endpoints.base + "/management/settings/dicom/query",
    {
      connectionTimeout,
      acceptTimeout,
      idleTimeout,
      maxAssociations,
      maxPduReceive,
      maxPduSend,
      responseTimeout
    },
      function(data, status){
        //Response
        console.log("Data: " + data + "\nStatus: " + status);
      });
  }

});

export default ServicesStore;
