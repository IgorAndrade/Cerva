'use strict';

/* Controllers */

angular.module('app').
  controller('CervejariaController', function ($scope,$state,$stateParams,$q,CervejaModel,Restangular,Upload,Tabela,StatusService) {

	$scope.salvar = salvarCervejaria;

	$scope.openCervejaria = openCervejaria;
	
	$scope.tabela = new Tabela("/cervejaria");

	$scope.listaStatus=StatusService;

	
	
    if($state.params && ($state.params.id)){
    	editar($state.params.id);
    }
    
    function editar(id){
    	Restangular.one("/cervejaria",$state.params.id).get().then(function(novaCervejaria){
    		$scope.cervejaria= novaCervejaria.data;
    	}).catch(function(e){
    		var a = e
    	})
    }
    	
    
    function popularListaCerv(param){
			var q={
				pg:param.page()-1,
				qtd:param.count()
			};

			if(param.filter()){
				for(var f in param.filter())
					q[f]=param.filter()[f];
			}
			if(param.sorting()){
				for(var s in param.sorting())
					q[s]=param.sorting()[s];
			}
			
			var deferred = $q.defer();
			Restangular.all("/cervejaria").customGET(null,q,null).then( 
					function(result) {
						var r = result.data;
						param.total(r.totalElements);
						deferred.resolve(r.content);
					}).catch(function(e){
						deferred.resolve([]);
					});
			return deferred.promise 
		};

    function saveOk(result){
      $state.go("cervejariasList");
    };
    function saveErro(result){

    };

  
  		
  	function salvarCervejaria() {
        if ($scope.cervejaria) {
          if($scope.images) 
              enviarCerveja(upload);
          else
        	  enviarCerveja();
                	  
        }
    };

    function openCervejaria(cervejaria){
    	$state.go("cervejaria:id",{id:cervejaria._id});
    }
    

    function enviarCerveja(cb){
    	if(!cb)
    		cb=saveOk;
      if($scope.cervejaria.id){
    	 $scope.cervejaria.put().then(cb,saveErro); 
      }else
        Restangular.all("/cervejaria").post($scope.cervejaria).then(cb,saveErro);  
    };

    function upload(result) {
      if($scope.images){
        var dados = {images: $scope.images, 'id': result.data.id};
        Upload.upload({
            url: 'service/cervejaria/upload',
            arrayKey: '',
           data: dados
        }).then(saveOk, saveErro);
      }
    };

  })
