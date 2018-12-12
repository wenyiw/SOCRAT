'use strict'

require 'jquery-ui/ui/widgets/slider'

BaseDirective = require 'scripts/BaseClasses/BaseDirective'

module.exports = class ChartsDir extends BaseDirective
  @inject 'app_analysis_charts_areaChart',
          'app_analysis_charts_areaTrellisChart'
          'app_analysis_charts_barChart',
          'app_analysis_charts_bivariateLineChart',
          'app_analysis_charts_bubbleChart',
          'app_analysis_charts_histogram',
          'app_analysis_charts_lineChart',
          'app_analysis_charts_normalChart',
          'app_analysis_charts_pieChart',
          'app_analysis_charts_scatterPlot',
          'app_analysis_charts_streamChart',
          'app_analysis_charts_stackedBar',
          'app_analysis_charts_tilfordTree',
          'app_analysis_charts_trellisChart',
          'app_analysis_charts_treemap',
          'app_analysis_charts_tukeyBoxPlot',
          'app_analysis_charts_checkTime',
          'app_analysis_charts_heatmap',
          'app_analysis_charts_stripPlot'
          'app_analysis_charts_scatterMatrix'
          'app_analysis_charts_divergingStackedBar'
          'app_analysis_charts_rangedDotPlot'
          'app_analysis_charts_bulletChart'
          'app_analysis_charts_wordCloud'
          'app_analysis_charts_sunburst'
          'app_analysis_charts_cumulative'
          'app_analysis_charts_residual'

  initialize: ->
    @areaTrellis = @app_analysis_charts_areaTrellisChart
    @bar = @app_analysis_charts_barChart
    @bubble = @app_analysis_charts_bubbleChart
    @histogram = @app_analysis_charts_histogram
    @pie = @app_analysis_charts_pieChart
    @scatterPlot = @app_analysis_charts_scatterPlot
    @stackBar = @app_analysis_charts_stackedBar
    @time = @app_analysis_charts_checkTime
    @trellis = @app_analysis_charts_trellisChart
    @streamGraph = @app_analysis_charts_streamChart
    @area = @app_analysis_charts_areaChart
    @treemap = @app_analysis_charts_treemap
    @line = @app_analysis_charts_lineChart
    @bivariate = @app_analysis_charts_bivariateLineChart
    @normal = @app_analysis_charts_normalChart
    @tukeyBoxPlot = @app_analysis_charts_tukeyBoxPlot
    @heatmap = @app_analysis_charts_heatmap
    @stripPlot = @app_analysis_charts_stripPlot
    @scatterMatrix = @app_analysis_charts_scatterMatrix
    @divergingStackedBar = @app_analysis_charts_divergingStackedBar
    @rangedDotPlot = @app_analysis_charts_rangedDotPlot
    @bulletChart = @app_analysis_charts_bulletChart
    @wordCloud = @app_analysis_charts_wordCloud
    @sunburst = @app_analysis_charts_sunburst
    @cumulativeFrequency = @app_analysis_charts_cumulative
    @residual = @app_analysis_charts_residual

    @charts = {
      'Scatter Plot Matrix': @scatterMatrix
      'Bar Graph': @bar
      'Scatter Plot': @scatterPlot
      'Histogram': @histogram
      'Tukey Box Plot (1.5 IQR)': @tukeyBoxPlot
      'Pie Chart': @pie
      'Normal Distribution': @normal
      'Heatmap': @heatmap
      'Strip Plot': @stripPlot
      'Ranged Dot Plot': @rangedDotPlot
      'Word Cloud': @wordCloud
      'Cumulative Frequency': @cumulativeFrequency
    }

    @restrict = 'E'
    @template = "<div id='vis' class='graph-container' style='overflow:auto; height: 600px'></div>"

    @link = (scope, elem) =>
      data = null
      labels = null
      container = null

      # add segments to a slider
      # https://designmodo.github.io/Flat-UI/docs/components.html#fui-slider
      $.fn.addSliderSegments = (amount, orientation) ->
        @.each () ->
          if orientation is "vertical"
            output = ''
            for i in [0..amount-2]
              output += '<div class="ui-slider-segment" style="top:' + 100 / (amount - 1) * i + '%;"></div>'
            $(this).prepend(output)
          else
            segmentGap = 100 / (amount - 1) + "%"
            segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>'
            $(this).prepend(segment.repeat(amount - 2))

      scope.$watch 'mainArea.chartData', (newChartData) =>
          if newChartData and newChartData.chartParams
            data = newChartData.chartParams.data
            labels = newChartData.chartParams.labels
            scheme = newChartData.chartParams.graph
            flags = newChartData.chartParams.flags

          d3charts = d3.select(elem.find('div')[0]).node().parentNode
          container = d3.select(d3charts)
          @charts[scheme.name].draw(data, labels, container, flags)
