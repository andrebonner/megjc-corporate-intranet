(function(){
	angular
	.module('home',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/', {
			controller: 'Home',
			controllerAs: 'vm',
			templateUrl: 'public/app/modules/home/home.html',
			access: {restricted: false}
		}).when('/news-feed', {
			controller: 'Home',
			controllerAs: 'vm',
			templateUrl: 'public/app/modules/home/news-feed.html',
			access: {restricted: false}
		});
	}
})();
