(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.buyItem = buyItem;
  toBuyCtrl.toBuyList = ShoppingListCheckOffService.getToBuyList();

  function buyItem(index){
    ShoppingListCheckOffService.buyItem(index);
  }



}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;
  boughtCtrl.cancelBuy = cancelBuy;
  boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtList();

  function cancelBuy(index){
    ShoppingListCheckOffService.cancelBuy(index);
  }
}

function ShoppingListCheckOffService(){
  var service = this;
  var toBuyList = [
    {
      name: 'Product A',
      quantity: 2
    },
    {
      name: 'Product B',
      quantity: 3
    },
    {
      name: 'Product C',
      quantity: 5
    },
    {
      name: 'Product D',
      quantity: 7
    },
    {
      name: 'Product E',
      quantity: 11
    }
  ];
  var boughtList = [];

  service.buyItem = function(index){
    var item = toBuyList[index];
    boughtList.push(item);
    toBuyList.splice(index, 1);
  }

  service.cancelBuy = function(index){
    var item = boughtList[index];
    toBuyList.push(item);
    boughtList.splice(index, 1);
  }

  service.getToBuyList = function(){
    return toBuyList;
  }

  service.getBoughtList = function(){
    return boughtList;
  }

}

})();
