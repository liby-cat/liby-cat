app.directive("libyStdContent", function libyStdContent($state, User) {
  return {
    transclude: true,
    templateUrl: "../views/directives/liby-std-content.html",
    link: function link($scope, element, attrs, controller, transcludeFn) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = $scope.user ? $scope.user : User.getCachedCurrent();
      $scope.log_out = function () {
        User.logout(function success() {
          $state.go('frontPage');
        }, function err() {
          $state.go('frontPage');
        });
      }
    }
  };
});
