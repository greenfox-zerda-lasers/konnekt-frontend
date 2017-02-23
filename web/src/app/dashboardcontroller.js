'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('dashboardController', ['UserService', 'ContactDataHandling', '$window', 'HttpService', function (UserService, ContactDataHandling, $window, HttpService) {

    let vm = this;
    vm.newContact = 'új kontakt';
    vm.logoutUser = 'kilépés';

    vm.logoutMember = function () {
      UserService.logoutUser();
      $window.location.href = '#!/login';
    };

    // if user reload browser, refresh contats data from browser's local storage;
    if (typeof UserService.getUserData().id === 'undefined') {
      if (UserService.getUserLocalStorage()) {
        let sessionToken = UserService.getUserData().session_token;
        ContactDataHandling.setContactData(sessionToken)
        .then(function () {
          vm.allContacts = ContactDataHandling.getContactData();
        });
      } else {
        UserService.logoutUser();
      }
    }

    vm.loggedInUserId = UserService.getUserData().id;
    vm.allContacts = ContactDataHandling.getContactData();

    // delete contacts
    vm.deleteContact = function (contactId) {
      console.log('deleted contact id: ', contactId);
      let sessionToken = UserService.getUserData().session_token;
      HttpService
        .deleteContact(sessionToken, contactId)
        .then(function () {
          ContactDataHandling.setContactData(sessionToken)
          .then(function () {
            vm.allContacts = ContactDataHandling.getContactData();
            $window.location.href = '#!/dashboard';
          });
        })

    };
  }]);
})();
