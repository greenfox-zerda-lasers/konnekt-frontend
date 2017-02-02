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

   var getuserdata = {
      id: -1,
      token: '',
      email: '',
      password: ''
   }

  function isLoggedIn() {
    if (this.getuserdata.token !== '') {
      return true;
   } else {
      return false;
   };
};

  function login() {
   // getuserdata.email
  }

  function register() {

  }

  return {
    isLoggedIn: isLoggedIn,
    login: login,
    register: register,
    getuserdata: getuserdata
  };
});


// CONTROLLERS
konnektApp.controller('registrationController', ['$scope', '$http', function ($scope, $http) {

  $scope.header = 'regisztrálj.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.addNewMember = function () {

    var userData = {
      email = $scope.newUser.email,
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


konnektApp.controller('loginController', ['$scope', '$window', 'UserService', function ($scope, $window, UserService) {

  $scope.header = 'lépj be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.loginMember = function (userData) {

  UserService.getuserdata.email = $scope.userLogin.email;
  UserService.getuserdata.password = $scope.userLogin.password;


  UserService.login()

    HttpService.login(userData).then(function (successResponse) {
      responseFromServer = successResponse.headers('session_token');
      console.log(`session token: ${responseFromServer}`);
      console.log(`successResponse: ${successResponse}`);
      if (UserService.isLoggedIn) {
         $window.location.href = '#!/dashboard';
      } else {
         megy vissza a login oldalra hibaüzenettel
      }
    }, function () {
      console.log('login ERROR! no user data!');

    });
  };
}]);


konnektApp.controller('dashboardController', ['$scope', function ($scope) {

  console.log('dashboardkontroller ok');
  $scope.header = responseFromServer;

}]);
