(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['MenuService'];
function UserService(MenuService) {
  var service = this;

  service.user = {};

  service.signup = function (newuser) {
    angular.copy(newuser, service.user);
  };

  service.getUser = function () {
    return service.user;
  };

  service.isUserSignup = function(){
    return service.user.hasOwnProperty('favorite_dish');
  }

}



})();
