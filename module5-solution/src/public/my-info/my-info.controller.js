(function(){
"use strict"

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService']

function MyInfoController(UserService){
  var myInfoCtrl = this;

  myInfoCtrl.user = UserService.getUser();

  myInfoCtrl.getCategorieFromDish = function(){
    var cat = myInfoCtrl.user.favorite_dish.replace(/[0-9]/g, '');
    return cat;
  }

  myInfoCtrl.isUserSignup = function(){
    return UserService.isUserSignup();
  }


}

})();
