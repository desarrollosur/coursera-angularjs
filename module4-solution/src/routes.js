(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/home.template.html'
    })
    .state('categories', {
      url: '/categories',
      controller: ['items', function(items){
        var catCtrl = this;
        catCtrl.items = items;
      }],
      controllerAs: 'catCtrl',
      template: '<categories items="catCtrl.items"></categories>',
      resolve: {
          items: ['MenuDataService', function(MenuDataService){
                    return MenuDataService.getAllCategories();
                }]
      }
    })
    .state('items', {
      url: '/items/{categorie}',
      controller: ['items', function(items){
        var itCtrl = this;
        itCtrl.items = items;
      }],
      controllerAs: 'itCtrl',
      template: '<items items="itCtrl.items"></items>',
      resolve: {
          items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){
                    return MenuDataService.getItemsForCategory($stateParams.categorie);
                }]
      }
    });
}


})();
