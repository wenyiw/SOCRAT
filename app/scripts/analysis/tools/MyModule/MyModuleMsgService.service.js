// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseModuleMessageService, MyModuleMsgService,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModuleMessageService = require('scripts/BaseClasses/BaseModuleMessageService.coffee');

  module.exports = MyModuleMsgService = (function(superClass) {
    extend(MyModuleMsgService, superClass);

    function MyModuleMsgService() {
      return MyModuleMsgService.__super__.constructor.apply(this, arguments);
    }

    MyModuleMsgService.prototype.msgList = {
      outgoing: ['mymodule:getData'],
      incoming: ['mymodule:receiveData'],
      scope: ['app_analysis_mymodule']
    };

    return MyModuleMsgService;

  })(BaseModuleMessageService);

}).call(this);

//# sourceMappingURL=MyModuleMsgService.service.js.map
