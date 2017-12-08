// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, DatalibWrapper,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');


  /*
    @name: DatalibWrapper
    @desc: Wrapper class for Datalib library
   */

  module.exports = DatalibWrapper = (function(superClass) {
    extend(DatalibWrapper, superClass);

    function DatalibWrapper() {
      return DatalibWrapper.__super__.constructor.apply(this, arguments);
    }

    DatalibWrapper.prototype.initialize = function() {
      return this.dl = require('datalib');
    };

    DatalibWrapper.prototype.typeInfer = function(data, accessor) {
      if (accessor == null) {
        accessor = null;
      }
      return this.dl.type.infer(data, accessor);
    };

    DatalibWrapper.prototype.typeInferAll = function(data, accessor) {
      if (accessor == null) {
        accessor = null;
      }
      return this.dl.type.inferAll(data, accessor);
    };

    return DatalibWrapper;

  })(BaseService);

}).call(this);

//# sourceMappingURL=DatalibWrapper.service.js.map