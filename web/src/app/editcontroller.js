'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

  konnektApp.controller('editController', ['$scope', 'UserService', function ($scope, UserService) {

    $scope.header = 'kontakt szerk';
    $scope.welcome = 'Változtass az ismerőseiden!';
    $scope.button = 'mehet';
    $scope.editName = 'Béla';
    $scope.editDescription = 'rövid leírás: (pl. "Béla orvosit  végzett, most a NASAnál takarító")';

    $scope.editContact = function () {
      console.log($scope.editName);
      console.log($scope.editDescription);
    };
  }]);
})();
