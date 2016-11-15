(function(){
"use strict"

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserService','MenuService']

function SignupController(UserService, MenuService){
  var signupCtrl = this;
  signupCtrl.newuser = {};
  signupCtrl.errorms = "";
  signupCtrl.success = false;

  signupCtrl.signup = function(){
      signupCtrl.errorms = "";
      signupCtrl.success = false;

      if(signupCtrl.newuser.favorite_dish && signupCtrl.newuser.favorite_dish.trim().length > 0){
        MenuService.getMenuItems().then(function (response) { // getting all menu items
          var found = false;
          angular.forEach(response.menu_items, function(menuItem){
            if(menuItem.short_name.toLowerCase()==signupCtrl.newuser.favorite_dish.trim().toLowerCase()){
              found = true;
              signupCtrl.newuser.dish = menuItem;
            }
          });
          if(found){ // if the dish is in the list
            UserService.signup(signupCtrl.newuser);
            signupSuccess(true);
          }else{ // there dish is not in the list
            signupError('No such menu number exists');
          }
        }, function(error){ // error in the service communication
          signupError(error);
        });
      }else{
        signupError('Must chose an item code');
      }

  }

  function signupSuccess(){
    signupCtrl.errorms = "";
    signupCtrl.success = true;
  }

  function signupError(error){
    signupCtrl.errorms = error;
    signupCtrl.success = false;
  }

}

})();
