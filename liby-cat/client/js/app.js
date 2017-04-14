/**
 * Created by nafSadh on 13 Apr 2017.
 */
angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
                                                            $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
      });
    
    $urlRouterProvider.otherwise('todo');
  }]);
