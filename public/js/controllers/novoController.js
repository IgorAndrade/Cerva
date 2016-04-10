'use strict';

/* Controllers */

angular.module('app').
  controller('NovoController', function ($scope, $http,userService) {
  	
  	userService.init();

  })
