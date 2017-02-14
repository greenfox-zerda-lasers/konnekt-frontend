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
    .when('/edit', {
      templateUrl: 'edit.html',
      controller: 'editController',
    })
    .when('/create', {
      templateUrl: 'create.html',
      controller: 'createController',
    })
    .otherwise({
      redirectTo: '/login',
    });
}]);


// APP RUN
// konnektApp.run(['$rootScope', '$location', 'UserService', function ($rootScope, $location, UserService) {
//
//   $rootScope.$on('$routeChangeStart', function (event, next) {
//
//     if (next.templateUrl === 'registration.html') {
//       $location.path('/register');
//     } else if (!UserService.isLoggedIn()) {
//       $location.path('/login');
//     }
//   });
// }]);


// FACTORIES
konnektApp.factory('HttpService', ['$http', function ($http) {

  function login(userData) {
    return $http.post(`${appUrl}/login`, JSON.stringify(userData), { withCredentials: true });
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


konnektApp.factory('UserService', ['HttpService', '$window', 'ContactDataHandling', function (HttpService, $window, ContactDataHandling) {

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

     // userData = {
     // id: -1,
     // token: '',
     // email: '',
     // password: '',
     // passwordConfirmation: '',
     // errormessage: false
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
    return HttpService.login(data)
      .then(function (successResponse) {
        if (successResponse.status === 201) {
          let newUserData = {};

          newUserData.session_token = successResponse.headers().session_token;
          if (newUserData.session_token !== '') {
            newUserData.id = successResponse.data.user_id;
            setUserData(newUserData);
            setUserLocalStorage();
            ContactDataHandling.setContactData(newUserData.session_token).then(function () {
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
          userData.errormessage = errorResponse.data.errors[0].name + ' : ' + errorResponse.data.errors[0].message;
          console.log(userData);
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
          // beenged a dashboardra reg nélkül, nincs 403 hiba
          // ha két jelszó nem egyezik hibaüzenet, foglalt névnél hibaüzenet, (hosszra ellenőrizni)
          console.log('registration error 403:', errorResponse);
          logoutUser();
          $window.location.href = '#!/register';
          userData.errormessage = errorResponse.data.errors[0].name + ' : ' + errorResponse.data.errors[0].message;
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


konnektApp.factory('ContactDataHandling', ['HttpService', function (HttpService) {

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
      userData.errormessage = "Kérlek add meg a regisztrációs adataidat!";

    }
  };
}]);

konnektApp.controller('loginController', ['$scope', 'UserService', function ($scope, UserService) {

  $scope.header = 'lépj be';
  $scope.welcome = 'üdv a Konnekt Kontaktkezelőben!';
  $scope.button = 'mehet';
  $scope.errormessage = UserService.getUserData().errormessage;

  $scope.loginMember = function () {
    let newUserData = {};
    newUserData.email = $scope.userLogin.email;
    newUserData.password = $scope.userLogin.password;
    UserService.setUserData(newUserData);
    UserService.login()
    .then(function() {
      $scope.errormessage = UserService.getUserData().errormessage;
    });
  };

  if (UserService.getUserLocalStorage()) {
    console.log('automatic log on');
    UserService.login();
  }

}]);

konnektApp.controller('dashboardController', ['UserService', 'ContactDataHandling', '$window', function (UserService, ContactDataHandling, $window) {

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
      ContactDataHandling.setContactData();
    } else {
      UserService.logoutUser();
    }
  }

  vm.loggedInUserId = UserService.getUserData().id;
  vm.allContacts = ContactDataHandling.getContactData();

}]);

konnektApp.controller('editController', ['$scope', 'UserService', function ($scope, UserService) {

  $scope.header = 'kontakt szerk';
  $scope.welcome = 'Változtass az ismerőseiden!';
  $scope.button = 'mehet';
  $scope.editName = 'Béla';
  $scope.editDescription = 'rövid leírás: (pl. "Béla orvosit  végzett, most a NASAnál takarító")';

  $scope.editContact = function () {
    console.log($scope.editName);
    console.log($scope.editDescription);
  };
}]);

konnektApp.controller('createController', ['$scope', 'UserService', function ($scope, UserService) {

  $scope.create_header = 'új kontakt';
  $scope.create_welcome = 'Adj hozzá egy hasznos ismerőst!';
  $scope.button = 'mehet';

  // $scope.createName = createName;
  // $scope.createDesc = createDesc;
  //
  // $scope.createContact = function () {
  //   let newContactData = {};
  //   newContactData.name = createName;
  //   newContactData.desc = createDesc;
  // };

}]);
