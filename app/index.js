var angular = require('angular');

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

var ngModule = angular.module('app', []);

require('./extended-canvas')(ngModule);
require('./directives')(ngModule);
