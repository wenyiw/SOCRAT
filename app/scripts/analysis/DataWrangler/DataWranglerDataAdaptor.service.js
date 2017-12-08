// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, DataWranglerDataAdaptor,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');


  /*
    @name: DataWranglerDataAdaptor
    @desc: Reformats data from input table format to the universal DataFrame object
   */

  module.exports = DataWranglerDataAdaptor = (function(superClass) {
    extend(DataWranglerDataAdaptor, superClass);

    function DataWranglerDataAdaptor() {
      return DataWranglerDataAdaptor.__super__.constructor.apply(this, arguments);
    }

    DataWranglerDataAdaptor.inject('app_analysis_dataWrangler_msgService');

    DataWranglerDataAdaptor.prototype.initialize = function() {
      this.eventManager = this.app_analysis_dataWrangler_msgService;
      return this.DATA_TYPES = this.eventManager.getSupportedDataTypes();
    };

    DataWranglerDataAdaptor.prototype.toCsvString = function(dataFrame) {
      var csv, j, len, ref, row;
      csv = dataFrame.header.toString() + '\n';
      ref = dataFrame.data;
      for (j = 0, len = ref.length; j < len; j++) {
        row = ref[j];
        csv += row.toString() + '\n';
      }
      return csv = csv.slice(0, -1);
    };

    DataWranglerDataAdaptor.prototype.toDvTable = function(dataFrame) {
      var _data, col, i, row, table;
      table = [];
      _data = (function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = dataFrame.nCols; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          results.push((function() {
            var k, len, ref1, results1;
            ref1 = dataFrame.data;
            results1 = [];
            for (k = 0, len = ref1.length; k < len; k++) {
              row = ref1[k];
              results1.push(row[i]);
            }
            return results1;
          })());
        }
        return results;
      })();
      for (i in _data) {
        col = _data[i];
        table.push({
          name: dataFrame.header[i],
          values: col,
          type: 'symbolic'
        });
      }
      return table;
    };

    DataWranglerDataAdaptor.prototype.toDataFrame = function(table) {
      var _data, _header, _nCols, _nRows, _types, col, dataFrame, i;
      _nRows = table[0].length;
      _nCols = table.length;
      _data = (function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = _nRows; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          results.push((function() {
            var k, len, results1;
            results1 = [];
            for (k = 0, len = table.length; k < len; k++) {
              col = table[k];
              results1.push(col[i]);
            }
            return results1;
          })());
        }
        return results;
      })();
      _header = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = table.length; j < len; j++) {
          col = table[j];
          results.push(col.name);
        }
        return results;
      })();
      _types = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = table.length; j < len; j++) {
          col = table[j];
          results.push(col.type);
        }
        return results;
      })();
      return dataFrame = {
        data: _data,
        header: _header,
        types: _types,
        nRows: _nRows,
        nCols: _nCols,
        dataType: this.DATA_TYPES.FLAT
      };
    };

    return DataWranglerDataAdaptor;

  })(BaseService);

}).call(this);

//# sourceMappingURL=DataWranglerDataAdaptor.service.js.map