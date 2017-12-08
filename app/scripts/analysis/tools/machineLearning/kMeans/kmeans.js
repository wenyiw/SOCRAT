// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var kMeans,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    hasProp = {}.hasOwnProperty;

  kMeans = angular.module('app_analysis_kMeans', []).factory('app_analysis_kMeans_constructor', [
    'app_analysis_kMeans_manager', function(manager) {
      return function(sb) {
        var _msgList;
        if (!(sb == null)) {
          manager.setSb(sb);
        }
        _msgList = manager.getMsgList();
        return {
          init: function(opt) {
            return console.log('kMeans init invoked');
          },
          destroy: function() {},
          msgList: _msgList
        };
      };
    }
  ]).factory('app_analysis_kMeans_manager', [
    '$rootScope', function($rootScope) {
      var _broadcast, _getMsgList, _getSb, _getSupportedDataTypes, _msgList, _sb, _setSb;
      _sb = null;
      _msgList = {
        outgoing: ['get data'],
        incoming: ['take data'],
        scope: ['kMeans']
      };
      _setSb = function(sb) {
        return _sb = sb;
      };
      _getSb = function() {
        return _sb;
      };
      _getMsgList = function() {
        return _msgList;
      };
      _getSupportedDataTypes = function() {
        if (_sb) {
          return _sb.getSupportedDataTypes();
        } else {
          return false;
        }
      };
      _broadcast = function(msg, data) {
        return $rootScope.$broadcast(msg, data);
      };
      return {
        getSb: _getSb,
        setSb: _setSb,
        getMsgList: _getMsgList,
        broadcast: _broadcast,
        getSupportedDataTypes: _getSupportedDataTypes
      };
    }
  ]).controller('kMeansMainCtrl', [
    'app_analysis_kMeans_manager', 'app_analysis_kMeans_calculator', '$scope', '$timeout', function(msgManager, kMeans, $scope, $timeout) {
      var _assignments, _dataPoints, _finish, _means, _update, graph, prettifyArrayOutput, showResults, updateChartData;
      console.log('kMeansMainCtrl executed');
      _dataPoints = null;
      _means = null;
      _assignments = null;
      $scope.showresults = false;
      $scope.avgAccuracy = '';
      $scope.accs = {};
      $scope.dataType = '';
      $scope.DATA_TYPES = msgManager.getSupportedDataTypes();
      prettifyArrayOutput = function(arr) {
        if (arr != null) {
          arr = arr.map(function(x) {
            return x.toFixed(3);
          });
          return '[' + arr.toString().split(',').join('; ') + ']';
        }
      };
      showResults = function(accuracy) {
        if (Object.keys(accuracy).length !== 0) {
          $scope.avgAccuracy = accuracy.average.toFixed(2);
          delete accuracy.average;
          $scope.accs = accuracy;
          return $scope.showresults = true;
        }
      };
      updateChartData = function() {
        $scope.dataPoints = _dataPoints;
        $scope.means = _means;
        return $scope.assignments = _assignments;
      };
      _update = function(dataPoints, means, assignments) {
        if (means == null) {
          means = null;
        }
        if (assignments == null) {
          assignments = null;
        }
        if ($scope.showresults === true) {
          $scope.showresults = false;
        }
        _dataPoints = dataPoints;
        if (means) {
          _means = means;
        }
        if (assignments) {
          _assignments = assignments;
        }
        return $timeout(updateChartData);
      };
      $scope.$on('kmeans:updateDataPoints', function(event, dataPoints) {
        return _update(dataPoints);
      });
      $scope.$on('kmeans:updateDataType', function(event, dataType) {
        return $scope.dataType = dataType;
      });
      _finish = function(results) {
        if (results == null) {
          results = null;
        }
        msgManager.broadcast('kmeans:done', results);
        return showResults(results);
      };
      graph = {
        update: _update,
        showResults: _finish
      };
      updateChartData();
      return kMeans.setGraph(graph);
    }
  ]).controller('kMeansSidebarCtrl', [
    'app_analysis_kMeans_manager', 'app_analysis_kMeans_calculator', '$scope', '$stateParams', '$q', '$timeout', function(msgManager, kmeans, $scope, $stateParams, $q, $timeout) {
      var DATA_TYPES, DEFAULT_CONTROL_VALUES, callKMeans, deferred, detectKValue, initSidebarControls, parseData, parseDataForKMeans, sb, sendDataRequest, setDetectedKValue, subscribeForData, token, updateDataPoints, updateSidebarControls;
      console.log('kMeansSidebarCtrl executed');
      DATA_TYPES = msgManager.getSupportedDataTypes();
      DEFAULT_CONTROL_VALUES = {
        k: 2,
        distance: 'Euclidean',
        initialisation: 'Forgy',
        labelson: true,
        wholedataseton: true,
        accuracyon: false
      };
      updateDataPoints = function(data) {
        var row, xCol, yCol;
        xCol = data.header.indexOf($scope.xCol);
        yCol = data.header.indexOf($scope.yCol);
        data = (function() {
          var len, m, ref, results1;
          ref = data.data;
          results1 = [];
          for (m = 0, len = ref.length; m < len; m++) {
            row = ref[m];
            results1.push([row[xCol], row[yCol]]);
          }
          return results1;
        })();
        return msgManager.broadcast('kmeans:updateDataPoints', data);
      };
      initSidebarControls = function(initControlValues) {
        var m, params, ref, ref1, ref2, ref3, ref4, results1;
        params = kmeans.getParameters();
        $scope.ks = (function() {
          results1 = [];
          for (var m = ref = params.minK, ref1 = params.maxK; ref <= ref1 ? m <= ref1 : m >= ref1; ref <= ref1 ? m++ : m--){ results1.push(m); }
          return results1;
        }).apply(this);
        $scope.distances = params.distances;
        $scope.inits = params.initMethods;
        $scope.cols = [];
        $scope.kmeanson = true;
        $scope.running = 'hidden';
        $scope.uniqueLabels = {
          labelCol: null,
          num: null
        };
        if (ref2 = initControlValues.k, indexOf.call($scope.ks, ref2) >= 0) {
          $scope.k = initControlValues.k;
        }
        if (ref3 = initControlValues.distance, indexOf.call($scope.distances, ref3) >= 0) {
          $scope.dist = initControlValues.distance;
        }
        if (ref4 = initControlValues.initialisation, indexOf.call($scope.inits, ref4) >= 0) {
          $scope.initMethod = initControlValues.initialisation;
        }
        $scope.labelson = initControlValues.labelson;
        $scope.wholedataseton = initControlValues.wholedataseton;
        return $scope.accuracyon = initControlValues.accuracyon;
      };
      updateSidebarControls = function(data) {
        var firstCol, lastCol, ref, secondCol;
        $scope.cols = data.header;
        ref = $scope.cols, firstCol = ref[0], secondCol = ref[1], lastCol = ref[ref.length - 1];
        $scope.xCol = firstCol;
        $scope.yCol = secondCol;
        $scope.labelCol = lastCol;
        $scope.kmeanson = false;
        if ($scope.labelson) {
          $scope.numUniqueLabels = detectKValue(data);
        }
        $scope.updateDataPoints = function() {
          return updateDataPoints(data);
        };
        return $timeout(function() {
          return updateDataPoints(data);
        });
      };
      setDetectedKValue = function(detectedK) {
        if (detectedK.num <= 10) {
          $scope.uniqueLabels = detectedK;
          return $scope.k = detectedK.num;
        } else {
          return console.log('KMEANS: k is more than 10');
        }
      };
      detectKValue = function(data) {
        var labelCol, labels, row, uniqueLabels;
        if ($scope.labelson) {
          labelCol = data.header.indexOf($scope.labelCol);
          labels = (function() {
            var len, m, ref, results1;
            ref = data.data;
            results1 = [];
            for (m = 0, len = ref.length; m < len; m++) {
              row = ref[m];
              results1.push(row[labelCol]);
            }
            return results1;
          })();
          uniqueLabels = labels.filter(function(x, i, a) {
            return i === a.indexOf(x);
          });
          return uniqueLabels = {
            labelCol: $scope.labelCol,
            num: uniqueLabels.length
          };
        }
      };
      parseDataForKMeans = function(data) {
        var acc, labelCol, labels, obj, rawData, row, xCol, yCol;
        xCol = data.header.indexOf($scope.xCol);
        yCol = data.header.indexOf($scope.yCol);
        if ($scope.labelson) {
          labelCol = data.header.indexOf($scope.labelCol);
          labels = (function() {
            var len, m, ref, results1;
            ref = data.data;
            results1 = [];
            for (m = 0, len = ref.length; m < len; m++) {
              row = ref[m];
              results1.push(row[labelCol]);
            }
            return results1;
          })();
        } else {
          labels = null;
        }
        if ($scope.wholedataseton) {
          rawData = labels ? data = (function() {
            var len, m, ref, results1;
            ref = data.data;
            results1 = [];
            for (m = 0, len = ref.length; m < len; m++) {
              row = ref[m];
              results1.push(row.filter(function(el, idx) {
                return idx !== labelCol;
              }));
            }
            return results1;
          })() : void 0;
        } else {
          data = (function() {
            var len, m, ref, results1;
            ref = data.data;
            results1 = [];
            for (m = 0, len = ref.length; m < len; m++) {
              row = ref[m];
              results1.push([row[xCol], row[yCol]]);
            }
            return results1;
          })();
        }
        if ($scope.labelson && $scope.k === $scope.numUniqueLabels.num && $scope.accuracyon) {
          acc = true;
        }
        return obj = {
          data: data,
          labels: labels,
          xCol: xCol,
          yCol: yCol,
          acc: acc
        };
      };
      callKMeans = function(data) {
        $scope.kmeanson = true;
        $scope.running = 'spinning';
        $scope.$on('kmeans:done', function(event, results) {
          return $timeout(function() {
            $scope.kmeanson = false;
            return $scope.running = 'hidden';
          });
        });
        return kmeans.run(data, $scope.k, $scope.dist, $scope.initMethod);
      };
      parseData = function(data) {
        updateSidebarControls(data);
        updateDataPoints(data);
        $scope.detectKValue = function() {
          var detectedK;
          detectedK = detectKValue(data);
          return setDetectedKValue(detectedK);
        };
        return $scope.run = function() {
          var _data;
          _data = parseDataForKMeans(data);
          return callKMeans(_data);
        };
      };
      subscribeForData = function() {
        var token;
        return token = sb.subscribe({
          msg: 'take data',
          msgScope: ['kMeans'],
          listener: function(msg, data) {
            if ((data.dataType != null) && data.dataType === DATA_TYPES.FLAT) {
              $timeout(function() {
                return msgManager.broadcast('kmeans:updateDataType', data.dataType);
              });
              return parseData(data);
            }
          }
        });
      };
      sendDataRequest = function(deferred, token) {
        return sb.publish({
          msg: 'get data',
          msgScope: ['kMeans'],
          callback: function() {
            return sb.unsubscribe(token);
          },
          data: {
            tableName: $stateParams.projectId + ':' + $stateParams.forkId,
            promise: deferred
          }
        });
      };
      sb = msgManager.getSb();
      deferred = $q.defer();
      initSidebarControls(DEFAULT_CONTROL_VALUES);
      token = subscribeForData();
      return sendDataRequest(deferred, token);
    }
  ]).factory('app_analysis_kMeans_calculator', [
    function() {
      var _arrayEqual, _assignSamples, _clusterWholeDataset, _computeAcc, _distance, _distances, _getParameters, _getUniqueLabels, _graph, _init, _initCentroids, _initLabels, _initMethods, _matrixMultiply, _maxIter, _maxK, _minK, _runKMeans, _setGraph, _updateGraph, _updateMeans, _updatePrecisionMatrix, _xCol, _yCol;
      _graph = null;
      _computeAcc = false;
      _clusterWholeDataset = false;
      _xCol = null;
      _yCol = null;
      _maxIter = 20;
      _minK = 2;
      _maxK = 10;
      _distances = ['Euclidean', 'Mahalanobis', 'Manhattan', 'Maximum'];
      _initMethods = ['Forgy', 'Random Partition'];
      _getParameters = function() {
        return {
          minK: _minK,
          maxK: _maxK,
          distances: _distances,
          initMethods: _initMethods
        };
      };
      _setGraph = function(graph) {
        return _graph = graph;
      };
      _updateGraph = function(data, centroids, labels) {
        var centroid, row;
        if (centroids == null) {
          centroids = null;
        }
        if (labels == null) {
          labels = null;
        }
        if (_clusterWholeDataset) {
          data = (function() {
            var len, m, results1;
            results1 = [];
            for (m = 0, len = data.length; m < len; m++) {
              row = data[m];
              results1.push([row[_xCol], row[_yCol]]);
            }
            return results1;
          })();
          if (centroids) {
            centroids = (function() {
              var len, m, results1;
              results1 = [];
              for (m = 0, len = centroids.length; m < len; m++) {
                centroid = centroids[m];
                results1.push([centroid[_xCol], centroid[_yCol]]);
              }
              return results1;
            })();
          }
        }
        return _graph.update(data, centroids, labels);
      };
      _getUniqueLabels = function(labels) {
        return labels.filter(function(x, i, a) {
          return i === a.indexOf(x);
        });
      };
      _distance = function(v1, v2, type, s) {
        var euclidean, mahalanobis, manhattan, max;
        if (type == null) {
          type = 'euclidean';
        }
        if (s == null) {
          s = [];
        }
        euclidean = function(v1, v2) {
          var i, m, ref, total;
          total = 0;
          for (i = m = 0, ref = v1.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            total += Math.pow(v2[i] - v1[i], 2);
          }
          return Math.sqrt(total);
        };
        manhattan = function(v1, v2) {
          var i, m, ref, total;
          total = 0;
          for (i = m = 0, ref = v1.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            total += Math.abs(v2[i] - v1[i]);
          }
          return total;
        };
        max = function(v1, v2) {
          var i, m, ref;
          max = 0;
          for (i = m = 0, ref = v1.length - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            max = Math.max(max, Math.abs(v2[i] - v1[i]));
          }
          return max;
        };
        mahalanobis = function(v1, v2, s) {
          var diff, el, i, invCov, j, k, l, len, len1, m, o, row, total;
          l = v1.length;
          invCov = s;
          diff = (function() {
            var m, ref, results1;
            results1 = [];
            for (k = m = 0, ref = l - 1; 0 <= ref ? m <= ref : m >= ref; k = 0 <= ref ? ++m : --m) {
              results1.push(v1[k] - v2[k]);
            }
            return results1;
          })();
          total = 0;
          for (i = m = 0, len = invCov.length; m < len; i = ++m) {
            row = invCov[i];
            for (j = o = 0, len1 = row.length; o < len1; j = ++o) {
              el = row[j];
              total += invCov[i][j] * Math.pow(diff[i], 2 - i - j) * Math.pow(diff[j], i + j);
            }
          }
          return Math.sqrt(total);
        };
        if (_arrayEqual(v1, v2)) {
          return 0;
        } else {
          switch (type.toLowerCase()) {
            case 'manhattan':
              return manhattan(v1, v2);
            case 'max':
              return max(v1, v2);
            case 'mahalanobis':
              return mahalanobis(v1, v2, s);
            default:
              return euclidean(v1, v2);
          }
        }
      };
      _arrayEqual = function(x, y) {
        var a, b;
        a = x.slice().sort();
        b = y.slice().sort();
        return a.length === b.length && a.every(function(elem, i) {
          return elem === b[i];
        });
      };
      _matrixMultiply = function(a, b) {
        var c, col, d1, d2, el, i, j, k, len, len1, m, o, ref, row;
        c = (function() {
          var len, m, ref, results1;
          ref = d3.transpose(b);
          results1 = [];
          for (m = 0, len = ref.length; m < len; m++) {
            d2 = ref[m];
            results1.push((function() {
              var len1, o, ref1, results2;
              ref1 = a.length;
              results2 = [];
              for (o = 0, len1 = ref1.length; o < len1; o++) {
                d1 = ref1[o];
                results2.push(0);
              }
              return results2;
            })());
          }
          return results1;
        })();
        for (i = m = 0, len = a.length; m < len; i = ++m) {
          row = a[i];
          ref = d3.transpose(b);
          for (j = o = 0, len1 = ref.length; o < len1; j = ++o) {
            col = ref[j];
            c[i][j] = ((function() {
              var len2, p, results1;
              results1 = [];
              for (k = p = 0, len2 = row.length; p < len2; k = ++p) {
                el = row[k];
                results1.push(row[k] * col[k]);
              }
              return results1;
            })()).reduce(function(t, s) {
              return t + s;
            });
          }
        }
        return c;
      };
      _initCentroids = function(data, k) {
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
      _initLabels = function(l, k) {
        var i, labels, m, ref;
        labels = [];
        for (i = m = 0, ref = l; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
          labels.push(Math.floor(Math.random() * k));
        }
        return labels;
      };
      _updateMeans = function(data, centroids, labels) {
        var col, colMeans, colSums, ctr, ctrData, ctrIdx, distances, el, elIdx, len, len1, len2, len3, len4, m, mean, means, o, p, q, row, rowIdx, u;
        ctrData = (function() {
          var len, m, results1;
          results1 = [];
          for (m = 0, len = centroids.length; m < len; m++) {
            ctr = centroids[m];
            results1.push([]);
          }
          return results1;
        })();
        for (rowIdx = m = 0, len = data.length; m < len; rowIdx = ++m) {
          row = data[rowIdx];
          ctrData[labels[rowIdx]].push(row);
        }
        means = [];
        for (ctrIdx = o = 0, len1 = ctrData.length; o < len1; ctrIdx = ++o) {
          ctr = ctrData[ctrIdx];
          colSums = (function() {
            var len2, p, ref, results1;
            ref = data[0];
            results1 = [];
            for (p = 0, len2 = ref.length; p < len2; p++) {
              col = ref[p];
              results1.push(0);
            }
            return results1;
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
        for (u = 0, len4 = means.length; u < len4; u++) {
          mean = means[u];
          distances = (function() {
            var len5, results1, v;
            results1 = [];
            for (v = 0, len5 = data.length; v < len5; v++) {
              row = data[v];
              results1.push(_distance(row, mean, 'euclidean'));
            }
            return results1;
          })();
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
      _updatePrecisionMatrix = function(data, ctrIdx, labels) {
        var col, cov, covData, e, e1, e2, i, invCov, j, l, len, len1, len2, len3, len4, len5, m, matrix, matrixT, means, n, o, p, q, ref, row, tCov, tCovInv, u, v, w;
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
          var len, o, results1;
          results1 = [];
          for (o = 0, len = matrixT.length; o < len; o++) {
            col = matrixT[o];
            results1.push(col.reduce(function(t, s) {
              return t + s;
            }) / n);
          }
          return results1;
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
          var q, ref1, results1;
          results1 = [];
          for (e2 = q = 0, ref1 = l - 1; 0 <= ref1 ? q <= ref1 : q >= ref1; e2 = 0 <= ref1 ? ++q : --q) {
            results1.push((function() {
              var ref2, results2, u;
              results2 = [];
              for (e1 = u = 0, ref2 = l - 1; 0 <= ref2 ? u <= ref2 : u >= ref2; e1 = 0 <= ref2 ? ++u : --u) {
                results2.push(0);
              }
              return results2;
            })());
          }
          return results1;
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
          for (u = 0, len3 = row.length; u < len3; u++) {
            e = row[u];
            covData.push(e);
          }
        }
        tCov.data = covData;
        tCovInv = new jsfeat.matrix_t(l, l, jsfeat.F32_t | jsfeat.C1_t);
        jsfeat.linalg.svd_invert(tCovInv, tCov);
        invCov = (function() {
          var ref1, results1, v;
          results1 = [];
          for (e2 = v = 0, ref1 = l - 1; 0 <= ref1 ? v <= ref1 : v >= ref1; e2 = 0 <= ref1 ? ++v : --v) {
            results1.push((function() {
              var ref2, results2, w;
              results2 = [];
              for (e1 = w = 0, ref2 = l - 1; 0 <= ref2 ? w <= ref2 : w >= ref2; e1 = 0 <= ref2 ? ++w : --w) {
                results2.push(0);
              }
              return results2;
            })());
          }
          return results1;
        })();
        for (i = v = 0, len4 = invCov.length; v < len4; i = ++v) {
          row = invCov[i];
          for (j = w = 0, len5 = row.length; w < len5; j = ++w) {
            col = row[j];
            invCov[i][j] = tCovInv.data[2 * i + j];
          }
        }
        return invCov;
      };
      _assignSamples = function(data, centroids, distanceType) {
        var ctr, distances, labels, len, m, row;
        labels = [];
        for (m = 0, len = data.length; m < len; m++) {
          row = data[m];
          distances = (function() {
            var len1, o, results1;
            results1 = [];
            for (o = 0, len1 = centroids.length; o < len1; o++) {
              ctr = centroids[o];
              results1.push(_distance(row, ctr.val, distanceType));
            }
            return results1;
          })();
          labels.push(distances.indexOf(Math.min.apply(this, distances)));
        }
        return labels;
      };
      _runKMeans = function(data, k, maxIter, centroids, distanceType, uniqueLabels, trueLabels) {
        var covMats, ctr, ctrIdx, evaluateAccuracy, interval, labels, lbls, len, m, reportAccuracy, run, runMahalanobis, step;
        if (trueLabels == null) {
          trueLabels = null;
        }
        evaluateAccuracy = function(labels, trueLabels, uniqueLabels) {
          var acc, accs, accuracy, currentEstLabel, estLabelCounts, i, kEstLabels, kTrueLabelIdxs, label, len, m, mostFrequentEstLabelIdx, uniqueEstLabels, x;
          accuracy = {};
          uniqueEstLabels = _getUniqueLabels(labels);
          for (m = 0, len = uniqueLabels.length; m < len; m++) {
            k = uniqueLabels[m];
            kTrueLabelIdxs = (function() {
              var len1, o, results1;
              results1 = [];
              for (i = o = 0, len1 = trueLabels.length; o < len1; i = ++o) {
                x = trueLabels[i];
                if (x === k) {
                  results1.push(i);
                }
              }
              return results1;
            })();
            kEstLabels = (function() {
              var len1, o, results1;
              results1 = [];
              for (i = o = 0, len1 = labels.length; o < len1; i = ++o) {
                x = labels[i];
                if (indexOf.call(kTrueLabelIdxs, i) >= 0) {
                  results1.push(x);
                }
              }
              return results1;
            })();
            estLabelCounts = uniqueEstLabels.map(function(uniqueEstLabel) {
              var counts;
              counts = kEstLabels.reduce(function(n, val) {
                return n + (val === uniqueEstLabel);
              }, 0);
              return counts;
            });
            mostFrequentEstLabelIdx = estLabelCounts.indexOf(Math.max.apply(null, estLabelCounts));
            currentEstLabel = uniqueEstLabels[mostFrequentEstLabelIdx];
            uniqueEstLabels.splice(mostFrequentEstLabelIdx, 1);
            accuracy[k] = estLabelCounts[mostFrequentEstLabelIdx] / kTrueLabelIdxs.length;
          }
          accs = (function() {
            var results1;
            results1 = [];
            for (label in accuracy) {
              if (!hasProp.call(accuracy, label)) continue;
              acc = accuracy[label];
              results1.push(acc);
            }
            return results1;
          })();
          accuracy['average'] = accs.reduce(function(r, s) {
            return r + s;
          }) / accs.length;
          return accuracy;
        };
        step = function(data, centroids) {
          var labels, means;
          maxIter--;
          console.log('Iteration: ' + maxIter);
          console.log('Centroids: ');
          console.table(centroids);
          labels = _assignSamples(data, centroids, distanceType);
          means = _updateMeans(data, centroids, labels);
          console.log('New means: ');
          console.table(means);
          if (!_arrayEqual(means.map(function(x) {
            return x.idx;
          }), centroids.map(function(x) {
            return x.idx;
          }))) {
            centroids = means;
            _updateGraph(data, means.map(function(x) {
              return x.val;
            }), labels);
          } else {
            maxIter = 0;
          }
          return {
            centroids: centroids,
            labels: labels
          };
        };
        reportAccuracy = function(estLabels, trueLabels, uniqueLabels) {
          var acc;
          acc = {};
          if (_computeAcc) {
            acc = evaluateAccuracy(estLabels, trueLabels, uniqueLabels);
          }
          return _graph.showResults(acc);
        };
        run = function() {
          var labels, res;
          if (maxIter) {
            res = step(data, centroids);
            centroids = res.centroids;
            return labels = res.labels;
          } else {
            clearInterval(interval);
            console.log('K-Means done.');
            if (_computeAcc) {
              labels = _assignSamples(data, centroids, distanceType);
            }
            return reportAccuracy(labels, trueLabels, uniqueLabels);
          }
        };
        runMahalanobis = function() {
          var ctr, ctrDistances, ctrIdx, i, j, len, len1, m, means, o, row;
          if (maxIter) {
            maxIter--;
            console.log('Iteration: ' + maxIter);
            console.log('Centroids: ');
            console.table(centroids);
            means = centroids.slice();
            for (i = m = 0, len = data.length; m < len; i = ++m) {
              row = data[i];
              ctrDistances = (function() {
                var len1, o, results1;
                results1 = [];
                for (j = o = 0, len1 = centroids.length; o < len1; j = ++o) {
                  ctr = centroids[j];
                  results1.push(_distance(row, ctr.val, distanceType, covMats[j]));
                }
                return results1;
              })();
              ctrIdx = ctrDistances.indexOf(Math.min.apply(this, ctrDistances));
              if (ctrIdx !== lbls[i]) {
                lbls[i] = ctrIdx;
                centroids = _updateMeans(data, centroids, lbls);
                _updateGraph(data, centroids.map(function(x) {
                  return x.val;
                }), lbls);
                for (j = o = 0, len1 = centroids.length; o < len1; j = ++o) {
                  ctr = centroids[j];
                  covMats[j] = _updatePrecisionMatrix(data, j, lbls);
                }
              }
            }
            if (_arrayEqual(means.map(function(x) {
              return x.idx;
            }), centroids.map(function(x) {
              return x.idx;
            }))) {
              return maxIter = 0;
            }
          } else {
            clearInterval(interval);
            console.log('K-Means done.');
            return reportAccuracy(lbls, trueLabels, uniqueLabels);
          }
        };
        if (distanceType === 'mahalanobis') {
          labels = _assignSamples(data, centroids, 'euclidean');
          centroids = _updateMeans(data, centroids, labels);
          covMats = [];
          lbls = labels.slice();
          for (ctrIdx = m = 0, len = centroids.length; m < len; ctrIdx = ++m) {
            ctr = centroids[ctrIdx];
            covMats.push(_updatePrecisionMatrix(data, ctrIdx, labels));
          }
          return interval = setInterval(runMahalanobis, 1000);
        } else {
          return interval = setInterval(run, 1000);
        }
      };
      _init = function(obj, k, distanceType, initMethod) {
        var centroids, data, initLabels, labels, m, ref, results1, row, uniqueLabels;
        labels = obj.labels;
        if (obj.data[0].length > 2) {
          _clusterWholeDataset = true;
          _xCol = obj.xCol;
          _yCol = obj.yCol;
        } else {
          _clusterWholeDataset = false;
        }
        data = (function() {
          var len, m, ref, results1;
          ref = obj.data;
          results1 = [];
          for (m = 0, len = ref.length; m < len; m++) {
            row = ref[m];
            results1.push(row.map(Number));
          }
          return results1;
        })();
        k = Number(k);
        console.log('K: ' + k);
        if (labels) {
          uniqueLabels = _getUniqueLabels(labels);
          _computeAcc = obj.acc;
        } else {
          uniqueLabels = (function() {
            results1 = [];
            for (var m = 0, ref = k - 1; 0 <= ref ? m <= ref : m >= ref; 0 <= ref ? m++ : m--){ results1.push(m); }
            return results1;
          }).apply(this);
          _computeAcc = false;
        }
        distanceType = distanceType.toLowerCase();
        initMethod = initMethod.toLowerCase();
        if (initMethod === 'forgy') {
          centroids = _initCentroids(data, k);
          initLabels = _assignSamples(data, centroids, 'euclidean');
        } else {
          initLabels = _initLabels(data.length - 1, k);
          centroids = _updateMeans(data, uniqueLabels, initLabels);
        }
        _updateGraph(data, centroids.map(function(x) {
          return x.val;
        }), initLabels);
        console.log('Starting K-Means');
        return _runKMeans(data, k, _maxIter, centroids, distanceType, uniqueLabels, labels);
      };
      return {
        run: _init,
        setGraph: _setGraph,
        getParameters: _getParameters
      };
    }
  ]).directive('appKmeans', [
    '$parse', function($parse) {
      return {
        restrict: 'E',
        template: "<svg width='100%' height='600'></svg>",
        link: function(scope, elem, attr) {
          var MARGIN_LEFT, MARGIN_TOP, _color, _drawDataPoints, _graph, _meanLayer, _redraw, _xScale, _yScale, rawSvg, svg;
          MARGIN_LEFT = 40;
          MARGIN_TOP = 20;
          _graph = null;
          _xScale = null;
          _yScale = null;
          _color = null;
          _meanLayer = null;
          _drawDataPoints = function(dataPoints) {
            var pointDots;
            _meanLayer.selectAll('.meanDots').remove();
            _meanLayer.selectAll('.assignmentLines').remove();
            pointDots = _graph.selectAll('.pointDots').data(dataPoints);
            pointDots.enter().append('circle').attr('class', 'pointDots').attr('r', 3).attr('cx', function(d) {
              return _xScale(d[0]);
            }).attr('cy', function(d) {
              return _yScale(d[1]);
            });
            pointDots.transition().duration(100).attr('cx', function(d) {
              return _xScale(d[0]);
            }).attr('cy', function(d) {
              return _yScale(d[1]);
            });
            return pointDots.exit().remove();
          };
          _redraw = function(dataPoints, means, assignments) {
            var assignmentLines, meanDots;
            assignmentLines = _meanLayer.selectAll('.assignmentLines').data(assignments);
            assignmentLines.enter().append('line').attr('class', 'assignmentLines').attr('x1', function(d, i) {
              return _xScale(dataPoints[i][0]);
            }).attr('y1', function(d, i) {
              return _yScale(dataPoints[i][1]);
            }).attr('x2', function(d, i) {
              return _xScale(means[d][0]);
            }).attr('y2', function(d, i) {
              return _yScale(means[d][1]);
            }).attr('stroke', function(d) {
              return _color(d);
            });
            assignmentLines.transition().duration(500).attr('x2', function(d, i) {
              return _xScale(means[d][0]);
            }).attr('y2', function(d, i) {
              return _yScale(means[d][1]);
            }).attr('stroke', function(d) {
              return _color(d);
            });
            meanDots = _meanLayer.selectAll('.meanDots').data(means);
            meanDots.enter().append('circle').attr('class', 'meanDots').attr('r', 5).attr('stroke', function(d, i) {
              return _color(i);
            }).attr('stroke-width', 3).attr('fill', 'white').attr('cx', function(d) {
              return _xScale(d[0]);
            }).attr('cy', function(d) {
              return _yScale(d[1]);
            });
            meanDots.transition().duration(500).attr('cx', function(d) {
              return _xScale(d[0]);
            }).attr('cy', function(d) {
              return _yScale(d[1]);
            });
            return meanDots.exit().remove();
          };
          rawSvg = elem.find("svg")[0];
          svg = d3.select(rawSvg);
          _graph = svg.append('g').attr('transform', 'translate(' + MARGIN_LEFT + ',' + MARGIN_TOP + ')');
          _meanLayer = _graph.append('g');
          _color = d3.scale.category10();
          scope.$watch('dataPoints', function(newDataPoints) {
            var maxXDataPoint, maxYDataPoint, minXDataPoint, minYDataPoint, row, xDataPoints, yDataPoints;
            if (newDataPoints) {
              xDataPoints = (function() {
                var len, m, results1;
                results1 = [];
                for (m = 0, len = newDataPoints.length; m < len; m++) {
                  row = newDataPoints[m];
                  results1.push(row[0]);
                }
                return results1;
              })();
              yDataPoints = (function() {
                var len, m, results1;
                results1 = [];
                for (m = 0, len = newDataPoints.length; m < len; m++) {
                  row = newDataPoints[m];
                  results1.push(row[1]);
                }
                return results1;
              })();
              minXDataPoint = d3.min(xDataPoints);
              maxXDataPoint = d3.max(xDataPoints);
              minYDataPoint = d3.min(yDataPoints);
              maxYDataPoint = d3.max(yDataPoints);
              _xScale = d3.scale.linear().domain([minXDataPoint, maxXDataPoint]).range([0, 600]);
              _yScale = d3.scale.linear().domain([minYDataPoint, maxYDataPoint]).range([0, 500]);
              return _drawDataPoints(newDataPoints);
            }
          }, true);
          scope.$watchCollection('assignments', function(newAssignments) {
            if (newAssignments) {
              return _redraw(scope.dataPoints, scope.means, newAssignments);
            }
          });
          return console.log('appKmeans directive linked');
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=kmeans.js.map