// IMPORTANT! Set your url here!

// for localhost testing
// const appUrl = 'http://localhost:3000';

// for lasers web
// const appUrl = 'https://lasers-cornubite-konnekt.herokuapp.com';

// for raptors web
const appUrl = 'https://raptor-konnekt.herokuapp.com';


var angular = require('angular');
var ngRoute = require('angular-route');

var konnektApp = angular.module('konnektApp', ['ngRoute']);

konnektApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'loginController',
    })
    .when('/register', {
      templateUrl: 'registration.html',
      controller: 'registrationController',
    })
    .otherwise({
      redirectTo: '/login',
    });
}]);


konnektApp.controller('registrationController', ['$scope', '$http', function ($scope, $http) {

  $scope.header = 'REGISZTRÁLJ.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'MEHET';

  $scope.addNewMember = function () {


    var data = {
      email: $scope.newUser.email,
      password: $scope.newUser.password,
      passwordConfirmation: $scope.newUser.passwordConfirmation,
    };

    console.log(JSON.stringify(data));

    $http.post(appUrl + '/register', JSON.stringify(data)).then(function (successResponse) {
      console.log(successResponse);
    }, function (errorResponse) {
      console.log(errorResponse);
    });
  };
}]);

konnektApp.controller('loginController', ['$scope', '$http', function ($scope, $http) {

  $scope.header = 'Jelentkezz be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'MEHET';

  $scope.loginMember = function () {

    var data = {
      email: $scope.userLogin.email,
      password: $scope.userLogin.password,
    };

    console.log(JSON.stringify(data));

    $http.post(appUrl + '/login', JSON.stringify(data)).then(function (successResponse) {
      console.log(successResponse);
    }, function (errorResponse) {
      console.log(errorResponse);
    });
  };
}]);
