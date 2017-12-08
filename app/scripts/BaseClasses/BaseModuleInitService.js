// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseModuleInitService, BaseService,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');


  /*
    @name socrat.Module
    @desc Base class for module prototyping
    @deps Requires injection of BaseModuleMessageService
   */

  module.exports = BaseModuleInitService = (function(superClass) {
    extend(BaseModuleInitService, superClass);

    function BaseModuleInitService() {
      return BaseModuleInitService.__super__.constructor.apply(this, arguments);
    }

    BaseModuleInitService.prototype.initialize = function() {
      return this.sb = null;
    };

    BaseModuleInitService.prototype.init = function(sb) {
      console.log('module init invoked');
      if (this.msgService != null) {
        if (!(sb == null)) {
          this.msgService.setSb(sb);
        }
        return true;
      } else {
        console.log('module cannot init: message service is not injected');
        return false;
      }
    };

    BaseModuleInitService.prototype.destroy = function() {};

    BaseModuleInitService.prototype.setMsgList = function() {
      if (!(this.msgService == null)) {
        return this.msgList = this.msgService.getMsgList();
      }
    };

    BaseModuleInitService.prototype.getMsgList = function() {
      if (this.msgList != null) {
        return this.msgList;
      } else {
        return false;
      }
    };

    return BaseModuleInitService;

  })(BaseService);

}).call(this);

//# sourceMappingURL=BaseModuleInitService.js.map