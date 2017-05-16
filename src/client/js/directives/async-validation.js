app.directive('asyncValidation', function ($q) {
  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      asyncValidator: '&',
      asyncKeyFn: '&'
    },
    link: function (scope, element, attrs, ctrl) {
      let cache = {};
      
      ctrl.$asyncValidators.asyncValidation = function (val) {
        if (ctrl.$isEmpty(val) || !attrs.asyncValidator) {
          return $q.when();
        }
        let defer = $q.defer();
        console.log(cache);
        defer.notify('Looking up');
        let key = scope.asyncKeyFn ? scope.asyncKeyFn({val:val}) : val;
        if (cache.hasOwnProperty(key)) {
          cache[key] ? defer.resolve() : defer.reject();
        } else {
          scope.asyncValidator({val:val}).then(
            function success(ignore) {
              cache[key] = true;
              defer.resolve();
            }, function error(ignore) {
              cache[key] = false;
              defer.reject();
            }
          );
        }
        return defer.promise;
      };
    }
  };
});
