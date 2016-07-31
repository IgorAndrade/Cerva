(function() {
	'use strict';

	angular.module('app').factory("Tabela", navaTabela);

	function navaTabela(NgTableParams,$q,Restangular) {
		return function NovaTabela(url){
			var tabela = new NgTableParams({
				count: 10 
			}, {
					counts: [5,10,15,20,50],
					getData: getData,
			        paginationMaxBlocks: 5,
			        paginationMinBlocks: 2
				}
			);
			
			function getData(param){
				var q={
					pg:param.page(),
					qtd:param.count()
				};
				if(param.filter()){
					q.q={};
					for(var f in param.filter()) {
						q.q[f] = param.filter()[f];
					}
				}
				if(param.sorting()){
					q.sort={};
					for(var s in param.sorting())
						q.sort[s]=param.sorting()[s];
				}
				
				var deferred = $q.defer();
				Restangular.all(url).customGET(null,q,null).then(
						function(result) {
							param.total(result.data.total);
							deferred.resolve(result.data.data);
						}).catch(function(e){
							deferred.resolve([]);
						});
				return deferred.promise;
			};
			
			return tabela;
			
		}
	}

})();