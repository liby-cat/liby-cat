app.directive('isAvailable', function ($q) {
  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      isAvailableFn: '&'
    },
    link: function (scope, element, attrs, ctrl) {
      let cache = {};
      
      ctrl.$asyncValidators.isAvailable = function (val) {
        if (ctrl.$isEmpty(val) || !attrs.isAvailableFn) {
          return $q.when();
        }
        let defer = $q.defer();
        console.log(cache);
        defer.notify('Looking up');
        if (cache.hasOwnProperty(val)) {
          cache[val] ? defer.resolve() : defer.reject();
        } else {
          scope.isAvailableFn({val:val}).then(
            function success(ignore) {
              cache[val] = true;
              defer.resolve();
            }, function error(ignore) {
              cache[val] = false;
              defer.reject();
            }
          );
        }
        return defer.promise;
      };
    }
  };
});
