(function(){
	'use strict'
	angular
	.module('help',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/help-desk',{
			templateUrl: "public/app/modules/help-desk/tpl/help.html",
			controllerAs: 'HelpDesk as vm',
			access: {restricted: false}
		});
	}
})();
