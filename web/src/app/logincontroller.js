'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('loginController', ['$scope', 'UserService', function ($scope, UserService) {

    $scope.header = 'lépj be';
    $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
    $scope.button = 'mehet';
    $scope.errormessage = UserService.getUserData().errormessage;

    $scope.loginMember = function () {
      const newUserData = {};
      newUserData.email = $scope.userLogin.email;
      newUserData.password = $scope.userLogin.password;
      UserService.setUserData(newUserData);
      UserService.login()
      .then(function () {
        $scope.errormessage = UserService.getUserData().errormessage;
      });
    };

    if (UserService.getUserLocalStorage()) {
      console.log('automatic log on');
      UserService.login();
    }
  }]);
})();
