'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('editController', ['$scope', 'UserService', 'ContactDataHandling', '$window', '$routeParams', function ($scope, UserService, ContactDataHandling, $window, $routeParams) {

    $scope.header = 'kontakt szerk';
    $scope.welcome = 'Változtass az ismerőseiden!';
    $scope.button = 'mehet';
    var id = $routeParams.id;
    var contactObjectEdit;

    ContactDataHandling.setContactData(UserService.getUserData().session_token).then(function () {

      var contactObject = ContactDataHandling.getContactData();

      for (let i = 0; i < contactObject.length; i++) {
        if (contactObject[i].id === parseInt(id, 10)) {
          contactObjectEdit = contactObject[i];
        }
      }
      $scope.editName = contactObjectEdit.name;
      $scope.editDescription = contactObjectEdit.description;
    });

    $scope.editContact = function () {
      const data = {
        user_id: UserService.getUserData().id,
        name: $scope.editName,
        description: $scope.editDescription,
      };
      ContactDataHandling.editContactData(id, UserService.getUserData().session_token, data);
    };

    $scope.closeWindow = function () {
      $window.location.href = '#!/dashboard';
    };
  }]);
})();
