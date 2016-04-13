(function(){
	angular
	.module('directory',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/directory',{
			controller: 'Directory',
			templateUrl: 'app/modules/directory/directory.html'
		});
	}
})();