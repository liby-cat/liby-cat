app.controller('CatalogListCtrl', [
  '$scope', '$state', '$stateParams',
  'User', 'CatalogSvc',
  function ($scope, $state, $stateParams,
            User, CatalogSvc) {
    CatalogSvc.getReadable($scope, 'readableCatalogs');
  }
]);
