'use strict';
function validateEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function toast($mdToast, text) {
  $mdToast.show(
    $mdToast.simple()
      .textContent(text)
      .position('top right')
      .hideDelay(3000)
  );
}
