angular.module('app').factory("CervejaRepository",function(Restangular){
	return 'Restangular.all("/services/cerveja")';

});