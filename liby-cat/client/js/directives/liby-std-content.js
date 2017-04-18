app.directive("libyStdContent", function libyStdContent(User) {
  return {
    transclude: true,
    templateUrl: "../views/directives/liby-std-content.html",
    link: function link($scope, iElement, iAttrs, controller, transcludeFn) {
        $scope.loggedIn = User.isAuthenticated();
      $scope.user = User.getCachedCurrent();
    }
  };
});
