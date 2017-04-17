angular.module('app')
  .controller('LoginCtrl', [
    '$scope', '$state', 'User', '$mdToast',
    function ($scope, $state, User, $mdToast) {
      $scope.vm = {
        formData: {},
        submit: function () {
          let cred = {password: $scope.vm.formData.password};
          if (validateEmail($scope.vm.formData.login)) {
            cred.email = $scope.vm.formData.login;
          } else {
            cred.username = $scope.vm.formData.login;
          }
          
          User.login(cred,
            function success(value, res) {
              let username = value.user.username;
              toast($mdToast, 'Successfully signed in: '+username);
            },
            function error(er) {
              $mdToast.showSimple('Invalid credentials');
            });
        }
      };
    }]);
