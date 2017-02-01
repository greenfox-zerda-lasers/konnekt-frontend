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

// user identification
konnektApp.factory('AuthService', function ($http) {
  var authService = {};

  authService.login = function (userData) {

    return $http
      .post(appUrl + '/login', JSON.stringify(userData)).then(function (successResponse) {
        console.log('headers:');
        console.log(successResponse.headers('session_token'));
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


// APP RUN
konnektApp.run(['$rootScope', '$location', 'UserService', function ($rootScope, $location, UserService) {

  $rootScope.$on('$routeChangeStart', function (event, next) {

    if (next.templateUrl === 'registration.html') {
      $location.path('/register');
    } else if (!UserService.isLoggedIn()) {
      $location.path('/login');
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

  var userData = {
    id: -1,
    token: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

// error message not work
  // var errormessage = 'Alma';

  function getUserData() {
    return userData;
  }

  function setUserData(newUserData) {
    userData = Object.assign(userData, newUserData);
    console.log('stored user data: ', userData);
  }

  function logoutUser() {
    userData = {
      id: -1,
      token: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  function isLoggedIn() {
    if (getUserData().token !== '') {
      return true;
    }
    return false;
  }

  function login() {
    let data = { email: getUserData().email, password: getUserData().password };
    HttpService.login(data)
      .then(function (successResponse) {
        if (successResponse.status === 201) {
          let newUserData = {};
          newUserData.token = successResponse.headers('session_token');
          newUserData.id = successResponse.data.user_id;
          setUserData(newUserData);
          console.log('user data after login: ', newUserData);
          $window.location.href = '#!/dashboard';
        }
      }, function (errorResponse) {
        if (errorResponse.status === 401) {

          // error msg to screen!!!
          // error message not work
          // console.log('itt kellene kiirni a hibát');
          logoutUser();
          // error message not work
          // errormessage = 'ez egy nagyon nagy hiba!';
          // console.log(errormessage);
          $window.location.href = '#!/login';
        } else {
          // error msg to screen!!!
          console.log('login ERROR! no user data from server!');
          logoutUser();
          $window.location.href = '#!/login';
        }
      });
  }

  function register() {
    let data = { email: getUserData().email, password: getUserData().password, password_confirmation: getUserData().passwordConfirmation };
    HttpService.register(data)
      .then(function (successResponse) {
        if (successResponse.status === 201) {
          console.log('success registration response:');
          console.log(successResponse);
          let newUserData = {};
          newUserData.token = successResponse.headers('session_token');
          newUserData.id = successResponse.data.user_id;
          setUserData(newUserData);
          console.log('user data login: ', newUserData);
          $window.location.href = '#!/dashboard';
        } else {
          console.log(successResponse.status);
        }
      }, function (errorResponse) {
        if (errorResponse.status === 403) {
          console.log('registration error 403:', errorResponse);
          logoutUser();
          $window.location.href = '#!/register';
        } else {
          console.log('registration ERROR! ', errorResponse);
        }
      });
  }

  return {
    // errorCondition: errorCondition,
    // error message not work
    // errormessage: errormessage,
    isLoggedIn: isLoggedIn,
    login: login,
    register: register,
    getUserData: getUserData,
    setUserData: setUserData,
  };
}]);


// CONTROLLERS
konnektApp.controller('registrationController', ['$scope', 'UserService', function ($scope, UserService) {

  $scope.header = 'regisztrálj.';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';

  $scope.addNewMember = function () {
    if ($scope.newUser.password === $scope.newUser.passwordConfirmation) {
      let newUserData = {};
      newUserData.email = $scope.newUser.email;
      newUserData.password = $scope.newUser.password;
      newUserData.passwordConfirmation = $scope.newUser.passwordConfirmation;
      UserService.setUserData(newUserData);
      UserService.register();
    } else {
      // pw confirmation error message
    }
  };
}]);

konnektApp.controller('loginController', ['$scope', 'UserService', function ($scope, UserService) {

  $scope.header = 'lépj be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';
  // console.log('ez a login controllerben van:');
  // console.log(UserService.errormessage);
  // error message not work
  // $scope.errormessage = UserService.errormessage;

  $scope.loginMember = function () {
    let newUserData = {};
    newUserData.email = $scope.userLogin.email;
    newUserData.password = $scope.userLogin.password;
    UserService.setUserData(newUserData);
    UserService.login();
  };
}]);

konnektApp.controller('dashboardController', ['$scope', '$window', 'UserService', function ($scope, $window, UserService) {

  $scope.header = UserService.getUserData().email;

}]);
