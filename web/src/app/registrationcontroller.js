'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('registrationController', ['$scope', 'UserService', function ($scope, UserService) {

    $scope.header = 'regisztrálj.';
    $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
    $scope.button = 'mehet';

    $scope.addNewMember = function () {
      if ($scope.newUser.password === $scope.newUser.passwordConfirmation) {
        let newUserData = {};
        newUserData.email = $scope.newUser.email;
        newUserData.password = $scope.newUser.password;
        newUserData.passwordConfirmation = $scope.newUser.passwordConfirmation;
        UserService.setUserData(newUserData);
        UserService.register();
      } else {
        userData.errormessage = "Kérlek add meg a regisztrációs adataidat!";

      }
    };
  }]);
})();
