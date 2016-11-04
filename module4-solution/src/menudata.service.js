(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http){

  var svc = this;

  svc.getAllCategories = function(){
      var obj = {
        url: 'https://davids-restaurant.herokuapp.com/categories.json'
      };
      return $http(obj).then(function(result){
        return result.data;
      });
  };
  svc.getItemsForCategory = function (categoryShortName){
      var obj = {
        url: ('https://davids-restaurant.herokuapp.com/menu_items.json?category='+categoryShortName)
      };
      return $http(obj).then(function(result){
        return result.data.menu_items;
      });
  };

}



})();
