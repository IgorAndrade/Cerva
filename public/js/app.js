'use strict';

// Declare app level module which depends on filters, and services

angular.module('app', ['ui.router','ngRoute','restangular','User'])
/*
.config( function ($routeProvider)  { 
	$routeProvider
	.when('/', { 
		templateUrl : '/views/home.html', 
		controller : 'HomeController'})
	.when("/login:id",{
		templateUrl : '/views/home.html', 
		controller : 'HomeController'})
	.when('/cerveja', { 
		templateUrl : '/views/cerveja.html', 
		controller : 'CervejaController'})
	.when('/cerveja/:id', { 
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
*/
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
	      url: '/home',
	      views: {
	      	'menu':{templateUrl: 'views/diretivas/menu.html'},
	        'content': {
	          templateUrl: 'views/home.html',
	          controller: 'HomeController'
	        }
	      }
	     
		})
		.state('adm', {
	      url: '/profile',
	      views: {
	      	'menu':{templateUrl: 'views/diretivas/menu.html'},
	        'content': {
	          templateUrl: 'views/cervejas/listaCervejas.html',
	          controller: 'NovoController'
	        }
	      } 
	     
		})
})
.run(function($rootScope){
	//$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.$on('$viewContentLoaded', init);
	//})
})


.config(function(RestangularProvider) {
      RestangularProvider.setRestangularFields({
        id: '_id'
      });
    })


