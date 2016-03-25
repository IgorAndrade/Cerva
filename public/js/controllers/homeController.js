'use strict';

/* Controllers */

angular.module('app').
  controller('HomeController', ['$scope','CervejaRepository', function ($scope,CervejaRepository) {

   $scope.welcome="Olá!";

   CervejaRepository.getList().then(function(lista){
    $scope.cervejas = lista;
    $scope.del=function(d,i){
      $scope.cervejas.splice(i, 1);
      d.remove();
    }
  });
  $scope.total=200;
   //$scope.$on('$viewContentLoaded', init);

  }]);