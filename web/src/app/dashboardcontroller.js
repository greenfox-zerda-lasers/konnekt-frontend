'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('dashboardController', ['UserService', 'ContactDataHandling', '$window', function (UserService, ContactDataHandling, $window) {

    let vm = this;
    vm.newContact = 'új kontakt';
    vm.logoutUser = 'kilépés';

    vm.logoutMember = function () {
      UserService.logoutUser();
      $window.location.href = '#!/login';
    };

    // if user reload browser, needs update data from browser's local storage (inspirated by Tibi);
    if (typeof UserService.getUserData().id === 'undefined') {
      if (UserService.getUserLocalStorage()) {
        ContactDataHandling.setContactData();
      } else {
        UserService.logoutUser();
      }
    }

    vm.loggedInUserId = UserService.getUserData().id;
    vm.allContacts = ContactDataHandling.getContactData();
    console.log(ContactDataHandling.getContactData());

    vm.editContact = function (contactId) {
      $window.location.href = `#!/edit/${contactId}`;
    };

    vm.openContact = function () {
      $window.location.href = '#!/create';
    };

  }]);
})();
