'use strict'

BaseService = require 'scripts/BaseClasses/BaseService.coffee'

module.exports = class ChartsBinnedHeatmapChart extends BaseService
  @inject '$q',
    '$stateParams',
    'app_analysis_charts_dataTransform',
    'app_analysis_charts_list',
    'app_analysis_charts_sendData',
    'app_analysis_charts_checkTime',
    'app_analysis_charts_dataService',
    'app_analysis_charts_msgService'

  initialize: ->
    @msgService = @app_analysis_charts_msgService
    @dataService = @app_analysis_charts_dataService
    @dataTransform = @app_analysis_charts_dataTransform
    @list = @app_analysis_charts_list
    @sendData = @app_analysis_charts_sendData
    @checkTime = @app_analysis_charts_checkTime
    @DATA_TYPES = @dataService.getDataTypes()

    @ve = require 'vega-embed'
    @vt = require 'vega-tooltip/build/vega-tooltip.js'

  getName: () ->
    return 'Heatmap'

  draw: (data, labels, container, flags) ->

    container.select("#slider").remove()
    container.select("#maxbins").remove()

    xbin = if flags.xBin then flags.xBin else 60
    ybin = if flags.yBin then flags.yBin else 40

    x_ = labels.xLab.value
    y_ = labels.yLab.value

    sumx = 0
    sumy = 0
    for dic in data
      sumx += parseFloat(dic[x_])
      sumy += parseFloat(dic[y_])

    mean_x = sumx/data.length
    mean_y = sumy/data.length

    for dic in data
      dic["residual_x"] = (dic[x_] - mean_x).toFixed(3)
      dic["residual_y"] = (dic[y_] - mean_y).toFixed(3)

    if (flags.x_residual)
      labels.xLab.value = "residual_x"

    if (flags.y_residual)
      labels.yLab.value = "residual_y"

    vlSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
      "data": {"values": data},
      "transform": [{
        "filter": {"and": [
          {"field": labels.xLab.value, "valid": true},
          {"field": labels.yLab.value, "valid": true}
        ]}
      }],
      "mark": "rect",
      "width": 500,
      "height": 500,
      "encoding": {
        "x": {
          "field": labels.xLab.value,
          "type": "ordinal"
        },
        "y": {
          "field": labels.yLab.value,
          "type": "ordinal"
        },
        "color": {
          "aggregate": "count",
          "type": "quantitative"
        }
      },
      "config": {
        "range": {
          "heatmap": {
            "scheme": "greenblue"
          }
        },
        "view": {
          "stroke": "transparent"
        }
      }
    }

    if (flags.binned)
      vlSpec["encoding"]["x"]["bin"] = {"maxbins": xbin}
      vlSpec["encoding"]["x"]["type"] = "quantitative"
      vlSpec["encoding"]["y"]["bin"] = {"maxbins": ybin}
      vlSpec["encoding"]["y"]["type"] = "quantitative"
    if (flags.bubble)
      vlSpec["mark"] = "circle"


    opt =
      "actions": {export: true, source: false, editor: true}

    @ve('#vis', vlSpec, opt, (error, result) -> return).then((result) =>
      @vt.vegaLite(result.view, vlSpec)
    )
