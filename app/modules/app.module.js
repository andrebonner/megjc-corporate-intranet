(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'home'
	]).config(config);

	function config($locationProvider){
		$locationProvider.html5Mode(true);
	}
})();
