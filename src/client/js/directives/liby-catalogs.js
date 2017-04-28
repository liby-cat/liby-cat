'use strict';

app.directive('libyCatalogs', function libyCatalogs() {
  return {
    templateUrl: '../views/directives/liby-catalogs.html',
    scope: {cats: '='},
    link: function link($scope, element, attrs, controller, transcludeFn) {
      $scope.id = attrs.id = attrs.id ? attrs.id : 'libyCatalogs_' + Date.now();
    }
  };
});
