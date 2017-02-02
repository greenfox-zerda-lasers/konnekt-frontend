// *****************************************************************************
// IMPORTANT! Set your server url here!
// *****************************************************************************
//
// for localhost testing
const appUrl = 'http://localhost:3000';
//
// for lasers web
// const appUrl = 'https://lasers-cornubite-konnekt.herokuapp.com';
//
// for raptors web
// const appUrl = 'https://raptor-konnekt.herokuapp.com';
//
// *****************************************************************************

var angular = require('angular');
var ngRoute = require('angular-route');

var konnektApp = angular.module('konnektApp', ['ngRoute']);
var responseFromServer;


// APP CONFIG
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
    .when('/dashboard', {
      templateUrl: 'dashboard.html',
      controller: 'dashboardController',
    })
    .otherwise({
      redirectTo: '/login',
    });
}]);


// FACTORIES
konnektApp.factory('HttpService', function ($http) {

  function login(userData) {
    return $http.post(`${appUrl}/login`, JSON.stringify(userData));
  }

  function register(userData) {
    return $http.post(`${appUrl}/register`, JSON.stringify(userData));
  }

  return {
    login: login,
    register: register,
  };
});


konnektApp.factory('UserService', function () {

  function isLoggedIn() {
    // return true/false, if user id exist
  }

  function login() {

  }

  function register() {

  }

  function getuserdata() {
    // user data (id, token, email, password,...) comes here)

  }

  return {
    isLoggedIn: isLoggedIn,
    login: login,
    register: register,
    getuserdata: getuserdata,
  };
});


// CONTROLLERS
konnektApp.controller('registrationController', ['$scope', '$http', function ($scope, $http) {

  $scope.header = 'regisztrálj.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.addNewMember = function () {

    var userData = {
      email: $scope.newUser.email,
      password: $scope.newUser.password,
      passwordConfirmation: $scope.newUser.passwordConfirmation,
    };

    $http.post(`${appUrl}/register`, JSON.stringify(userData).then(function () {
      console.log('response ok from server');
    }, function (errorResponse) {
      console.log(errorResponse);
    },
    ));
  };
}]);


konnektApp.controller('loginController', ['$scope', '$http', '$window', 'HttpService', function ($scope, $http, $window, HttpService) {

  $scope.header = 'lépj be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.loginMember = function (userData) {

    var userData = {
      email: $scope.userLogin.email,
      password: $scope.userLogin.password,
    };

    HttpService.login(userData).then(function (successResponse) {
      responseFromServer = successResponse.headers('session_token');
      console.log(`session token: ${responseFromServer}`);
      console.log(`successResponse: ${successResponse}`);
      $window.location.href = '#!/dashboard';
    }, function () {
      console.log('login ERROR! no user data!');
    });
  };
}]);


konnektApp.controller('dashboardController', ['$scope', function ($scope) {

  console.log('dashboardkontroller ok');
  $scope.header = responseFromServer;

}]);
