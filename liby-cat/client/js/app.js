/**
 * Created by nafSadh on 13 Apr 2017.
 */
angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngMaterial', 'ngAnimate', 'ngAria'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider',
    function ($stateProvider, $urlRouterProvider, $mdIconProvider) {
      $mdIconProvider
        .defaultFontSet( 'fa' );
      
      $stateProvider
        .state('frontPage', {
          url: '',
          templateUrl: 'views/front-page.html',
          controller: 'FrontPageCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('todo', {
          url: '/todo',
          templateUrl: 'views/todo.html',
          controller: 'TodoCtrl'
        });
      
      $urlRouterProvider
        .otherwise('frontPage');
    }]);
