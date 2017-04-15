angular.module('app')
  .controller('LoginCtrl', [
    '$scope', '$state', 'User',
    function ($scope, $state, User) {
    $scope.vm = {
      formData: {
        email: 'hello@patternry.com',
        password: 'foobar'
      },
      submit: function () {
        console.log('sds');
        User.login({
          email: $scope.vm.formData.email,
          password: $scope.vm.formData.password
        });
      }
    };
    }]);
