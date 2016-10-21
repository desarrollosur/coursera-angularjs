(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.lunch = "";
  $scope.message = "";
  $scope.correct = false;

  $scope.checkLunch = function(){
      var lunchArray = parseLunchText($scope.lunch);
      if(lunchArray.length==0){
          $scope.message = "Please enter data first";
          $scope.correct = false;
      }else if (lunchArray.length<4) {
          $scope.message = "Enjoy!";
          $scope.correct = true;
      }else{
           $scope.message = "Too Much!";
           $scope.correct = true;
      }
  };

  function parseLunchText(lunchText){
      var result = [];
      var lunchArray = lunchText.split(',');
      angular.forEach(lunchArray, function(currentLunch){
          if(currentLunch.trim().length > 0){
            result.push(currentLunch);
          }
      });
      return result;
  }

}

})();
