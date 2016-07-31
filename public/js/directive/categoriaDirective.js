(function() {
	'use strict';

	angular.module('app').directive("catDlg", stylefnc);

	function stylefnc() {
		return {
		    restrict: 'E',
		    scope: {
		      retornoCategoria: '=retorno',
		      id:'@stId'
		    },
		    templateUrl: 'views/cervejas/CategoriaDialog.html',
		    controller: catCtrl,
		    controllerAs: 'stCtrl',
		  };
		  
		function catCtrl($scope,$q,Restangular,NgTableParams,$uibModal){
			var self = this;
			self.openStyle = openStyle;
			self.navaCat = navaCat;
			
			function openStyle(){
				var modal = $uibModal.open({
				      animation: true,
				      templateUrl: 'modalCat',
				      controller: styleDlgCtrl,
				      controllerAs:'dlgCtrl'
				    });
			
			
				modal.result.then(function (selectedItem) {
					$scope.retornoCategoria= selectedItem;
			    }, function () {
				      
				    });
			}
			
			function navaCat(){
				$scope.retornoCategoria= {};
			}
		}
	}
	
	function styleDlgCtrl($scope,$q,Restangular,Tabela,$uibModalInstance){
		$scope.tabela = new Tabela("/style/categoria"); 
		
		$scope.click=click;
		
		function click(s){
			$uibModalInstance.close(s);
		}
		
	}
})();