'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('createController', ['$scope', '$window', 'UserService', 'HttpService', function ($scope, $window, UserService, HttpService) {

    $scope.create_header = 'új kontakt';
    $scope.create_welcome = 'Adj hozzá egy hasznos ismerőst!';
    $scope.button = 'mehet';

    var contactData = {
      user_id: UserService.getUserData().id,
      name: '',
      description: ''
    };

    function saveContact(newContactData) {
      contactData = Object.assign(contactData, newContactData);
      console.log('saved contact data: ', contactData);
      HttpService.create(sessionToken, contactData);
    };

    $scope.createContact = function () {
      let newContactData = {};
      newContactData.name = $scope.createName;
      newContactData.description = $scope.createDescription;
      saveContact(newContactData);
    };

    console.log(contactData);

    $scope.closeWindow = function () {
      $window.location.href = '#!/dashboard';
    };

    // $scope.openContact = function () {
    //   $window.location.href = '#!/create';
    // };

  }]);
})();
