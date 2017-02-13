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
      controller: 'dashboardController as dashboard',
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

  function getAllContacts(sessionToken) {
    return $http.get(`${appUrl}/contacts`, { headers: { 'session_token': sessionToken } });
  }

  return {
    login: login,
    register: register,
    getAllContacts: getAllContacts,
  };
}]);


konnektApp.factory('UserService', ['HttpService', '$window', 'DataHandling', function (HttpService, $window, DataHandling) {

  var userData = {};

  // return with logged in user data;
  function getUserData() {
    return userData;
  }

  // set & update logged user data
  function setUserData(newUserData) {
    userData = Object.assign(userData, newUserData);
  }

  // logout user, reset stored user data;
  function logoutUser() {
    userData = {};
    window.localStorage.removeItem('session_token');
    window.localStorage.removeItem('user_id');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
  }

  // check if user logged in or not
  function isLoggedIn() {
    if (getUserData().session_token !== '') {
      return true;
    }
    return false;
  }

  // store user data in browser local storage
  function setUserLocalStorage() {
    // Check browser support
    if (typeof (Storage) !== 'undefined') {
      window.localStorage.setItem('session_token', getUserData().session_token);
      window.localStorage.setItem('user_id', getUserData().id);
      window.localStorage.setItem('username', getUserData().email);
      window.localStorage.setItem('password', getUserData().password);
    }
  }

  // read user data in browser local storage; return True is it is exist and
  // set it to logged in user; return false if no stored user data
  function getUserLocalStorage() {
    // Check browser support
    if (window.localStorage.getItem('session_token')) {
      if ((window.localStorage.getItem('session_token')) !== 'undefined') {
        let newUserData = {};
        newUserData.session_token = $window.localStorage.getItem('session_token');
        newUserData.id = $window.localStorage.getItem('user_id');
        newUserData.email = $window.localStorage.getItem('username');
        newUserData.password = $window.localStorage.getItem('password');
        setUserData(newUserData);
        return true;
      }
      // session_token exist, but no value;
      return false;
    }
    // session_token not defined;
    return false;
  }

  // login user
  function login() {
    let data = { email: getUserData().email, password: getUserData().password };
    HttpService.login(data)
      .then(function (successResponse) {
        if (successResponse.status === 201) {
          let newUserData = {};
          newUserData.session_token = successResponse.headers().session_token;
          if (newUserData.session_token !== '') {
            newUserData.id = successResponse.data.user_id;
            setUserData(newUserData);
            setUserLocalStorage();
            DataHandling.setContactData(newUserData.session_token).then(function () {
              $window.location.href = '#!/dashboard';
            })
          } else {
            console.log('ERROR: success response, but no session_token from server');
            logoutUser();
            $window.location.href = '#!/login';
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

  // user registration
  function register() {
    let data = { email: getUserData().email, password: getUserData().password, password_confirmation: getUserData().passwordConfirmation };
    console.log('register data sent:');
    console.log(data);
    HttpService.register(data)
      .then(function (successResponse) {
        if (successResponse.status === 201) {
          let newUserData = {};
          newUserData.session_token = successResponse.headers().session_token;
          if (newUserData.session_token !== '') {
            console.log('success registration response:');
            console.log(successResponse);

            newUserData.id = successResponse.data.user_id;
            setUserData(newUserData);
            setUserLocalStorage();
            console.log('user data login:');
            console.log(newUserData);
            $window.location.href = '#!/dashboard';
          } else {
            console.log('ERROR: success response, but no session_token from server');
            logoutUser();
            $window.location.href = '#!/login';
          }
        } else {
          console.log(successResponse.status);
        }
      }, function (errorResponse) {
        if (errorResponse.status === 403) {
          console.log('ERROR: registration error 403: ', errorResponse);
          logoutUser();
          $window.location.href = '#!/register';
        } else {
          console.log('ERROR: registration error! ', errorResponse);
        }
      });
  }

  return {
    isLoggedIn: isLoggedIn,
    login: login,
    logoutUser: logoutUser,
    register: register,
    getUserData: getUserData,
    setUserData: setUserData,
    getUserLocalStorage: getUserLocalStorage,
    setUserLocalStorage: setUserLocalStorage,
  };
}]);


konnektApp.factory('DataHandling', ['HttpService', function (HttpService) {

  var contactData = {};

  // returns stored contact info
  function getContactData() {
    return contactData;
  }

  // read contact info from server
  function setContactData(sessionToken) {
    return HttpService.getAllContacts(sessionToken)
    .then(function (successResponse) {
      if (successResponse.status === 200) {
        contactData = Object.assign(contactData, successResponse.data.contacts);
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

  if (UserService.getUserLocalStorage()) {
    console.log('automatic log on');
    UserService.login();
  }

}]);

konnektApp.controller('dashboardController', ['UserService', 'DataHandling', '$window', function (UserService, DataHandling, $window) {

  let vm = this;
  vm.newContact = 'új kontakt';
  vm.logoutUser = 'kilépés';

  vm.logoutMember = function () {
    UserService.logoutUser();
    $window.location.href = '#!/login';
  };

  // if user reload browser, needs update data from browser's local storage (inspirated by Tibi);
  if (typeof UserService.getUserData().id === 'undefined') {
    if (UserService.getUserLocalStorage()) {
      DataHandling.setContactData();
    } else {
      UserService.logoutUser();
    }
  }

  vm.loggedInUserId = UserService.getUserData().id;
  vm.allContacts = DataHandling.getContactData();

}]);
