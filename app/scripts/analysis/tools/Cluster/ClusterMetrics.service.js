// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseModuleDataService, ClusterMetrics,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModuleDataService = require('scripts/BaseClasses/BaseModuleDataService.coffee');

  module.exports = ClusterMetrics = (function(superClass) {
    extend(ClusterMetrics, superClass);

    function ClusterMetrics() {
      return ClusterMetrics.__super__.constructor.apply(this, arguments);
    }

    ClusterMetrics.prototype.initialize = function() {
      return this.metrics = [
        {
          name: 'Euclidean',
          method: this.euclidean
        }, {
          name: 'Manhattan',
          method: this.manhattan
        }, {
          name: 'Maximum',
          method: this.max
        }, {
          name: 'Mahalanobis',
          method: this.mahalanobis
        }
      ];
    };

    ClusterMetrics.prototype.euclidean = function(v1, v2) {
      var i, m, ref, total;
      total = 0;
      for (i = m = 0, ref = v1.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        total += Math.pow(v2[i] - v1[i], 2);
      }
      return Math.sqrt(total);
    };

    ClusterMetrics.prototype.manhattan = function(v1, v2) {
      var i, m, ref, total;
      total = 0;
      for (i = m = 0, ref = v1.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        total += Math.abs(v2[i] - v1[i]);
      }
      return total;
    };

    ClusterMetrics.prototype.max = function(v1, v2) {
      var i, m, max, ref;
      max = 0;
      for (i = m = 0, ref = v1.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        max = Math.max(max, Math.abs(v2[i] - v1[i]));
      }
      return max;
    };

    ClusterMetrics.prototype.mahalanobis = function(v1, v2, s) {
      var diff, el, i, invCov, j, k, l, len, len1, m, n, row, total;
      if (s) {
        l = v1.length;
        invCov = s;
        diff = (function() {
          var m, ref, results;
          results = [];
          for (k = m = 0, ref = l - 1; 0 <= ref ? m <= ref : m >= ref; k = 0 <= ref ? ++m : --m) {
            results.push(v1[k] - v2[k]);
          }
          return results;
        })();
        total = 0;
        for (i = m = 0, len = invCov.length; m < len; i = ++m) {
          row = invCov[i];
          for (j = n = 0, len1 = row.length; n < len1; j = ++n) {
            el = row[j];
            total += invCov[i][j] * Math.pow(diff[i], 2 - i - j) * Math.pow(diff[j], i + j);
          }
        }
        return Math.sqrt(total);
      } else {
        return false;
      }
    };

    ClusterMetrics.prototype.getNames = function() {
      return this.metrics.map(function(metric) {
        return metric.name;
      });
    };

    ClusterMetrics.prototype.distance = function(v1, v2, type) {
      return (this.metrics.filter(function(metric) {
        return metric.name.toLowerCase() === type.toLowerCase();
      })).shift().method(v1, v2);
    };

    return ClusterMetrics;

  })(BaseModuleDataService);

}).call(this);

//# sourceMappingURL=ClusterMetrics.service.js.map
