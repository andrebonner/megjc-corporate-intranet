(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'home',
		'directory',
		'birthday',
		'notice',
		'help',
		'content',
		'shared-services',
		'staff',
		'blog'
	]).config(config).run(intranetTracking);

	function config($routeProvider){
		$routeProvider.otherwise({redirectTo: '/'});
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
