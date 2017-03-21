(function(){
	'use strict'
	angular
	.module('help')
	.controller('HelpDesk', HelpDesk);

	HelpDesk.$inject = ['$scope', '$http', 'helpDeskService'];

	function HelpDesk($scope, $http, helpDeskService){
		var vm = this;

		activate()

		function activate() {
			console.log('Help desk')
		}
	}
})();
