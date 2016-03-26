'use strict';

// Declare app level module which depends on filters, and services

angular.module('app', ['ngRoute','restangular'])
.config( function ($routeProvider)  { 
	$routeProvider
	.when('/', { 
		templateUrl : '/views/home.html', 
		controller : 'HomeController'})
	.when('/cerveja', { 
		templateUrl : '/views/cerveja.html', 
		controller : 'CervejaController'})
	.when('/listaCerveja', { 
		templateUrl : '/views/cervejas/listaCervejas.html', 
		controller : 'CervejaController'})
	.otherwise({
        templateUrl: '/views/home.html',
        controller: 'HomeController'
     });
	
}).run(function($rootScope){
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.$on('$viewContentLoaded', init);
	})
})
.config(function(RestangularProvider) {
      RestangularProvider.setRestangularFields({
        id: '_id'
      });
    });
;
