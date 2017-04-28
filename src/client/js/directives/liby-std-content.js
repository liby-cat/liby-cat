'use strict';

app.directive("libyStdContent", function libyStdContent($state, $mdSidenav, $mdMedia, User) {
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
      };
  
      $scope.showSideNav = _global.showSideNav;
      
      $scope.toggleSideNav = function () {
        let sideNav = $mdSidenav('side-nav');
        let gtSm = $mdMedia('gt-sm');
        if (gtSm) {
          $scope.showSideNav = _global.showSideNav = !_global.showSideNav;
        } else {
          sideNav.toggle();
        }
      };
      
      $scope.openSideNav = function () {
        $mdSidenav('side-nav').open();
      };
      $scope.closeSideNav = function () {
        $mdSidenav('side-nav').close();
      };
    }
  };
});
