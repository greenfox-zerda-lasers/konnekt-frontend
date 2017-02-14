'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

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
})();
