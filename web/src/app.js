var konnektApp = angular.module('konnektApp', ['ngRoute']);

konnektApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'loginController',
    })
    .when('/registration', {
      templateUrl: 'registration.html',
      controller: 'registrationController',
    })
    .otherwise({
      redirectTo: '/login',
    });
}]);

konnektApp.controller('registrationController', ['$scope', function ($scope) {

  $scope.header = 'REGISZTRÁLJ.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'MEHET';

  $scope.addNewMember = function () {
    console.log($scope.email, $scope.pass1, $scope.pass2);
  };

}]);

konnektApp.controller('loginController', ['$scope', function ($scope) {

  $scope.header = 'Jelentkezz be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'MEHET';

  $scope.addNewMember = function () {
    console.log($scope.email, $scope.pass1, $scope.pass2);
  };

}]);
