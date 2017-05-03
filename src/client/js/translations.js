app.config(['$translateProvider',
  function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      files: [{
        prefix: '../res/i18n/locale-',
        suffix: '.json'
      }]
    });
    $translateProvider.preferredLanguage('bn');
  }]);
