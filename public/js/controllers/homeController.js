'use strict';

/* Controllers */

angular.module('app').
  controller('HomeController',function ($scope,$window) {



  $scope.total_avaliacao=200;
  $scope.total_promocao=45;
  $scope.total_eventos=100;

  $scope.user={
    nome:"",
    senha:""
  }

  $scope.login = function(){

  }

  $scope.facebook = function(){
    goUrl('/auth/facebook');
  }

  $scope.google = function(){
    goUrl('/auth/google');
  }


  function goUrl(url){
    var url = "http://" + $window.location.host + url;
    $window.location.href = url;
  }

  });