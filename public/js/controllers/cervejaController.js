'use strict';

/* Controllers */

angular.module('app').
  controller('CervejaController', function ($scope,$state,CervejaModel,Restangular,Upload) {

    $scope.cerveja= new CervejaModel();
    Restangular.all("/cerveja/estilos").getList().then(function(lista){
      $scope.estilos=lista;
    });


    if($state.params && $state.params.id){
      Restangular.one("/cerveja",$state.params.id).get()
        .then(function(novaCerveja){
          $scope.cerveja= new CervejaModel(novaCerveja);
      })
    }

    $scope.pesquisar=function(){
      Restangular.all("/cerveja").customGET("pesquisar",{q:$scope.query}).then(
        function(result){
          $scope.cervejas=result
        },
        function(error){
          $scope.cervejas=[];
        }
      );
    };

    function saveOk(result){
      $state.go("cervejasList");
    };
    function saveErro(result){

    };

  	$scope.salvar = function() {
        if ($scope.cerveja) {
          if($scope.rotulo)
            upload(getNameImg("",$scope.cerveja),"cerveja",function(){
              enviarCerveja();
            });

                	  
        }
    };

    $scope.importar = function(cerveja){
      Restangular.one("/cerveja/importar",cerveja.id).get()
        .then(function(novaCerveja){
          $state.go("cerveja",{id:novaCerveja._id});
      })
      
    };

    function getNameImg(prefix,cerveja){
        return prefix+"_"+cerveja.name.split(" ")[0];
    }

    function enviarCerveja(){
      if($scope.cerveja._id)
        Restangular.copy($scope.cerveja).put().then(saveOk,saveErro); 
      else
        Restangular.all("/cerveja").post($scope.cerveja).then(saveOk,saveErro);  
    }

    function upload(name,pasta,cb) {
      if($scope.rotulo){
        var dados = {rotulo: $scope.rotulo, 'name': name, 'pasta':pasta};
        if($scope.garrafa)
          dados.garrafa=$scope.garrafa
        Upload.upload({
            url: 'services/upload',
            arrayKey: '',
           data: dados
           //data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
      }
    };

    

  })
