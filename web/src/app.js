
'use strict';

require('./css/style.css');

const angular = require('angular');
const ngRoute = require('angular-route');

const konnektApp = angular.module('konnektApp', ['ngRoute']);

// APP CONFIG
require('./app/router.js');

// FACTORIES
require('./app/httpservice.js');
require('./app/userservice.js');
require('./app/contactdatahandling.js');

// CONTROLLERS
require('./app/registrationcontroller.js');
require('./app/logincontroller.js');
require('./app/dashboardcontroller.js');
require('./app/editcontroller.js');

konnektApp.controller('createController', ['$scope', '$window', 'UserService', function ($scope, $window, UserService) {

  $scope.create_header = 'új kontakt';
  $scope.create_welcome = 'Adj hozzá egy hasznos ismerőst!';
  $scope.button = 'mehet';

  var contactData = {
    name: '',
    description: ''
  };

  function saveContact(newContactData) {
    contactData = Object.assign(contactData, newContactData);
    console.log('saved contact data: ', contactData);
  };

  $scope.createContact = function () {
    let newContactData = {};
    newContactData.name = $scope.createName;
    newContactData.description = $scope.createDescription;
    saveContact(newContactData);
  };

  console.log(contactData);

}]);
