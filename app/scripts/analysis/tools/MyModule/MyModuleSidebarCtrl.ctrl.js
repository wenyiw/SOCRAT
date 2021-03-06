// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseCtrl, MyModuleSidebarCtrl,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseCtrl = require('scripts/BaseClasses/BaseController.coffee');

  module.exports = MyModuleSidebarCtrl = (function(superClass) {
    extend(MyModuleSidebarCtrl, superClass);

    function MyModuleSidebarCtrl() {
      return MyModuleSidebarCtrl.__super__.constructor.apply(this, arguments);
    }

    MyModuleSidebarCtrl.inject('app_analysis_mymodule_dataService', 'app_analysis_mymodule_msgService', '$scope', '$timeout');

    MyModuleSidebarCtrl.prototype.initialize = function() {
      this.dataService = this.app_analysis_mymodule_dataService;
      this.msgService = this.app_analysis_mymodule_msgService;
      this.DATA_TYPES = this.dataService.getDataTypes();
      return this.dataService.getData().then((function(_this) {
        return function(obj) {
          if (obj.dataFrame && (obj.dataFrame.dataType != null) && obj.dataFrame.dataType === _this.DATA_TYPES.FLAT) {
            if (_this.dataType !== obj.dataFrame.dataType) {
              _this.dataType = obj.dataFrame.dataType;
              _this.msgService.broadcast('MyModule:updateDataType', obj.dataFrame.dataType);
            }
            _this.dataFrame = obj.dataFrame;
            return _this.parseData(obj.dataFrame);
          } else {

          }
        };
      })(this));
    };

    return MyModuleSidebarCtrl;

  })(BaseCtrl);

}).call(this);

//# sourceMappingURL=MyModuleSidebarCtrl.ctrl.js.map
