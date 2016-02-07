'use strict';

//Directives 

angular.module('app').directive("mastHead", function() 
	{ 
		 var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/views/diretivas/mast-head.html";

    return directive;
	}); 
/*
angular.module("app.directives").directive("mastFooter", function() 
	{ return { templateUrl: 'partials/mast-footer.html' }; }); 

angular.module("app.directives").directive("mastAbout", function() 
	{ return { templateUrl: 'partials/mast-about.html' }; });
	*/