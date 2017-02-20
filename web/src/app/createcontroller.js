'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('createController', ['$scope', '$window', 'UserService', function ($scope, $window, UserService) {

    $scope.create_header = 'új kontakt';
    $scope.create_welcome = 'Adj hozzá egy hasznos ismerőst!';
    $scope.button = 'mehet';

    var contactData = {
      user_id: UserService.userData.user_id,
      name: '',
      description: ''
    };

    function saveContact(newContactData) {
      contactData = Object.assign(contactData, newContactData);
      console.log('saved contact data: ', contactData);
    };

    $scope.createContact = function () {
      let newContactData = {};
      newContactData.name = $scope.createName;
      newContactData.description = $scope.createDescription;
      saveContact(newContactData);
    };

    console.log(contactData);

  }]);
})();
