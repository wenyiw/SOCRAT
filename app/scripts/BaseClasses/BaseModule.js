// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';

  /*
    @name Module
    @desc Base class for SOCRAT module prototyping
   */
  var Module;

  module.exports = Module = (function() {
    function Module(options) {
      var module, ref, ref1, ref2, ref3;
      this.id = (ref = options.id) != null ? ref : null, this.components = (ref1 = options.components) != null ? ref1 : this.defaultComponents, this.state = (ref2 = options.state) != null ? ref2 : this.defaultState, this.deps = (ref3 = options.deps) != null ? ref3 : [];
      if (!(this.id == null)) {
        module = angular.module(this.id, this.deps);
      }
    }

    Module.defaultComponents = {
      services: {
        initService: null,
        messageService: null
      },
      controllers: [],
      directives: [],
      runBlock: null
    };

    Module.defaultState = {
      id: null,
      url: null,
      views: {
        main: {
          template: null
        },
        sidebar: {
          template: null
        }
      }
    };

    return Module;

  })();

}).call(this);

//# sourceMappingURL=BaseModule.js.map