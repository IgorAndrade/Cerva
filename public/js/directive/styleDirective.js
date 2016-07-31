(function () {
    'use strict';

    angular.module('app').directive("styleDlg", stylefnc);

    function stylefnc() {
        return {
            restrict: 'E',
            scope: {
                retornoStyle: '=retorno',
                id: '@stId'
            },
            templateUrl: 'views/cervejas/styleDialog.html',
            controller: styleCtrl,
            controllerAs: 'stCtrl',
        };

        function styleCtrl($scope, $q, Restangular, NgTableParams, $uibModal) {
            var self = this;
            self.openStyle = openStyle;

            function openStyle() {
                var modal = $uibModal.open({
                    animation: true,
                    templateUrl: 'modalStyle',
                    controller: styleDlgCtrl,
                    controllerAs: 'dlgCtrl'
                });

                modal.result.then(function (selectedItem) {
                    $scope.retornoStyle = selectedItem;
                }, function () {

                });
            }
        }
    }

    function styleDlgCtrl($scope, $q, Restangular, NgTableParams, $uibModalInstance, Tabela) {
        $scope.tabela = new Tabela("/style");

        $scope.click = click;

        function click(s) {
            $uibModalInstance.close(s);
        }
    }
})();