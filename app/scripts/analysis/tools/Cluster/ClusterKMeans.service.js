// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, ClusterKMeans,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  BaseService = require('scripts/BaseClasses/BaseService.coffee');


  /*
    @name: app_analysis_cluster_kMeans
    @type: service
    @desc: Performs k-means clustering
   */

  module.exports = ClusterKMeans = (function(superClass) {
    extend(ClusterKMeans, superClass);

    function ClusterKMeans() {
      this.kMeansPlusPlusInit = bind(this.kMeansPlusPlusInit, this);
      this.randomPartitionInit = bind(this.randomPartitionInit, this);
      this.forgyInit = bind(this.forgyInit, this);
      return ClusterKMeans.__super__.constructor.apply(this, arguments);
    }

    ClusterKMeans.inject('$timeout', 'app_analysis_cluster_metrics');

    ClusterKMeans.prototype.initialize = function() {
      this.metrics = this.app_analysis_cluster_metrics;
      this.name = 'K-means';
      this.timer = null;
      this.ks = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      this.lables = null;
      this.iter = 0;
      this.done = false;
      this.maxIter = 100;
      this.inits = [
        {
          name: 'Forgy',
          method: this.forgyInit
        }, {
          name: 'Random patition',
          method: this.randomPartitionInit
        }, {
          name: 'k-means++',
          method: this.kMeansPlusPlusInit
        }
      ];
      this.data = null;
      this.clusters = null;
      return this.params = {
        k: this.ks,
        distance: this.metrics.getNames(),
        init: this.inits.map(function(init) {
          return init.name;
        })
      };
    };

    ClusterKMeans.prototype.getName = function() {
      return this.name;
    };

    ClusterKMeans.prototype.getParams = function() {
      return this.params;
    };

    ClusterKMeans.prototype.getUniqueLabels = function(labels) {
      return labels.filter(function(x, i, a) {
        return i === a.indexOf(x);
      });
    };

    ClusterKMeans.prototype.arrayEqual = function(x, y) {
      var a, b;
      a = x.slice().sort();
      b = y.slice().sort();
      return a.length === b.length && a.every(function(elem, i) {
        return elem === b[i];
      });
    };

    ClusterKMeans.prototype.matrixMultiply = function(a, b) {
      var c, col, d1, d2, el, i, j, k, len, len1, m, o, ref, row;
      c = (function() {
        var len, m, ref, results;
        ref = d3.transpose(b);
        results = [];
        for (m = 0, len = ref.length; m < len; m++) {
          d2 = ref[m];
          results.push((function() {
            var len1, o, ref1, results1;
            ref1 = a.length;
            results1 = [];
            for (o = 0, len1 = ref1.length; o < len1; o++) {
              d1 = ref1[o];
              results1.push(0);
            }
            return results1;
          })());
        }
        return results;
      })();
      for (i = m = 0, len = a.length; m < len; i = ++m) {
        row = a[i];
        ref = d3.transpose(b);
        for (j = o = 0, len1 = ref.length; o < len1; j = ++o) {
          col = ref[j];
          c[i][j] = ((function() {
            var len2, p, results;
            results = [];
            for (k = p = 0, len2 = row.length; p < len2; k = ++p) {
              el = row[k];
              results.push(row[k] * col[k]);
            }
            return results;
          })()).reduce(function(t, s) {
            return t + s;
          });
        }
      }
      return c;
    };

    ClusterKMeans.prototype.initCentroids = function(data, k) {
      var centroids, ctr, ctrIdx, m, nRows, ref;
      nRows = data.length;
      centroids = [];
      for (ctr = m = 0, ref = k - 1; 0 <= ref ? m <= ref : m >= ref; ctr = 0 <= ref ? ++m : --m) {
        ctrIdx = Math.floor(Math.random() * nRows);
        if (centroids.length && ctrIdx === !centroids[ctr - 1].idx) {
          ctrIdx = Math.floor(Math.random() * nRows);
        }
        centroids.push({
          val: data[ctrIdx],
          idx: ctrIdx
        });
      }
      return centroids;
    };

    ClusterKMeans.prototype.initLabels = function(l, k) {
      var i, labels, m, ref;
      labels = [];
      for (i = m = 0, ref = l; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        labels.push(Math.floor(Math.random() * k));
      }
      return labels;
    };

    ClusterKMeans.prototype.updateMeans = function(data, centroids, labels) {
      var col, colMeans, colSums, ctr, ctrData, ctrIdx, distances, el, elIdx, len, len1, len2, len3, len4, m, mean, means, o, p, q, r, row, rowIdx;
      ctrData = (function() {
        var len, m, results;
        results = [];
        for (m = 0, len = centroids.length; m < len; m++) {
          ctr = centroids[m];
          results.push([]);
        }
        return results;
      })();
      for (rowIdx = m = 0, len = data.length; m < len; rowIdx = ++m) {
        row = data[rowIdx];
        ctrData[labels[rowIdx]].push(row);
      }
      means = [];
      for (ctrIdx = o = 0, len1 = ctrData.length; o < len1; ctrIdx = ++o) {
        ctr = ctrData[ctrIdx];
        colSums = (function() {
          var len2, p, ref, results;
          ref = data[0];
          results = [];
          for (p = 0, len2 = ref.length; p < len2; p++) {
            col = ref[p];
            results.push(0);
          }
          return results;
        })();
        for (p = 0, len2 = ctr.length; p < len2; p++) {
          row = ctr[p];
          for (elIdx = q = 0, len3 = row.length; q < len3; elIdx = ++q) {
            el = row[elIdx];
            colSums[elIdx] += el;
          }
        }
        colMeans = colSums.map(function(x) {
          return x / ctr.length;
        });
        means.push(colMeans);
      }
      centroids = [];
      for (r = 0, len4 = means.length; r < len4; r++) {
        mean = means[r];
        distances = (function() {
          var len5, results, u;
          results = [];
          for (u = 0, len5 = data.length; u < len5; u++) {
            row = data[u];
            results.push(this.metrics.distance(row, mean, 'euclidean'));
          }
          return results;
        }).call(this);
        ctrIdx = distances.indexOf(Math.min.apply(this, distances));
        if (indexOf.call(centroids.map(function(x) {
          return x.idx;
        }), ctrIdx) < 0) {
          centroids.push({
            val: data[ctrIdx],
            idx: ctrIdx
          });
        } else {
          distances = distances.splice(ctrIdx);
          ctrIdx = distances.indexOf(Math.min.apply(this, distances));
          centroids.push({
            val: data[ctrIdx],
            idx: ctrIdx
          });
        }
      }
      return centroids;
    };

    ClusterKMeans.prototype.updatePrecisionMatrix = function(data, ctrIdx, labels) {
      var col, cov, covData, e, e1, e2, i, invCov, j, l, len, len1, len2, len3, len4, len5, m, matrix, matrixT, means, n, o, p, q, r, ref, row, tCov, tCovInv, u, v;
      matrix = [];
      for (i = m = 0, ref = data.length; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
        if (labels[i] === ctrIdx) {
          matrix.push(data[i].slice());
        }
      }
      n = matrix.length;
      matrixT = d3.transpose(matrix);
      l = matrixT.length;
      means = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = matrixT.length; o < len; o++) {
          col = matrixT[o];
          results.push(col.reduce(function(t, s) {
            return t + s;
          }) / n);
        }
        return results;
      })();
      for (i = o = 0, len = matrix.length; o < len; i = ++o) {
        row = matrix[i];
        for (j = p = 0, len1 = row.length; p < len1; j = ++p) {
          col = row[j];
          matrix[i][j] = col - means[j];
        }
      }
      matrixT = d3.transpose(matrix);
      cov = (function() {
        var q, ref1, results;
        results = [];
        for (e2 = q = 0, ref1 = l - 1; 0 <= ref1 ? q <= ref1 : q >= ref1; e2 = 0 <= ref1 ? ++q : --q) {
          results.push((function() {
            var r, ref2, results1;
            results1 = [];
            for (e1 = r = 0, ref2 = l - 1; 0 <= ref2 ? r <= ref2 : r >= ref2; e1 = 0 <= ref2 ? ++r : --r) {
              results1.push(0);
            }
            return results1;
          })());
        }
        return results;
      })();
      cov = _matrixMultiply(matrixT, matrix);
      cov = cov.map(function(row) {
        return row.map(function(el) {
          return el / (n - 1);
        });
      });
      tCov = new jsfeat.matrix_t(l, l, jsfeat.F32_t | jsfeat.C1_t);
      covData = [];
      for (q = 0, len2 = cov.length; q < len2; q++) {
        row = cov[q];
        for (r = 0, len3 = row.length; r < len3; r++) {
          e = row[r];
          covData.push(e);
        }
      }
      tCov.data = covData;
      tCovInv = new jsfeat.matrix_t(l, l, jsfeat.F32_t | jsfeat.C1_t);
      jsfeat.linalg.svd_invert(tCovInv, tCov);
      invCov = (function() {
        var ref1, results, u;
        results = [];
        for (e2 = u = 0, ref1 = l - 1; 0 <= ref1 ? u <= ref1 : u >= ref1; e2 = 0 <= ref1 ? ++u : --u) {
          results.push((function() {
            var ref2, results1, v;
            results1 = [];
            for (e1 = v = 0, ref2 = l - 1; 0 <= ref2 ? v <= ref2 : v >= ref2; e1 = 0 <= ref2 ? ++v : --v) {
              results1.push(0);
            }
            return results1;
          })());
        }
        return results;
      })();
      for (i = u = 0, len4 = invCov.length; u < len4; i = ++u) {
        row = invCov[i];
        for (j = v = 0, len5 = row.length; v < len5; j = ++v) {
          col = row[j];
          invCov[i][j] = tCovInv.data[2 * i + j];
        }
      }
      return invCov;
    };

    ClusterKMeans.prototype.assignSamples = function(data, centroids, distanceType) {
      var ctr, distances, labels, len, m, row;
      labels = [];
      for (m = 0, len = data.length; m < len; m++) {
        row = data[m];
        distances = (function() {
          var len1, o, results;
          results = [];
          for (o = 0, len1 = centroids.length; o < len1; o++) {
            ctr = centroids[o];
            results.push(this.metrics.distance(row, ctr.val, distanceType));
          }
          return results;
        }).call(this);
        labels.push(distances.indexOf(Math.min.apply(this, distances)));
      }
      return labels;
    };

    ClusterKMeans.prototype.forgyInit = function(data, k) {
      var centroids;
      centroids = this.initCentroids(data, k);
      return {
        centroids: centroids,
        initLabels: this.assignSamples(data, centroids, 'euclidean')
      };
    };

    ClusterKMeans.prototype.randomPartitionInit = function(data, k) {
      var initLabels, m, ref, results;
      initLabels = this.initLabels(data.length - 1, k);
      return {
        centroids: this.updateMeans(data, (function() {
          results = [];
          for (var m = 0, ref = k - 1; 0 <= ref ? m <= ref : m >= ref; 0 <= ref ? m++ : m--){ results.push(m); }
          return results;
        }).apply(this), initLabels),
        initLabels: initLabels
      };
    };

    ClusterKMeans.prototype.kMeansPlusPlusInit = function(data, k) {
      return false;
    };

    ClusterKMeans.prototype.initClusters = function(data, k, initMethod, distance) {
      var centroids, clusters, covMats, ctr, ctrIdx, labels, len, m;
      clusters = (this.inits.filter(function(init) {
        return init.name.toLowerCase() === initMethod.toLowerCase();
      })).shift().method(data, k);
      if (clusters) {
        centroids = clusters.centroids;
        labels = clusters.initLabels;
        if (indexOf.call(this.metrics.getNames(), distance) >= 0 && distance.toLowerCase() === 'mahalanobis') {
          labels = this.assignSamples(data, centroids, 'euclidean');
          centroids = this.updateMeans(data, centroids, labels);
          covMats = [];
          for (ctrIdx = m = 0, len = centroids.length; m < len; ctrIdx = ++m) {
            ctr = centroids[ctrIdx];
            covMats.push(this.updatePrecisionMatrix(data, ctrIdx, labels));
          }
        }
        return {
          centroids: centroids,
          labels: labels,
          covMats: covMats
        };
      } else {
        return false;
      }
    };

    ClusterKMeans.prototype.updateCentroidsMahalanobis = function(data, centroids, labels, covMats) {
      var ctr, ctrDistances, ctrIdx, i, j, lbls, len, len1, m, o, row;
      lbls = labels.slice();
      for (i = m = 0, len = data.length; m < len; i = ++m) {
        row = data[i];
        ctrDistances = (function() {
          var len1, o, results;
          results = [];
          for (j = o = 0, len1 = centroids.length; o < len1; j = ++o) {
            ctr = centroids[j];
            results.push(this.metrics.mahalanobis(row, ctr.val, covMats[j]));
          }
          return results;
        }).call(this);
        ctrIdx = ctrDistances.indexOf(Math.min.apply(this, ctrDistances));
        if (ctrIdx !== lbls[i]) {
          lbls[i] = ctrIdx;
          centroids = this.updateMeans(data, centroids, lbls);
          for (j = o = 0, len1 = centroids.length; o < len1; j = ++o) {
            ctr = centroids[j];
            covMats[j] = this.updatePrecisionMatrix(data, j, lbls);
          }
        }
      }
      return {
        centroids: centroids,
        labels: lbls,
        covMats: covMats
      };
    };

    ClusterKMeans.prototype.prepFirstIter = function(data, k, init, distance) {
      var initRes, labels, m, ref, results, row, uniqueLabels;
      labels = data.labels;
      data = (function() {
        var len, m, ref, results;
        ref = data.data;
        results = [];
        for (m = 0, len = ref.length; m < len; m++) {
          row = ref[m];
          results.push(row.map(Number));
        }
        return results;
      })();
      k = Number(k);
      if (labels) {
        this.uniqueLabels = this.getUniqueLabels(labels);
        this.computeAcc = data.acc;
      } else {
        uniqueLabels = (function() {
          results = [];
          for (var m = 0, ref = k - 1; 0 <= ref ? m <= ref : m >= ref; 0 <= ref ? m++ : m--){ results.push(m); }
          return results;
        }).apply(this);
        this.computeAcc = false;
      }
      init = init.toLowerCase();
      distance = distance.toLowerCase();
      initRes = this.initClusters(data, k, init, distance);
      initRes.data = data;
      return initRes;
    };

    ClusterKMeans.prototype.runIter = function(data, centroids, labels, distance, covMats) {
      var res;
      if (covMats == null) {
        covMats = this.covMats;
      }
      console.log('Centroids: ');
      console.table(centroids);
      if (distance.toLowerCase() !== 'mahalanobis') {
        labels = this.assignSamples(data, centroids, distance);
        centroids = this.updateMeans(data, centroids, labels);
      } else {
        res = this.updateCentroidsMahalanobis(data, centroids, labels, covMats);
        labels = res.labels;
        centroids = res.centroids;
        covMats = res.covMats;
      }
      console.log('New means: ');
      console.table(centroids);
      return {
        centroids: centroids,
        labels: labels,
        covMats: covMats
      };
    };

    ClusterKMeans.prototype.step = function(data, k, init, distance) {
      var firstRes, res;
      if (!this.done && this.iter === 0 && (data != null)) {
        firstRes = this.prepFirstIter(data, k, init, distance);
        this.data = firstRes.data;
        this.centroids = firstRes.centroids;
        this.labels = firstRes.labels;
        if (!(firstRes.covMats == null)) {
          this.covMats = firstRes.covMats;
        }
        this.distance = distance;
      }
      if ((this.centroids != null) && this.iter < this.maxIter && !this.done) {
        this.iter++;
        console.log('Iteration: ' + this.iter);
        res = this.runIter(this.data, this.centroids, this.labels, this.distance);
        if (this.arrayEqual(this.centroids.map(function(x) {
          return x.idx;
        }), res.centroids.map(function(x) {
          return x.idx;
        }))) {
          this.done = true;
        } else {
          this.centroids = res.centroids;
          this.labels = res.labels;
          if (!(res.covMats == null)) {
            this.covMats = res.covMats;
          }
        }
      } else {
        console.log('k-means finished');
      }
      return {
        centroids: this.centroids,
        labels: this.labels,
        done: this.done
      };
    };

    ClusterKMeans.prototype.reset = function() {
      this.done = false;
      return this.iter = 0;
    };

    return ClusterKMeans;

  })(BaseService);

}).call(this);

//# sourceMappingURL=ClusterKMeans.service.js.map