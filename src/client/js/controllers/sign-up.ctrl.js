app.controller('SignUpCtrl', [
  '$scope', '$rootScope', '$state', 'User', '$mdToast', '$q',
  function ($scope, $rootScope, $state, User, $mdToast, $q) {
    $scope.newUser = {};
    
    $scope.submit = function () {
      let cred = {password: $scope.newUser.password};
      cred.email = $scope.newUser.email;
      cred.username = $scope.newUser.username;
      User.create(cred,
        function success(value, res) {
          let username = value.username;
          $mdToast.showSimple('Successfully registered: ' + username);
          $state.go('login');
        },
        function error(er) {
          console.log(er);
          let toast = er && er.data && er.data.error && er.data.error.details && er.data.error.details.messages
            ? messageString(er.data.error.details.messages)
            : 'Cannot register with this data';
          $mdToast.showSimple(toast);
        });
    };
    
    function messageString(messages) {
      let str = '';
      for (let msg in messages) {
        str += _.startCase(msg) + ': ' + _.join(messages[msg], ', ') + '. ';
      }
      return str;
    }
    
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
    };
    
  }]);
