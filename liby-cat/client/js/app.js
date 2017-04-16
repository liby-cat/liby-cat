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
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('todo', {
        url: '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
      });
    
    $urlRouterProvider.otherwise('login');
  }]);
