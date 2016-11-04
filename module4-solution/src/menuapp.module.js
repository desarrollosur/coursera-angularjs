(function () {
'use strict';

angular.module('MenuApp',['ui.router', 'data']);

angular.module('MenuApp').run(RunConfig);

RunConfig.$inject = ['$rootScope'];
function RunConfig($rootScope){
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    console.log("errores:", error);
  });
  
}

})();
