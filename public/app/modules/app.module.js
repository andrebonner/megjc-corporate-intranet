(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'home',
		'directory'
	]).config(config);
	
	function config($locationProvider){
		$locationProvider.html5Mode(true);
	}
})();
