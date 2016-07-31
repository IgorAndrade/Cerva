(function() {
	'use strict';

	angular.module('app').service("ShareData", shareFunction);

	function shareFunction() {
		var share = {};

		function add(key, obj) {
			share[key] = obj
			// share.push({key:obj});
		}
		function get(key, del) {
			var obj = share[key];
			if (del)
				delete share[key];
			return obj;
		}

		return {
			add : add,
			get : get
		}
	}

})();