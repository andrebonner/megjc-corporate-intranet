(function(){
	angular
		.module('login',[])
		.config(config);

	function config($routeProvider){
		$routeProvider.when('/login',{
			controller: 'Login',
			controllerAs: 'vm',
			templateUrl: 'public/app/modules/login/login.html'
		});
	}
})();