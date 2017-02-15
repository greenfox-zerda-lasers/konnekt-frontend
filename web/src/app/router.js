'use strict';

(function () {

  const konnektApp = angular.module('konnektApp');

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
})();
