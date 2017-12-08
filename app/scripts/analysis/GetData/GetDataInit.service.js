// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseModuleInitService, GetDataInitService,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModuleInitService = require('scripts/BaseClasses/BaseModuleInitService.coffee');

  module.exports = GetDataInitService = (function(superClass) {
    extend(GetDataInitService, superClass);

    function GetDataInitService() {
      return GetDataInitService.__super__.constructor.apply(this, arguments);
    }

    GetDataInitService.inject('app_analysis_getData_msgService');

    GetDataInitService.prototype.initialize = function() {
      this.msgService = this.app_analysis_getData_msgService;
      return this.setMsgList();
    };

    return GetDataInitService;

  })(BaseModuleInitService);

}).call(this);

//# sourceMappingURL=GetDataInit.service.js.map