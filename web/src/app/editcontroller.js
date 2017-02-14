'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('editController', ['$scope', 'UserService', 'ContactDataHandling', function ($scope, UserService, ContactDataHandling) {

    $scope.header = 'kontakt szerk';
    $scope.welcome = 'Változtass az ismerőseiden!';
    $scope.button = 'mehet';

    ContactDataHandling.setContactData(UserService.getUserData.session_token).then(function () {
      $scope.editName = ContactDataHandling.getContactData()[0].name;
      $scope.editDescription = ContactDataHandling.getContactData()[0].description;
    });

    $scope.editContact = function () {
      console.log($scope.editName);
      console.log($scope.editDescription);
      console.log(ContactDataHandling.getContactData()[0].name);
    };
  }]);
})();
