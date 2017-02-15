
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
require('./app/createcontroller.js');
