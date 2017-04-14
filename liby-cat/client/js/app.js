/**
 * Created by nafSadh on 13 Apr 2017.
 */
angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngMaterial','ngAnimate','ngAria'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('login', {
        url: '',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
    
    $urlRouterProvider.otherwise('login');
  }]);
