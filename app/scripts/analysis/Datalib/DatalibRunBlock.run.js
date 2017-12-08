// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, DatalibRunBlock;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');


  /*
    @name DatalibRunBlock
    @desc Class for datalib run block
   */

  module.exports = DatalibRunBlock = (function() {
    function DatalibRunBlock(module1) {
      this.module = module1;
    }

    DatalibRunBlock.prototype.register = function() {
      return this.module.run(this.getDlRunBlock());
    };

    DatalibRunBlock.prototype.getDlRunBlock = function() {
      var runBlock;
      runBlock = function(app_analysis_datalib_api) {
        app_analysis_datalib_api.initDl();
        return console.log('dl: run block');
      };
      runBlock.$inject = ['app_analysis_datalib_api'];
      return runBlock;
    };

    return DatalibRunBlock;

  })();

}).call(this);

//# sourceMappingURL=DatalibRunBlock.run.js.map