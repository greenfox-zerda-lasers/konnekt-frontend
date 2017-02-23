'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('dashboardController', ['UserService', 'ContactDataHandling', '$window', 'HttpService', function (UserService, ContactDataHandling, $window, HttpService) {

    const vm = this;
    vm.newContact = 'új kontakt';
    vm.logoutUser = 'kilépés';

    vm.logoutMember = function () {
      UserService.logoutUser();
      $window.location.href = '#!/login';
    };

    // if user reload browser, refresh contats data from browser's local storage;
    if (typeof UserService.getUserData().id === 'undefined') {
      if (UserService.getUserLocalStorage()) {
        const sessionToken = UserService.getUserData().session_token;
        ContactDataHandling.setContactData(sessionToken)
        .then(function () {
          vm.allContacts = ContactDataHandling.getContactData();
        });
      } else {
        UserService.logoutUser();
      }
    }

    vm.loggedInUser = UserService.getUserData();
    vm.allContacts = ContactDataHandling.getContactData();

    // edit contact data
    vm.editContact = function (contactId) {
      $window.location.href = `#!/edit/${contactId}`;
    };

    vm.openContact = function () {
      $window.location.href = '#!/create';
    };

    // delete contacts
    vm.deleteContact = function (contactId) {
      const sessionToken = UserService.getUserData().session_token;
      HttpService
        .deleteContact(sessionToken, contactId)
        .then(function () {
          ContactDataHandling.setContactData(sessionToken)
          .then(function () {
            vm.allContacts = ContactDataHandling.getContactData();
            $window.location.href = '#!/dashboard';
          });
        });
    };
  }]);
})();
