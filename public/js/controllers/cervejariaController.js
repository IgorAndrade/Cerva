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
      if($scope.cervejaria._id){
    	 $scope.cervejaria.put().then(cb,saveErro); 
      }else
        Restangular.all("/cervejaria").post($scope.cervejaria).then(cb,saveErro);  
    };

    function upload(result) {
      if($scope.images){
        var dados = {images: $scope.images, 'id': result.data._id};
        Upload.upload({
            url: 'service/cervejaria/upload',
            arrayKey: '',
           data: dados
        }).then(saveOk, saveErro);
      }
    };

  })
