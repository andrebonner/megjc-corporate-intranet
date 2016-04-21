(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'home',
		'directory',
		'birthday',
		'notice',
		'app-services'
	]).config(config);
	
	function config($locationProvider){
		$locationProvider.html5Mode(true);
	}
})();
