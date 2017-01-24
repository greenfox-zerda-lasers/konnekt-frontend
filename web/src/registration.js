var registrationApp = angular.module('registrationApp', []);

registrationApp.controller('registrationController', ['$scope', function ($scope) {

  $scope.header = 'REGISZTRÁLJ.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'MEHET';


  $scope.addNewMember = function () {
    console.log($scope.email, $scope.pass1, $scope.pass2);
  };

}]);
