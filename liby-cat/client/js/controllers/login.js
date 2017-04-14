angular.module('app')
  .controller('LoginCtrl', function($scope){
    $scope.vm = {
      formData: {
        email: 'hello@patternry.com',
        password: 'foobar'
      }
    };
  });
