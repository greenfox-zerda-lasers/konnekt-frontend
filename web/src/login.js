'use strict';

require('../lib/angular.min.js');

var loginForm = angular.module('loginForm', []);

loginForm.controller('loginController', function($scope){
 $scope.message = 'Please sign in';
});
