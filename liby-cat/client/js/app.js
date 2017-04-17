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
        .state('landingPage', {
          url: '',
          templateUrl: 'views/landing-page.html',
          controller: 'LandingPageCtrl'
        })
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
      
      $urlRouterProvider
        .otherwise('landingPage');
    }]);
