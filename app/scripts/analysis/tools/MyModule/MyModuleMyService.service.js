// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, MyModuleMyService,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');

  module.exports = MyModuleMyService = (function(superClass) {
    extend(MyModuleMyService, superClass);

    function MyModuleMyService() {
      return MyModuleMyService.__super__.constructor.apply(this, arguments);
    }

    MyModuleMyService.prototype.initialize = function() {};

    MyModuleMyService.prototype.showAlert = function() {
      return alert('I pray Thee, O Developer, that I may be beautiful within.');
    };

    return MyModuleMyService;

  })(BaseService);

}).call(this);

//# sourceMappingURL=MyModuleMyService.service.js.map
