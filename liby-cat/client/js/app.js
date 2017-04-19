/**
 * Created by nafSadh on 13 Apr 2017.
 */
var app = angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngMaterial', 'ngAnimate', 'ngAria', 'ngMaterialSidemenu'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider',
    function ($stateProvider, $urlRouterProvider, $mdIconProvider) {
      $mdIconProvider
        .icon('wiki_books', '../res/Books.svg')
        .icon('pile_books', '../res/pile-books.svg')
      ;
      $stateProvider
        .state('frontPage', {
          url: '/',
          templateUrl: 'views/front-page.html',
          controller: 'FrontPageCtrl'
        })
        .state('signUp', {
          url: '/sign-up',
          templateUrl: 'views/sign-up.html',
          controller: 'SignUpCtrl'
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
        .state('settings', {
          url: '/settings',
          templateUrl: 'views/settings.html',
          controller: 'SettingsCtrl'
        })
        .state('orgs', {
          url: '/orgs',
          templateUrl: 'views/orgs.html',
          controller: 'OrgsCtrl'
        })
        .state('owned-catalogs', {
          url: '/owned-catalogs',
          templateUrl: 'views/owned-catalogs.html',
          controller: 'OwnedCatalogsCtrl'
        })
        .state('catalog-list', {
          url: '/catalog-list',
          templateUrl: 'views/catalog-list.html',
          controller: 'CatalogListCtrl'
        })
        .state('catalog', {
          url: '/catalog/:id',
          templateUrl: 'views/catalog.html',
          controller: 'CatalogCtrl'
        })
        .state('todo', {
          url: '/todo',
          templateUrl: 'views/todo.html',
          controller: 'TodoCtrl'
        })
        .state('wirefx', {
          url: '/wirefx',
          templateUrl: 'views/wireframe.html',
          controller: 'WireframeCtrl'
        });
      
      $urlRouterProvider
        .otherwise('/');
    }]);
