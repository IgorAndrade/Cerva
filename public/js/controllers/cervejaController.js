'use strict';

/* Controllers */

angular.module('app').
  controller('CervejaController', function ($scope,$routeParams,CervejaRepository,$location,Restangular) {


    $scope.pesquisar=function(){
      CervejaRepository.customGET("pesquisar",{q:$scope.query}).then(
        function(result){
          $scope.cervejas=result
        },
        function(error){
          $scope.cervejas=[];
        }
      );
    }

  	$scope.submit = function() {
        if ($scope.cerveja) {
        	CervejaRepository.post($scope.cerveja).then(function(result){
        		$scope.cervejas=result;
        	},function(error){
        		$location.path("/");
        	});
        	  
        }
    };

    $scope.importar = function(cerveja){
      Restangular.one("/services/cerveja/importar",cerveja.id).get()
        .then(function(novaCerveja){
          $location.path("/cerveja/"+novaCerveja._id);
      })
      
    }


  })
