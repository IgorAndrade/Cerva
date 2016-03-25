angular.module('app').factory("CervejaRepository",function(Restangular){
	return Restangular.all("/services/cerveja");

});
angular.module('app').factory("CervejariaRepository",function(Restangular){
	return Restangular.all("/services/cervejaria");

});