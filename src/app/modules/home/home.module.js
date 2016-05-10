(function(){
	angular
	.module('home',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/', {
			controller: 'Home',
			templateUrl: 'src/app/modules/home/home.html'
		}).when('/news-feed', {
			controller: 'Home',
			templateUrl: 'src/app/modules/home/news-feed.html'
		});
	}
})();
