(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'home',
		'directory',
		'birthday',
		'notice',
		'help'
	]).config(config).run(intranetTracking);

	function config($locationProvider, $routeProvider){
		$routeProvider.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(true);
	}
	/**
     * Tracks each page view.
     * @param $rootScope
     * @param $location
     */
    function intranetTracking($rootScope, $location){
        $rootScope.$on('$routeChangeStart', function(event, current){
            var pageName = $location.path();
            console.log(pageName);
        });
    }
	
})();
