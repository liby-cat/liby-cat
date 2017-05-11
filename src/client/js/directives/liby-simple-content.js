app.directive('libySimpleContent', function libyStdContent($state, $mdSidenav, $cookies, $mdMedia, User) {
  return {
    transclude: true,
    templateUrl: '../views/directives/liby-simple-content.html',
    link: function link($scope, element, attrs, controller, transcludeFn) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = $scope.user ? $scope.user : User.getCachedCurrent();
    }
  };
});
