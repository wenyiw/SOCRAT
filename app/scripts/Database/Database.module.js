// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var Module, db;

  Module = require('scripts/BaseClasses/BaseModule.coffee');

  module.exports = db = new Module({
    id: 'app_analysis_database',
    components: {
      services: {
        'app_analysis_database_initService': require('scripts/Database/DatabaseInit.service.coffee'),
        'app_analysis_database_msgService': require('scripts/Database/DatabaseMsgService.service.coffee'),
        'app_analysis_database_dataAdaptor': require('scripts/Database/DatabaseDataAdaptor.service.coffee'),
        'app_analysis_database_nestedStorage': require('scripts/Database/DatabaseNestedStorage.service.coffee'),
        'app_analysis_database_dv': require('scripts/Database/DatabaseDatavore.service.coffee'),
        'app_analysis_database_handler': require('scripts/Database/DatabaseHandler.service.coffee')
      },
      runBlock: require('scripts/Database/DatabaseRunBlock.run.coffee')
    }
  });

}).call(this);

//# sourceMappingURL=Database.module.js.map