// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, ChartsCheckTime,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');

  module.exports = ChartsCheckTime = (function(superClass) {
    extend(ChartsCheckTime, superClass);

    function ChartsCheckTime() {
      this.arrayDate = bind(this.arrayDate, this);
      return ChartsCheckTime.__super__.constructor.apply(this, arguments);
    }

    ChartsCheckTime.prototype.initialize = function() {
      return this.formats = ["MM/DD/YYYY", "M/DD/YYYY", "M/D/YYYY", "MM/DD/YY", "M/DD/YY", "M/D/YY", "L", "l", "DD-MMM-YY", "D-MMM-YY", "DDD-MMM-YYYY"];
    };

    ChartsCheckTime.prototype.arrayDate = function(array) {
      var i, j, ref;
      for (i = j = 0, ref = array.length; j < ref; i = j += 1) {
        if (!moment(array[i].value, this.formats, true).isValid()) {
          return false;
        }
      }
      return true;
    };

    ChartsCheckTime.prototype.checkData = function(data) {
      return data.filter(this.arrayDate);
    };

    ChartsCheckTime.prototype.checkForTime = function(data) {
      if (this.checkData(data).length === 0) {
        return false;
      }
      return true;
    };

    ChartsCheckTime.prototype.checkTimeChoice = function(data) {
      var time;
      time = data.map(function(d) {
        return d.x;
      });
      if (!arrayDate(d3.entries(time))) {
        return alert("x is not a time variable");
      }
    };

    return ChartsCheckTime;

  })(BaseService);

}).call(this);

//# sourceMappingURL=ChartsCheckTime.service.js.map