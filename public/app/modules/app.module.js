(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'home',
		'directory',
		'birthday',
		'notice',
		'help'
	]).config(config);
	
	function config($locationProvider){
		$locationProvider.html5Mode(true);
	}
})();
