// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, ChartsBarChart,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');

  module.exports = ChartsBarChart = (function(superClass) {
    extend(ChartsBarChart, superClass);

    function ChartsBarChart() {
      return ChartsBarChart.__super__.constructor.apply(this, arguments);
    }

    ChartsBarChart.prototype.initialize = function() {};

    ChartsBarChart.prototype.drawBar = function(width, height, data, _graph, gdata) {
      var counts, currentVar, i, j, k, minXvalue, minYvalue, padding, rectWidth, ref, ref1, sameCounts, x, xAxis, xAxisLabel_x, xAxisLabel_y, y, yAxis, yAxisLabel_x, yAxisLabel_y;
      padding = 50;
      x = d3.scale.linear().range([padding, width - padding]);
      y = d3.scale.linear().range([height - padding, padding]);
      xAxis = d3.svg.axis().scale(x).orient('bottom');
      yAxis = d3.svg.axis().scale(y).orient('left');
      x.domain([
        d3.min(data, function(d) {
          return parseFloat(d.x);
        }), d3.max(data, function(d) {
          return parseFloat(d.x);
        })
      ]);
      y.domain([
        d3.min(data, function(d) {
          return parseFloat(d.y);
        }), d3.max(data, function(d) {
          return parseFloat(d.y);
        })
      ]);
      xAxisLabel_x = width - 80;
      xAxisLabel_y = 40;
      yAxisLabel_x = -70;
      yAxisLabel_y = -70;
      if (!data[0].y) {
        if (isNaN(data[0].x)) {
          counts = {};
          for (i = j = 0, ref = data.length - 1; j <= ref; i = j += 1) {
            currentVar = data[i].x;
            counts[currentVar] = counts[currentVar] || 0;
            counts[currentVar]++;
          }
          counts = d3.entries(counts);
          sameCounts = true;
          for (i = k = 1, ref1 = counts.length - 1; k <= ref1; i = k += 1) {
            if (counts[i].value !== counts[0].value) {
              sameCounts = false;
            }
          }
          x = d3.scale.ordinal().rangeRoundBands([padding, width - padding], .1);
          xAxis = d3.svg.axis().scale(x).orient('bottom');
          x.domain(counts.map(function(d) {
            return d.key;
          }));
          if (sameCounts) {
            y.domain([0, counts[0].value]);
          } else {
            y.domain([
              d3.min(counts, function(d) {
                return parseInt(d.value);
              }), d3.max(counts, function(d) {
                return parseInt(d.value);
              })
            ]);
          }
          _graph.selectAll('rect').data(counts).enter().append('rect').attr('class', 'bar').attr('x', function(d) {
            return x(d.key);
          }).attr('width', x.rangeBand()).attr('y', function(d) {
            return y(d.value);
          }).attr('height', function(d) {
            return Math.abs(height - y(d.value)) - padding;
          }).attr('fill', 'steelblue');
          _graph.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + (height - padding) + ')').call(xAxis);
          _graph.append('g').attr('class', 'y axis').attr('transform', 'translate(' + padding + ',0)').call(yAxis).style('font-size', '16px');
          _graph.selectAll('.x.axis path').style({
            'fill': 'none',
            'stroke': 'black',
            'shape-rendering': 'crispEdges',
            'stroke-width': '1px'
          });
          _graph.selectAll('.y.axis path').style({
            'fill': 'none',
            'stroke': 'black',
            'shape-rendering': 'crispEdges',
            'stroke-width': '1px'
          });
          _graph.selectAll('.x.axis text').attr('transform', function(d) {
            return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-40)';
          }).style('font-size', '16px');
          _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(' + width + ',' + (height - padding / 2) + ')').text(gdata.xLab.value);
          return _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(0,' + padding / 2 + ')').text("Counts");
        } else {
          y = d3.scale.ordinal().rangeRoundBands([height - padding, padding], .1);
          yAxis = d3.svg.axis().scale(y).orient('left');
          y.domain(function(d) {
            return d.x;
          });
          minXvalue = d3.min(data, function(d) {
            return d.x;
          });
          rectWidth = (height - 2 * padding) / data.length;
          _graph.selectAll('rect').data(data).enter().append('rect').attr('class', 'bar').attr('x', padding).attr('width', function(d) {
            return (x(d.x)) - (x(minXvalue));
          }).attr('y', function(d, i) {
            return i * rectWidth + padding;
          }).attr('height', rectWidth).attr('fill', 'steelblue');
          _graph.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + (height - padding) + ')').call(xAxis);
          _graph.append('g').attr('class', 'y axis').attr('transform', 'translate(' + padding + ',0)').call(yAxis);
          _graph.selectAll('.x.axis path').style({
            'fill': 'none',
            'stroke': 'black',
            'shape-rendering': 'crispEdges',
            'stroke-width': '1px'
          });
          _graph.selectAll('.y.axis path').style({
            'fill': 'none',
            'stroke': 'black',
            'shape-rendering': 'crispEdges',
            'stroke-width': '1px'
          });
          _graph.selectAll('.x.axis text').attr('transform', function(d) {
            return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-40)';
          }).style('font-size', '16px');
          return _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(' + width + ',' + (height - padding / 2) + ')').text(gdata.xLab.value);
        }
      } else {
        if (isNaN(data[0].y)) {
          y = d3.scale.ordinal().rangeRoundBands([padding, height - padding], .1);
          y.domain(data.map(function(d) {
            return d.y;
          }));
          yAxis = d3.svg.axis().scale(y).orient('left');
          minXvalue = d3.min(data, function(d) {
            return d.x;
          });
          _graph.selectAll('rect').data(data).enter().append('rect').attr('class', 'bar').attr('x', padding).attr('width', function(d) {
            return Math.abs((x(d.x)) - (x(minXvalue)));
          }).attr('y', function(d) {
            return y(d.y);
          }).attr('height', y.rangeBand()).attr('fill', 'steelblue');
          _graph.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + (height - padding) + ')').call(xAxis).style('font-size', '16px');
          _graph.append('g').attr('class', 'y axis').attr('transform', 'translate(' + padding + ',0)').call(yAxis).style('font-size', '16px');
          _graph.selectAll('.x.axis path').style({
            'fill': 'none',
            'stroke': 'black',
            'shape-rendering': 'crispEdges',
            'stroke-width': '1px'
          });
          _graph.selectAll('.y.axis path').style({
            'fill': 'none',
            'stroke': 'black',
            'shape-rendering': 'crispEdges',
            'stroke-width': '1px'
          });
          _graph.selectAll('.x.axis text').attr('transform', function(d) {
            return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-40)';
          }).style('font-size', '16px');
          _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(' + width + ',' + (height - padding / 2) + ')').text(gdata.xLab.value);
          return _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(0,' + padding / 2 + ')').text(gdata.yLab.value);
        } else if (!isNaN(data[0].y)) {
          if (isNaN(data[0].x)) {
            x = d3.scale.ordinal().rangeRoundBands([padding, width - padding], .1);
            x.domain(data.map(function(d) {
              return d.x;
            }));
            xAxis = d3.svg.axis().scale(x).orient('bottom');
            minYvalue = d3.min(data, function(d) {
              return d.y;
            });
            console.log(minYvalue);
            _graph.selectAll('rect').data(data).enter().append('rect').attr('class', 'bar').attr('x', function(d) {
              return x(d.x);
            }).attr('width', x.rangeBand()).attr('y', function(d) {
              return y(d.y);
            }).attr('height', function(d) {
              return Math.abs(height - y(d.y)) - padding;
            }).attr('fill', 'steelblue');
            _graph.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + (height - padding) + ')').call(xAxis).style('font-size', '16px');
            _graph.append('g').attr('class', 'y axis').attr('transform', 'translate(' + padding + ',0)').call(yAxis).style('font-size', '16px');
            _graph.selectAll('.x.axis path').style({
              'fill': 'none',
              'stroke': 'black',
              'shape-rendering': 'crispEdges',
              'stroke-width': '1px'
            });
            _graph.selectAll('.y.axis path').style({
              'fill': 'none',
              'stroke': 'black',
              'shape-rendering': 'crispEdges',
              'stroke-width': '1px'
            });
            _graph.selectAll('.x.axis text').attr('transform', function(d) {
              return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-40)';
            }).style('font-size', '16px');
            _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(' + width + ',' + (height - padding / 2) + ')').text(gdata.xLab.value);
            return _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(0,' + padding / 2 + ')').text(gdata.yLab.value);
          } else {
            rectWidth = (width - 2 * padding) / data.length;
            _graph.selectAll('rect').data(data).enter().append('rect').attr('class', 'bar').attr('x', function(d) {
              return x(d.x);
            }).attr('width', rectWidth).attr('y', function(d) {
              return y(d.y);
            }).attr('height', function(d) {
              return Math.abs(height - y(d.y)) - padding;
            }).attr('fill', 'steelblue');
            _graph.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + (height - padding) + ')').call(xAxis).style('font-size', '16px');
            _graph.append('g').attr('class', 'y axis').attr('transform', 'translate(' + padding + ',0)').call(yAxis).style('font-size', '16px');
            _graph.selectAll('.x.axis path').style({
              'fill': 'none',
              'stroke': 'black',
              'shape-rendering': 'crispEdges',
              'stroke-width': '1px'
            });
            _graph.selectAll('.y.axis path').style({
              'fill': 'none',
              'stroke': 'black',
              'shape-rendering': 'crispEdges',
              'stroke-width': '1px'
            });
            _graph.selectAll('.x.axis text').attr('transform', function(d) {
              return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-40)';
            }).style('font-size', '16px');
            _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(' + width + ',' + (height - padding / 2) + ')').text(gdata.xLab.value);
            return _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(0,' + padding / 2 + ')').text(gdata.yLab.value);
          }
        }
      }
    };

    return ChartsBarChart;

  })(BaseService);

}).call(this);

//# sourceMappingURL=ChartsBarChart.service.js.map