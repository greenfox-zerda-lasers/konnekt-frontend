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

  function getAllContacts(userToken) {
    return $http.get(`${appUrl}/contacts`, JSON.stringify(userToken));
  }

  return {
    login: login,
    register: register,
    getAllContacts: getAllContacts,
  };
}]);


konnektApp.factory('UserService', ['HttpService', '$window', 'DataHandling', function (HttpService, $window, DataHandling) {

  var userData = {
    id: -1,
    token: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

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
          // check if successResponse.status === 201 but NOT token arrive!
          let newUserData = {};
          newUserData.token = successResponse.headers('session_token');
          if (newUserData.token === '') {
            console.log('success response, but no token from server');
            logoutUser();
            $window.location.href = '#!/login';
          } else {
            console.log(`session token: ${successResponse.headers('session_token')}`);
            newUserData.id = successResponse.data.user_id;
            setUserData(newUserData);
            DataHandling.setContactData();
            $window.location.href = '#!/dashboard';
          }
        }
      }, function (errorResponse) {
        if (errorResponse.status === 401) {
          console.log('ERROR: 401 status from server');
          logoutUser();
          $window.location.href = '#!/login';
        } else {
          console.log('ERROR: no data from server');
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
          console.log('response header:');
          console.log(successResponse.headers);

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
    isLoggedIn: isLoggedIn,
    login: login,
    register: register,
    getUserData: getUserData,
    setUserData: setUserData,
  };
}]);


konnektApp.factory('DataHandling', ['HttpService', function (HttpService) {

  var contactData = {};

  function getContactData() {
    return contactData;
  }

  function setContactData() {
    // token needs here!
    HttpService.getAllContacts()
    .then(function (successResponse) {
      // token error handling needs here!
      if (successResponse.status === 200) {
        contactData = Object.assign(contactData, successResponse.data.contacts);
        console.log('stored contact data:');
        console.log(contactData);
      } else {
        console.log('contact data loading error');
      }
    });
  }

  return {
    getContactData: getContactData,
    setContactData: setContactData,
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

  $scope.loginMember = function () {
    let newUserData = {};
    newUserData.email = $scope.userLogin.email;
    newUserData.password = $scope.userLogin.password;
    UserService.setUserData(newUserData);
    UserService.login();
  };
}]);

konnektApp.controller('dashboardController', ['$scope', 'UserService', 'DataHandling', function ($scope, UserService, DataHandling) {

  $scope.allContacts = DataHandling.getContactData();
}]);
