app.controller('DashboardCtrl', [
    '$scope', '$rootScope', '$state',
    'User', 'CatalogSvc',
    '$mdToast',
    function ($scope, $rootScope, $state,
              User, CatalogSvc) {
      CatalogSvc.getReadable($scope, 'readableCatalogs');
    }
  ]);
