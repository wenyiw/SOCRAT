// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseModuleDataService, GetDataDataService,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModuleDataService = require('scripts/BaseClasses/BaseModuleDataService.coffee');

  module.exports = GetDataDataService = (function(superClass) {
    extend(GetDataDataService, superClass);

    function GetDataDataService() {
      return GetDataDataService.__super__.constructor.apply(this, arguments);
    }

    GetDataDataService.inject('$q', 'app_analysis_getData_msgService');

    GetDataDataService.prototype.initialize = function() {
      this.msgManager = this.app_analysis_getData_msgService;
      this.getDataRequest = this.msgManager.getMsgList().outgoing[0];
      this.getDataResponse = this.msgManager.getMsgList().incoming[0];
      return this.saveDataMsg = this.msgManager.getMsgList().outgoing[1];
    };

    return GetDataDataService;

  })(BaseModuleDataService);

}).call(this);

//# sourceMappingURL=GetDataDataService.service.js.map