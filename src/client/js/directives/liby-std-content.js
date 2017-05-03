app.directive('libyStdContent', function libyStdContent($state, $mdSidenav, $cookies, $mdMedia, User) {
  return {
    transclude: true,
    templateUrl: '../views/directives/liby-std-content.html',
    link: function link($scope, element, attrs, controller, transcludeFn) {
      $scope.loggedIn = User.isAuthenticated();
      $scope.user = $scope.user ? $scope.user : User.getCachedCurrent();
      $scope.logOut = function() {
        User.logout(function success() {
          $state.go('frontPage');
        }, function err() {
          $state.go('frontPage');
        });
      };

      $scope.goToProfile = function () {
        $state.go('settings');
      };
  
      $scope.showSideNav = 'hide' !== $cookies.get(COOKIE_PREFIX + 'showSideNav');
      console.log($scope.showSideNav);
  
      $scope.toggleSideNav = function() {
        let sideNav = $mdSidenav('side-nav');
        let gtSm = $mdMedia('gt-sm');
        if (gtSm) {
          $scope.showSideNav = !$scope.showSideNav;
          console.log($scope.showSideNav);
          $cookies.put(COOKIE_PREFIX + 'showSideNav', $scope.showSideNav ? 'show' : 'hide');
        } else {
          sideNav.toggle();
        }
      };

      $scope.openSideNav = function() {
        $mdSidenav('side-nav').open();
      };
      $scope.closeSideNav = function() {
        $mdSidenav('side-nav').close();
      };
    }
  };
});
