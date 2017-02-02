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
konnektApp.factory('HttpService', ['$http', function ($http) {

  function login(userData) {
    console.log(userData);
    return $http.post(`${appUrl}/login`, JSON.stringify(userData));
  }

  function register(userData) {
    return $http.post(`${appUrl}/register`, JSON.stringify(userData));
  }

  return {
    login: login,
    register: register,
  };
}]);


konnektApp.factory('UserService', ['HttpService', '$window', function (HttpService, $window) {

  var getuserdata = {
    id: -1,
    token: '',
    email: '',
    password: '',
  };

  function isLoggedIn() {
    if (this.getuserdata.token !== '') {
      return true;
    }
    return false;
  }

  function login() {
    console.log(getuserdata);
    let userData = { email: getuserdata.email, password: getuserdata.password };
    HttpService.login(userData)
      .then(function (successResponse) {
        console.log('itt a magic');
        console.log(successResponse.headers('session_token'));
        getuserdata.token = successResponse.headers('session_token');
        console.log(getuserdata.token);
        console.log(`session token: ${getuserdata.token}`);
        console.log(`successResponse: ${successResponse}`);
        if (isLoggedIn) {
           $window.location.href = '#!/dashboard';
        } else {
          loginController.showErrorMessage('Invalid username/password');
          $window.location.href = '#!/login';
        }
      }, function () {
        console.log('login ERROR! no user data!');
      });
   // getuserdata.email
  }

  function register() {
    console.log('getuserdata: ', getuserdata);
    let userData = { email: getuserdata.email, password: getuserdata.password, password_confirmation: getuserdata.passwordConfirmation };
    HttpService.register(userData)
      .then(function (successResponse) {
        console.log('registration data sent');
        console.log('reponse header: ', successResponse.headers('session_token'));
        getuserdata.token = successResponse.headers('session_token');
        console.log('getuserdata.token: ',getuserdata.token);
        console.log(`session token: ${getuserdata.token}`);
        console.log(`successResponse: ${successResponse}`);
        console.log('getuserdata: ', getuserdata);
        if (isLoggedIn) {
           $window.location.href = '#!/dashboard';
        } else {
          registrationController.showErrorMessage('registration error');
          $window.location.href = '#!/register';
        }
      }, function () {
        console.log('registration ERROR!');
      });

  }

  return {
    isLoggedIn: isLoggedIn,
    login: login,
    register: register,
    getuserdata: getuserdata,
  };
}]);


// CONTROLLERS
konnektApp.controller('registrationController', ['$scope', 'UserService', function ($scope, UserService) {

  $scope.header = 'regisztrálj.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.addNewMember = function () {
    UserService.getuserdata.email = $scope.newUser.email;
    UserService.getuserdata.password = $scope.newUser.password;
    UserService.getuserdata.passwordConfirmation = $scope.newUser.passwordConfirmation;
    UserService.register();
  };

  $scope.showErrorMessage = function (errormessage) {
     $scope.errormessage = errormessage;
   //   ng-show = true ??
  };

  }]);


konnektApp.controller('loginController', ['$scope', 'UserService', function ($scope, UserService) {

  $scope.header = 'lépj be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.loginMember = function () {
    UserService.getuserdata.email = $scope.userLogin.email;
    UserService.getuserdata.password = $scope.userLogin.password;
    UserService.login();
  };

  $scope.showErrorMessage = function (errormessage) {
    $scope.errormessage = errormessage;
   //   ng-show = true ??
  };
}]);


konnektApp.controller('dashboardController', ['$scope', 'UserService', function ($scope, UserService) {

  console.log('dashboardkontroller ok');
  $scope.header = UserService.getuserdata.email;

}]);
