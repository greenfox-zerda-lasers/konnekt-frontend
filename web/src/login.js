'use strict';

var angular = require('angular');

var loginForm = angular.module('loginForm', []);

loginForm.controller('loginController', ['$scope', function ($scope) {
  $scope.message = 'LÉPJ BE.';
  // $scope.heroImage = {
  //   background: 'url(images/login_background.jpg)',
  // };
}]);
