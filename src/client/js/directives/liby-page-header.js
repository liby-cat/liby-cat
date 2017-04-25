'use strict';

app.directive("libyPageHeader", function libyPageHeader() {
  return {
    transclude: true,
    templateUrl: "../views/directives/liby-page-header.html",
    scope: {headline: "@", subhead: "@"},
    link: function link($scope, element, attrs, controller, transcludeFn) {
    }
  };
});
