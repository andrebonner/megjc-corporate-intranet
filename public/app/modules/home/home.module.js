(function(){
	angular
	.module('home',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/', {
			controllerAs: 'Home as vm',
			templateUrl: 'public/app/modules/home/tpl/home.html',
			access: {restricted: false}
		}).when('/vacancies', {
				controllerAs: 'Home as vm',
				templateUrl: 'public/app/modules/home/tpl/home.html',
				access: {restricted: false}
		}).when('/directory', {
				controllerAs: 'Home as vm',
				templateUrl: 'public/app/modules/home/tpl/home.html',
				access: {restricted: false}
		}).when('/forms', {
				controllerAs: 'Home as vm',
				templateUrl: 'public/app/modules/home/tpl/home.html',
				access: {restricted: false}
		}).when('/policies', {
				controllerAs: 'Home as vm',
				templateUrl: 'public/app/modules/home/tpl/home.html',
				access: {restricted: false}
		})
	}
})();
