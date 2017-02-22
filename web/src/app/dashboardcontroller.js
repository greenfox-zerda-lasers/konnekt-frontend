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

    vm.editContact = function (contactId) {
      // let data = { user_id: UserService.getUserData().id, name: $scope.editName, description: $scope.editDescription };
      // console.log(data);
      console.log(contactId);
      $window.location.href = `#!/edit/${contactId}`;
    };

  }]);
})();
