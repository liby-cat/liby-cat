'use strict';

app.directive("libyPageHeader", function libyPageHeader() {
  return {
    transclude: true,
    templateUrl: "../views/directives/liby-page-header.html",
    scope: {headline: "@", subhead: "@", hlEditor:"="},
    link: function link($scope, element, attrs, controller, transcludeFn) {
      $scope.editHeadline = function () {
        $scope.hlEditor.updateFn($scope.hlEditor.headline);
      }
    }
  };
});
