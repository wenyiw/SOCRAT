// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var Module, reliability;

  Module = require('scripts/BaseClasses/BaseModule.coffee');

  module.exports = reliability = new Module({
    id: 'app_analysis_reliability',
    components: {
      services: {
        'app_analysis_reliability_initService': require('scripts/analysis/tools/Reliability/ReliabilityInit.service.coffee'),
        'app_analysis_reliability_msgService': require('scripts/analysis/tools/Reliability/ReliabilityMsgService.service.coffee'),
        'app_analysis_reliability_dataService': require('scripts/analysis/tools/Reliability/ReliabilityDataService.service.coffee'),
        'app_analysis_reliability_tests': require('scripts/analysis/tools/Reliability/ReliabilityTests.service.coffee')
      },
      controllers: {
        'reliabilityMainCtrl': require('scripts/analysis/tools/Reliability/ReliabilityMainCtrl.ctrl.coffee'),
        'reliabilitySidebarCtrl': require('scripts/analysis/tools/Reliability/ReliabilitySidebarCtrl.ctrl.coffee')
      }
    },
    state: {
      name: 'Reliability',
      url: '/tools/reliability',
      mainTemplate: require('partials/analysis/tools/Reliability/main.jade'),
      sidebarTemplate: require('partials/analysis/tools/Reliability/sidebar.jade')
    }
  });

}).call(this);

//# sourceMappingURL=Reliability.module.js.map
