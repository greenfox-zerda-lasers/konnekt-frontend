'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('createController', ['$scope', '$window', 'UserService', 'HttpService', 'ContactDataHandling', function ($scope, $window, UserService, HttpService, ContactDataHandling) {

    $scope.create_header = 'új kontakt';
    $scope.create_welcome = 'Adj hozzá egy hasznos ismerőst!';
    $scope.button = 'mehet';

    var contactData = {
      user_id: UserService.getUserData().id,
      name: '',
      description: ''
    };

    function saveContact(sessionToken, newContactData) {
      contactData = Object.assign(contactData, newContactData);
      console.log('saved contact data: ', contactData);
      HttpService.createContact(sessionToken, contactData);
    };

    $scope.createContact = function () {
      let newContactData = {};
      newContactData.name = $scope.createName;
      newContactData.description = $scope.createDescription;
      saveContact(UserService.getUserData().session_token, newContactData);
      ContactDataHandling.createContactData(UserService.getUserData().session_token, contactData);
    };

    console.log(contactData);

    $scope.closeWindow = function () {
      $window.location.href = '#!/dashboard';
    };

  }]);
})();
