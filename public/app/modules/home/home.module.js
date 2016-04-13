(function(){
	angular
	.module('home',[])
	.config(config);
  
	function config($routeProvider){
		$routeProvider
		.when('/', {
			controller: 'Home',
			templateUrl: 'app/modules/home/home.html'
		}).when('/news-feed', {
			controller: 'Home',
			templateUrl: 'app/modules/home/news-feed.html'
		});
	}
})();
