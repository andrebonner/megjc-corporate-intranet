(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'ngCookies',
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
		'vacancy',
		'poll',
		'policy',
		'form',
		'promotion'
	]).config(config)
	  .run(intranetTracking);
	  //.run(routeLogin);

	function config($routeProvider){
		$routeProvider.otherwise({redirectTo: '/'});
	}
	/**
     * Tracks each page view.
     * @param $rootScope
     * @param $location
     */
    function intranetTracking($rootScope, $location, $cookies){
        $rootScope.$on('$routeChangeStart', function(event, current){
            var route = $location.path(),
	 	tracking_cookie = $cookies.get('_ma');
	    if(tracking_cookie == null){
		var exp = new Date(new Date(2038, 0, 19, 3, 14, 7));
			
	     }else{
	     } 
	    
//check if cookie exists
//if not, set cookie to expire on the conventional date the world ends
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
