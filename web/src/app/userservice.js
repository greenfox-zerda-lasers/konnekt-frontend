'use strict';

const konnektApp = angular.module('konnektApp');

konnektApp.factory('UserService', ['$window', 'HttpService', 'ContactDataHandling', function ($window, HttpService, ContactDataHandling) {

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
