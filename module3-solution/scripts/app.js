(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'template/foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ndownCtrl = this;

  ndownCtrl.found = [];
  ndownCtrl.searchTerm = "";
  ndownCtrl.statusMessage = "";

  ndownCtrl.search = function(){
    MenuSearchService.getMatchedMenuItems(ndownCtrl.searchTerm).then(
      function(response){
          ndownCtrl.found = response;
          ndownCtrl.statusMessage = "";
      },
      function(error){
          ndownCtrl.found = [];
          ndownCtrl.statusMessage = error;
      }
    );
  }

  ndownCtrl.removeItem = function (itemIndex) {
      ndownCtrl.found.splice(itemIndex, 1);
  };
}


MenuSearchService.$inject = ['$http','$q'];
function MenuSearchService($http, $q) {

  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    if(searchTerm.trim().length==0){
      return $q.reject('Nothing Found');
    }
    var reqObj = {
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    };
    return $http(reqObj).then(function (result) {
        // process result and only keep items that match
        var foundItems = [];

        angular.forEach(result.data.menu_items, function(item){
          if(item.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1){
                foundItems.push(item);
          }
        });
        // return processed items
        if(foundItems.length > 0){
            return foundItems;
        }else{
            return $q.reject('Nothing Found');
        }
      });
  }
}


})();
