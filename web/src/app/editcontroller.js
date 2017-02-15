'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('editController', ['$scope', 'UserService', 'ContactDataHandling', '$window', function ($scope, UserService, ContactDataHandling, $window) {

    $scope.header = 'kontakt szerk';
    $scope.welcome = 'Változtass az ismerőseiden!';
    $scope.button = 'mehet';

    console.log(UserService.getUserData().session_token);

    ContactDataHandling.setContactData(UserService.getUserData().session_token).then(function () {
      $scope.editName = ContactDataHandling.getContactData()[0].name;
      $scope.editDescription = ContactDataHandling.getContactData()[0].description;
    });

    $scope.editContact = function () {
      let data = { user_id: UserService.getUserData().id, name: $scope.editName, description: $scope.editDescription };
      console.log(data);
      ContactDataHandling.editContactData(UserService.getUserData().session_token, data);
    };

    $scope.closeWindow = function () {
      $window.location.href = '#!/dashboard';
    };
  }]);
})();
