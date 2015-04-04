var angular = require('angular');

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

var ngModule = angular.module('app', []);

require('./svg-canvas')(ngModule);
//require('./directives')(ngModule);
