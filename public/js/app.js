'use strict';

// Declare app level module which depends on filters, and services

angular.module('app', ['ngRoute'])
.config( ['$routeProvider', function ($routeProvider)  { 
	$routeProvider
	.when('/', { 
		templateUrl : '/views/home.html', 
		controller : 'HomeController'})
	.when('/novo', { 
		templateUrl : '/views/novo.html', 
		controller : 'NovoController'})
	.otherwise({
        templateUrl: '/views/home.html',
        controller: 'HomeController'
     });
}]);
