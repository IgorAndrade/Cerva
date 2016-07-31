(function() {
	'use strict';

	angular.module('app').directive("cervejariaDlg", stylefnc);

	function stylefnc() {
		return {
		    restrict: 'E',
		    scope: {
		      retorno: '=retorno'
		    },
		    templateUrl: 'views/cervejas/cervejariaDialog.html',
		    controller: cervejariaCtrldlg,
		    controllerAs: 'cervCtrl',
		  };
		  
		function cervejariaCtrldlg($scope,$q,Restangular,NgTableParams,$uibModal){
			var self = this;
			self.open = open;
			
			function open(){
				var modal = $uibModal.open({
				      animation: true,
				      templateUrl: 'modalCervejaria',
				      controller: cervejariaCtrldlgBack,
//				      controllerAs:'cervejariaDlgCtrl'
				    });
			
				modal.result.then(function (selectedItem) {
					$scope.retorno= selectedItem;
			    }, function () {
				      
				    });
			}
		}
	}
	
	function cervejariaCtrldlgBack($scope,$q,Restangular,NgTableParams,$uibModalInstance,Tabela){
		$scope.tabela =  new Tabela("/cervejaria");
		
		$scope.click=click;
		
		function click(s){
			$uibModalInstance.close(s);
		}
		
	}
})();