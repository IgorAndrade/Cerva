angular.module("app").config(["$routeProvider", function($routeProvider) { 
	$routeProvider
	.when('/', { 
		templateUrl : 'home.html', 
		controller : 'HomeController'})
	.when('/novo', { 
		templateUrl : 'novo.html', 
		controller : 'NovoController' }); 
}]);
