(function() {
	'use strict';

	angular.module('app').factory("StatusService", servico);

	function servico($q,Restangular) {
		
		var deferred = $q.defer();
		Restangular.all("/cerveja/status").getList().then(function(result){
			var lista = result.data.plain();
			var resultado = [];
			for(var f in lista)
				resultado.push({id:lista[f],title:lista[f]});
			deferred.resolve(resultado);
		});
		
		return deferred.promise;
	}

})();