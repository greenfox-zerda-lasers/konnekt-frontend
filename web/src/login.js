'use strict';

require('angular');

var loginForm = angular.module('loginForm', []);

loginForm.controller('loginController', function($scope){
 $scope.message = 'Please sign in';
});
