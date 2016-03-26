'use strict';

/* Controllers */

angular.module('app').
  controller('CervejaController', function ($scope, CervejaRepository,CervejariaRepository,$location) {

  	CervejariaRepository.getList().then(function(cervejarias){
  		$scope.cervejarias=cervejarias;
  	})

    $scope.pesquisar=function(){
      CervejaRepository.customGET("pesquisar",{q:$scope.query}).then(
        function(result){
          $scope.cervejas=result
        },
        function(error){
          
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


  })
