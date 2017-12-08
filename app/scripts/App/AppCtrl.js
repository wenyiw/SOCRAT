// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var AppCtrl, BaseCtrl, appControllers,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseCtrl = require('scripts/BaseClasses/BaseController.coffee');

  appControllers = angular.module('app_controllers');

  module.extend = AppCtrl = (function(superClass) {
    extend(AppCtrl, superClass);

    function AppCtrl() {
      return AppCtrl.__super__.constructor.apply(this, arguments);
    }

    AppCtrl.register(appControllers);

    AppCtrl.inject('$scope', '$location', '$resource', '$rootScope');

    AppCtrl.prototype.initialize = function() {
      this.menu = [];
      this.$scope.$on('change in view', (function(_this) {
        return function() {
          return _this.$scope.$broadcast('update view', null);
        };
      })(this));
      this.$scope.$on('app:set_menu', (function(_this) {
        return function(event, data) {
          console.log('app: creating menu');
          return _this.menu = data;
        };
      })(this));
      this.$rootScope.$broadcast('app:get_menu');
      this.username = 'Guest';
      return this.$scope.$watch('$location.path()', (function(_this) {
        return function(path) {
          return _this.activeNavId = path || '/';
        };
      })(this));
    };

    AppCtrl.prototype.getNavbar = function() {
      this.navbar = require('partials/analysis-nav.jade')();
      return this.navbar;
    };

    AppCtrl.prototype.getClass = function(id) {
      console.log(id);
      if (this.activeNavId.substring(0, id.length) === id) {
        return 'active';
      } else {
        return '';
      }
    };

    return AppCtrl;

  })(BaseCtrl);

}).call(this);

//# sourceMappingURL=AppCtrl.js.map