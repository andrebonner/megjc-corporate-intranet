(function(){
	angular
	.module('help',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/help-desk',{
			templateUrl: "public/app/modules/help-desk/help.html",
			controller: 'HelpDesk',
			controllerAs: 'vm',
			access: {restricted: false}
		});
	}
})();
