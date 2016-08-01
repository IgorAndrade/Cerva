'use strict';

/* Controllers */

angular.module('app').controller('StyleController', function ($scope, $state, $stateParams, Tabela, Restangular, StatusService) {

    $scope.salvar = salvarStyle;

    $scope.openStyle = openStyle;

    $scope.tabelaStyle = new Tabela("/style");

    $scope.listaStatus = StatusService;

    if ($state.params && ($state.params.id)) {
        editar($state.params.id);
    }

    function editar(id) {
        Restangular.one("/style", $state.params.id).get().then(function (novoStyle) {
            $scope.style = novoStyle.data;
        }).catch(function (e) {
            var a = e
        })
    }


    function saveOk(result) {
        $state.go("styleList");
    };
    function saveErro(result) {

    };

    function salvarStyle() {
        if ($scope.style) {
            enviar();
        }
    };

    function openStyle(style) {
        $state.go("style:id", {id: style._id});
    }


    function enviar(cb) {
        if (!cb)
            cb = saveOk;
        if ($scope.style._id) {
            $scope.style.put().then(cb, saveErro);
        } else
            Restangular.all("/style").post($scope.style).then(cb, saveErro);
    };


})
