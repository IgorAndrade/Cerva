'use strict';

/* Controllers */

angular.module('app').controller('CervejaController', function ($scope, $state, Restangular, Upload, Tabela, StatusService) {


    $scope.salvar = salvarCerveja;

    $scope.pesquisar = pesquisar;

    $scope.importar = importar;

    $scope.openCerveja = openCerveja;

    $scope.listaStatus = StatusService;

    $scope.tabela = new Tabela("/cerveja");

    if ($state.params && ($state.params.id || $state.params.cerveja)) {
        editar($state.params.id, $state.params.cerveja);
    }

    function editar(id, c) {
        if (c != null)
            $scope.cerveja = c;
        else
            Restangular.one("/cerveja", $state.params.id).get().then(function (novaCerveja) {
                $scope.cerveja = novaCerveja.data;
            }).catch(function (e) {
                var a = e
            })
    }

    function pesquisar() {
        Restangular.all("/cerveja").customGET("pesquisar", {q: $scope.query}).then(
            function (result) {
                $scope.cervejas = result.data;
            },
            function (error) {
                $scope.cervejas = [];
            }
        );
    };


    function saveOk(result) {
        $state.go("cervejasList");
    };
    function saveErro(result) {

    };

    function salvarCerveja() {
        if ($scope.cerveja) {
            if ($scope.rotulo)
                enviarCerveja(upload);
            else
                enviarCerveja();

        }
    };

    function openCerveja(cerveja) {
        $state.go("cerveja:id", {id: cerveja._id});
    }

    function importar(cerveja) {
        Restangular.one("/cerveja/importar", cerveja.id).get()
            .then(function (novaCerveja) {
                openCerveja(novaCerveja.data);
            }).catch(function (e) {
            var a = e;
        })
    };

    function getNameImg(prefix, cerveja) {
        return prefix + "_" + cerveja.name.split(" ")[0];
    };

    function enviarCerveja(cb) {
        if (!cb)
            cb = saveOk;
        if ($scope.cerveja._id) {
            $scope.cerveja.put().then(cb, saveErro);
        } else
            Restangular.all("/cerveja").post($scope.cerveja).then(cb, saveErro);
    };

    function upload(result) {
        if ($scope.rotulo) {
            var dados = {rotulo: $scope.rotulo, 'id': result.data._id};
            if ($scope.garrafa)
                dados.garrafa = $scope.garrafa
            if ($scope.outros)
                dados.outros = $scope.outros
            Upload.upload({
                url: '/services/cerveja/upload/',
                arrayKey: '',
                data: dados
                // data: {file: file}
            }).then(saveOk, saveErro);
        }
    };

})
