(function(){
	angular
	.module('directory',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/directory',{
			controller: 'Directory',
			controllerAs: 'vm',
			templateUrl: 'public/app/modules/directory/directory.html'
		});
	}
})();
