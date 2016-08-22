(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'home',
		'directory',
		'birthday',
		'login',
		'notice',
		'help',
		'content',
		'shared-services',
		'staff',
		'blog',
		'vacancy'
	]).config(config)
	  .run(intranetTracking)
	  .run(routeLogin);

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
            var route = $location.path();
            console.log(route);
        });
    }

    function routeLogin($rootScope, $location, sharedServices){
    	var protectedRoutes = ['/help-desk'];
    	$rootScope.$on('$routeChangeStart', function(){
    		if(protectedRoutes.indexOf($location.path) !== ''){
    			sharedServices.isAuth().then(function(response){
    				
    			}).catch(function(error){
    				$location.path('/login');
    			});
    		}
    	});
    }

})();
