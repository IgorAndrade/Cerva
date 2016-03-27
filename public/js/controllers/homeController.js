'use strict';

/* Controllers */

angular.module('app').
  controller('HomeController', ['$scope','CervejaRepository','$routeParams', function ($scope,CervejaRepository,$routeParams) {

   $scope.welcome="Olá!"+$routeParams.uid;
   if($routeParams.uid)
    $window.sessionStorage.token = $routeParams.uid;

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