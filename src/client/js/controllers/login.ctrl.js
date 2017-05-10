app.controller('LoginCtrl', [
    '$scope', '$rootScope', '$state', 'User', '$mdToast',
    function($scope, $rootScope, $state, User, $mdToast) {
      $scope.vm = {
        newUser: {},
        submit: function() {
          let cred = {password: $scope.vm.newUser.password};
          if (validateEmail($scope.vm.newUser.login)) {
            cred.email = $scope.vm.newUser.login;
          } else {
            cred.username = $scope.vm.newUser.login;
          }

          User.login(cred,
            function success(value, res) {
              let username = value.user.username;
              $mdToast.showSimple('Successfully signed in: ' + username);
              $rootScope.user = value.user;
              $state.go('dashboard');
            },
            function error(er) {
              $mdToast.showSimple('Invalid credentials');
              User.logout();
            });
        }
      };
    }]);
