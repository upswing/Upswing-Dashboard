(function() {
  'use strict';
  angular.module('app.ui.form.ctrls', []).controller('TagsDemoCtrl', [
    '$scope', function($scope) {
      return $scope.tags = ['foo', 'bar'];
    }
  ]).controller('DatepickerDemoCtrl', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      $scope.today = function() {
        // return $scope.dt = new Date();
        //$scope.dt_start = new Date();
        $rootScope.dt_start = new Date();
        $scope.dt_end = new Date();
      };
      $scope.today();
      $scope.showWeeks = true;
      $scope.toggleWeeks = function() {
        return $scope.showWeeks = !$scope.showWeeks;
      };
      $scope.clear = function() {
        $rootScope.dt_start = null;
        $scope.dt_end = null;
      };
      $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      };
      $scope.toggleMin = function() {
        var _ref;
        return $scope.minDate = (_ref = $scope.minDate) != null ? _ref : {
          "null": new Date()
        };
      };
      $scope.toggleMin();
      $scope.open = function($event, sore) {
        $event.preventDefault();
        $event.stopPropagation();
        if(sore == 0) {
          return $scope.opened_start = true;
        } else {
          return $scope.opened_end = true;
        }
      };
      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'MM/dd/yyyy', 'shortDate'];
      $scope.$watch('dt_start', function(new_date) {
        //$scope.$emit('set_date', new_date);
        $rootScope.dt_global_start = new_date;
      });
      $rootScope.dt_format = $scope.formats[2];
      return $scope.format = $scope.formats[2];
    }
  ]).controller('TimepickerDemoCtrl', [
    '$scope', function($scope) {
      $scope.mytime = new Date();
      $scope.hstep = 1;
      $scope.mstep = 15;
      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };
      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        return $scope.ismeridian = !$scope.ismeridian;
      };
      $scope.update = function() {
        var d;
        d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        return $scope.mytime = d;
      };
      $scope.changed = function() {
        return console.log('Time changed to: ' + $scope.mytime);
      };
      return $scope.clear = function() {
        return $scope.mytime = null;
      };
    }
  ]).controller('TypeaheadCtrl', [
    '$scope', function($scope) {
      $scope.selected = void 0;
      return $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    }
  ]).controller('RatingDemoCtrl', [
    '$scope', function($scope) {
      $scope.rate = 7;
      $scope.max = 10;
      $scope.isReadonly = false;
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        return $scope.percent = 100 * (value / $scope.max);
      };
      return $scope.ratingStates = [
        {
          stateOn: 'glyphicon-ok-sign',
          stateOff: 'glyphicon-ok-circle'
        }, {
          stateOn: 'glyphicon-star',
          stateOff: 'glyphicon-star-empty'
        }, {
          stateOn: 'glyphicon-heart',
          stateOff: 'glyphicon-ban-circle'
        }, {
          stateOn: 'glyphicon-heart'
        }, {
          stateOff: 'glyphicon-off'
        }
      ];
    }
  ]);

}).call(this);

//# sourceMappingURL=FormCtrl.js.map
