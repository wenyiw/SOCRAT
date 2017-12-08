// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, GetDataShowState,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');


  /*
    @name: GetDataShowState
    @desc: Helps sidebar accordion to keep in sync with the main div
   */

  module.exports = GetDataShowState = (function(superClass) {
    extend(GetDataShowState, superClass);

    function GetDataShowState() {
      return GetDataShowState.__super__.constructor.apply(this, arguments);
    }

    GetDataShowState.prototype.initialize = function() {
      this.obj = null;
      return this.scope = null;
    };

    GetDataShowState.prototype.create = function(obj, scope) {
      var i, j, len, ref;
      if (arguments.length === 0) {
        return false;
      }
      this.obj = obj;
      this.scope = scope;
      this.scope.showState = [];
      ref = this.obj;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        this.scope.showState[i] = true;
      }
      return {
        set: (function(_this) {
          return function(index) {
            var k, len1, ref1, results;
            if (_this.scope.showState[index] != null) {
              ref1 = _this.obj;
              results = [];
              for (k = 0, len1 = ref1.length; k < len1; k++) {
                i = ref1[k];
                if (i === index) {
                  results.push(_this.scope.showState[index] = false);
                } else {
                  results.push(_this.scope.showState[i] = true);
                }
              }
              return results;
            }
          };
        })(this)
      };
    };

    return GetDataShowState;

  })(BaseService);

}).call(this);

//# sourceMappingURL=GetDataShowState.service.js.map