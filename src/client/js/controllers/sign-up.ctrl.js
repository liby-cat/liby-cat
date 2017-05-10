app.controller('SignUpCtrl', [
  '$scope', '$rootScope', '$state', 'User', '$mdToast', '$q',
  function ($scope, $rootScope, $state, User, $mdToast, $q) {
      $scope.vm = {
        formData: {},
        submit: function() {
          let cred = {password: $scope.vm.formData.password};
          cred.email = $scope.vm.formData.email;
          cred.username = $scope.vm.formData.username;
          User.create(cred,
            function success(value, res) {
              let username = value.username;
              $mdToast.showSimple('Successfully registered in: ' + username);
              $state.go('login');
            },
            function error(er) {
              console.log(er);
              $mdToast.showSimple('Cannot register with this data');
              User.logout();
            });
        }
      };
    
    $scope.isUsernameAvailable = function (newUserName) {
      let defer = $q.defer();
      console.log(newUserName);
      User.usernameAvailable({username: newUserName},
        function s(val) {
          val.available ? defer.resolve() : defer.reject();
        }, function e() {
          defer.reject();
        });
      return defer.promise;
    }
    
    }]);
