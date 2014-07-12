(function() {
  'use strict';
  angular.module('app.chart.directives', []).directive('gaugeChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, gauge, options;
          data = scope.data;
          options = scope.options;
          gauge = new Gauge(ele[0]).setOptions(options);
          gauge.maxValue = data.maxValue;
          gauge.animationSpeed = data.animationSpeed;
          return gauge.set(data.val);
        }
      };
    }
  ]).directive('flotChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          scope.line1 = {};
          scope.line1.options = {};
          scope.color = {};

          scope.line1.options = {
            series: {
              lines: {
                show: true,
                fill: true,
                fillColor: {
                  colors: [
                    {
                      opacity: 0
                    }, {
                      opacity: 0.3
                    }
                  ]
                }
              },
              points: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: "#ffffff",
                symbol: "circle",
                radius: 5
              }
            },
            colors: [scope.color.primary, scope.color.infoAlt],
            tooltip: true,
            tooltipOpts: {
              defaultTheme: false
            },
            grid: {
              hoverable: true,
              clickable: true,
              tickColor: "#f9f9f9",
              borderWidth: 1,
              borderColor: "#eeeeee"
            },
            xaxis: {
              ticks: [[1, 'Jan.'], [2, 'Feb.'], [3, 'Mar.'], [4, 'Apr.'], [5, 'May'], [6, 'June'], [7, 'July'], [8, 'Aug.'], [9, 'Sept.'], [10, 'Oct.'], [11, 'Nov.'], [12, 'Dec.']]
            }
          };

          scope.$watch('data', function() {
            if (scope.data.length > 0) {
              scope.line1.data = [
              { 
                data: scope.data,
                label: 'Trend'
              }
              ];
              $.plot(ele[0], scope.line1.data, scope.line1.options);
              ele.show();
            }
          })
        }
      };
    }
  ]).directive('flotChartRealtime', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var data, getRandomData, plot, totalPoints, update, updateInterval;
          data = [];
          totalPoints = 300;
          getRandomData = function() {
            var i, prev, res, y;
            if (data.length > 0) {
              data = data.slice(1);
            }
            while (data.length < totalPoints) {
              prev = (data.length > 0 ? data[data.length - 1] : 50);
              y = prev + Math.random() * 10 - 5;
              if (y < 0) {
                y = 0;
              } else {
                if (y > 100) {
                  y = 100;
                }
              }
              data.push(y);
            }
            res = [];
            i = 0;
            while (i < data.length) {
              res.push([i, data[i]]);
              ++i;
            }
            return res;
          };
          update = function() {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);
          };
          data = [];
          totalPoints = 300;
          updateInterval = 200;
          plot = $.plot(ele[0], [getRandomData()], {
            series: {
              lines: {
                show: true,
                fill: true
              },
              shadowSize: 0
            },
            yaxis: {
              min: 0,
              max: 100
            },
            xaxis: {
              show: false
            },
            grid: {
              hoverable: true,
              borderWidth: 1,
              borderColor: '#eeeeee'
            },
            colors: ["#70b1cf"]
          });
          return update();
        }
      };
    }
  ]).directive('sparkline', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, sparkResize, sparklineDraw;
          data = scope.data;
          options = scope.options;
          sparkResize = void 0;
          sparklineDraw = function() {
            return ele.sparkline(data, options);
          };
          $(window).resize(function(e) {
            clearTimeout(sparkResize);
            return sparkResize = setTimeout(sparklineDraw, 200);
          });
          return sparklineDraw();
        }
      };
    }
  ]).directive('morrisChart', [
    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          type: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, func, options, type;
          data = scope.data;
          type = scope.type;
          switch (type) {
            case 'line':
              options = angular.extend({
                element: ele[0],
                data: data
              }, scope.options);
              return new Morris.Line(options);
            case 'area':
              options = angular.extend({
                element: ele[0],
                data: data
              }, scope.options);
              return new Morris.Area(options);
            case 'bar':
              options = angular.extend({
                element: ele[0],
                data: data
              }, scope.options);
              return new Morris.Bar(options);
            case 'donut':
              options = angular.extend({
                element: ele[0],
                data: data
              }, scope.options);
              if (options.formatter) {
                func = new Function('y', 'data', options.formatter);
                options.formatter = func;
              }
              return new Morris.Donut(options);
          }
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=ChartDirective.js.map
