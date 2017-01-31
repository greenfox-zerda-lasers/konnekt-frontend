// IMPORTANT! Set your url here!

// for localhost testing
const appUrl = 'http://localhost:3000';

// for lasers web
// const appUrl = 'https://lasers-cornubite-konnekt.herokuapp.com';

// for raptors web
// const appUrl = 'https://raptor-konnekt.herokuapp.com';


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

// user identification
konnektApp.factory('AuthService', function ($http) {
  var authService = {};

  authService.login = function (userData) {
    console.log(authService);

    return $http
      .post(appUrl + '/login', JSON.stringify(userData)).then(function (successResponse) {
        console.log(successResponse);
      }, function (errorResponse) {
        console.log(errorResponse);
      });
      // .post('/login', userData)
      // .then(function (res) {
      //   Session.create(res.data.id, res.data.user.id,
      //                  res.data.user.role);
      //   return res.data.user;
      // });
  };

  // authService.isAuthenticated = function () {
  //   return !!Session.userId;
  // };
  //
  // authService.isAuthorized = function (authorizedRoles) {
  //   if (!angular.isArray(authorizedRoles)) {
  //     authorizedRoles = [authorizedRoles];
  //   }
  //   return (authService.isAuthenticated() &&
  //     authorizedRoles.indexOf(Session.userRole) !== -1);
  // };

  return authService;
});

// registration controller
konnektApp.controller('registrationController', ['$scope', '$http', function ($scope, $http) {

  $scope.header = 'regisztrálj.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.addNewMember = function () {

    var userData = {
      username: $scope.newUser.username,
      password: $scope.newUser.password,
      passwordConfirmation: $scope.newUser.passwordConfirmation,
    };

    console.log(JSON.stringify(userData));

    $http.post(appUrl + '/register', JSON.stringify(userData).then(function (successResponse) {
      console.log(successResponse);
    }, function (errorResponse) {
      console.log(errorResponse);
    },
    ));
  };
}]);

// login controller
konnektApp.controller('loginController', ['$scope', '$http', 'AuthService', function ($scope, $http, AuthService) {

  $scope.header = 'lépj be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.loginMember = function (userData) {

    var userData = {
      username: $scope.userLogin.username,
      password: $scope.userLogin.password,
    };

    AuthService.login(userData).then(function (user) {
      console.log('user data:');
      console.log(userData);
      console.log('user:');
      console.log(user);
    }, function () {
      console.log('login ERROR! no user data!');

    });
  };
}]);
