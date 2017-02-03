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
// for api docs web
// const appUrl = 'https://konnekt-api-spec.herokuapp.com';
//
// *****************************************************************************

var angular = require('angular');
var ngRoute = require('angular-route');

var konnektApp = angular.module('konnektApp', ['ngRoute']);


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


// REGISTER LISTENER - watch for route changes, this event will fire every time the route changes
konnektApp.run(['$rootScope', '$location', 'UserService', function ($rootScope, $location, UserService) {

  $rootScope.$on('$routeChangeStart', function (event, next, prev) {

    if (next.$$route) {
      if (next.$$route.originalPath === '/register') {
      $location.path('/register');
      } else if (!UserService.isLoggedIn()) {
      $location.path('/login');
      }
    }
  });
}]);

// FACTORIES
konnektApp.factory('HttpService', ['$http', function ($http) {

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
}]);


konnektApp.factory('UserService', ['HttpService', '$window', function (HttpService, $window) {

  var getuserdata = {
    id: -1,
    token: '',
    email: '',
    password: '',
  };

  function isLoggedIn() {
    if (getuserdata.token !== '') {
      return true;
    }
    return false;
  }

  function login() {
    let userData = { email: getuserdata.email, password: getuserdata.password };
    HttpService.login(userData)
      .then(function (successResponse) {
        if (successResponse.status === 201) {
          console.log('*** success login response ***');
          console.log(successResponse);
          getuserdata.token = successResponse.headers('session_token');
          getuserdata.id = successResponse.data.user_id;
          console.log('*** local user data ***');
          console.log(getuserdata);
          $window.location.href = '#!/dashboard';
        }
      }, function (successResponse) {
        if (successResponse.status === 401) {
          console.log('login error 401:');
          console.log(successResponse.errormessage);
          getuserdata.id = -1;
          getuserdata.email = '';
          getuserdata.password = '';
          getuserdata.token = '';
          $window.location.href = '#!/login';
        } else {
          console.log('login ERROR! no user data!');
        }
      });
  }

  function register() {
    console.log('getuserdata: ', getuserdata);
    let userData = { email: getuserdata.email, password: getuserdata.password, password_confirmation: getuserdata.passwordConfirmation };
    HttpService.register(userData)
      .then(function (successResponse) {
        if (successResponse.status === 201) {
          console.log('success registration response:');
          console.log(successResponse);
          getuserdata.token = successResponse.headers('session_token');
          getuserdata.id = successResponse.data.user_id;
          console.log('user data:');
          console.log(getuserdata);
          $window.location.href = '#!/dashboard';
        } else {
          console.log(successResponse.status);
        }
      }, function (errorResponse) {
        if (successResponse.status === 403) {
          console.log('registration error 403:', errorResponse);
          getuserdata.id = -1;
          getuserdata.email = '';
          getuserdata.password = '';
          getuserdata.token = '';
          $window.location.href = '#!/register';
        } else {
          console.log('registration ERROR! ', errorResponse);
        }
      });
  }

  return {
    isLoggedIn: isLoggedIn,
    login: login,
    register: register,
    getuserdata: getuserdata,
  };
}]);


//CONTROLLERS
konnektApp.controller('registrationController', ['$scope', '$http', function ($scope, $http) {

  $scope.header = 'regisztrálj.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.addNewMember = function () {

    UserService.getuserdata.email = $scope.newUser.email;
    if($scope.newUser.password === $scope.newUser.passwordConfirmation){
      UserService.getuserdata.password = $scope.newUser.password;
      UserService.getuserdata.passwordConfirmation = $scope.newUser.passwordConfirmation;
      UserService.register();
    } else {
      // pw confirmation error message
    };
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
}]);


konnektApp.controller('dashboardController', ['$scope', '$window', 'UserService', function ($scope, $window, UserService) {

  $scope.header = UserService.getuserdata.email;
}]);
