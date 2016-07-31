'use strict';

//Directives 

angular.module('app').directive("mastHead", function() 
	{ 
		 var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/views/diretivas/mast-head.html";

    return directive;
	}); 
angular.module('app').directive("menu", function() 
	{ 
		 var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/views/diretivas/menu.html";

    return directive;
	});
angular.module('app').directive("login", function() 
    { 
         var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "views/diretivas/login.html";

    return directive;
    });
angular.module('app').directive('clickLink',function($location) {
    return {
        link: function(scope, element, attrs) {
            element.on('click', function() {
                scope.$apply(function() {
                    $location.path(attrs.clickLink);
                });
            });
        }
    }
});
/*
angular.module("app.directives").directive("mastFooter", function() 
	{ return { templateUrl: 'partials/mast-footer.html' }; }); 

angular.module("app.directives").directive("mastAbout", function() 
	{ return { templateUrl: 'partials/mast-about.html' }; });
	*/