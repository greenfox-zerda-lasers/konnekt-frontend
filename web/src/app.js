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

require('./css/style.css');

const angular = require('angular');
const ngRoute = require('angular-route');

const konnektApp = angular.module('konnektApp', ['ngRoute']);

// APP CONFIG
require('./app/router.js');

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
require('./app/httpservice.js');
require('./app/userservice.js');
require('./app/contactdatahandling.js');

// CONTROLLERS
require('./app/registrationcontroller.js');
require('./app/logincontroller.js');
require('./app/dashboardcontroller.js');
require('./app/editcontroller.js');
