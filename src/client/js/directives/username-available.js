// based on https://codepen.io/brandonmichaelhunter/post/check-username-avaliablity-using-angularjs
app.directive('usernameAvailable', function ($q, $timeout, $http, User) {
  return {
    require: 'ngModel',
    /*
     The link function allows us to attach a DOM listener and update the DOM when needed. In this case,
     we want to update the DOM as we're typing and notify if the username is used or not.
     ctrl = ngModelController
     by setting the require: 'ngModel', this pass the ngModelController as the 4th parameter.
     */
    link: function (scope, element, attrs, ctrl) {
      /* Used to perform asynchronous validation on the username directive. */
      ctrl.$asyncValidators.usernameAvailable = function (newUserName) {
        
        if (ctrl.$isEmpty(newUserName)) {
          // consider empty model value
          return $q.when();
        }
        let defer = $q.defer();
        defer.notify('Looking up username');
        User.usernameAvailable({username: newUserName},
          function s(val) {
            val.available ? defer.resolve() : defer.reject();
          }, function e(er) {
            defer.reject();
          });
        return defer.promise;
      };
    }
  };
});
