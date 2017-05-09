// based on https://codepen.io/brandonmichaelhunter/post/check-username-avaliablity-using-angularjs
// and http://www.angularjs4u.com/directives/angularjs-username-directive/
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
      let userNameCache = {};
      
      ctrl.$asyncValidators.usernameAvailable = function (newUserName) {
        if (ctrl.$isEmpty(newUserName)) {
          return $q.when();
        }
        let defer = $q.defer();
        console.log(userNameCache);
        defer.notify('Looking up username');
        if (userNameCache.hasOwnProperty(newUserName)) {
          userNameCache[newUserName] ? defer.resolve() : defer.reject();
        } else {
          User.usernameAvailable({username: newUserName},
            function s(val) {
              userNameCache[newUserName] = val.available;
              val.available ? defer.resolve() : defer.reject();
            }, function e(er) {
              defer.reject();
            });
        }
        return defer.promise;
      };
    }
  };
});
