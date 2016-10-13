(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'ngCookies',
		'navigation',
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
		'promotion',
		'mail'
	]).run(routeLogin)
		.config(config)
		.constant("API_URLS", {
				base_url : '/api/v1/'
		});

	function config($routeProvider){
		$routeProvider.otherwise({redirectTo: '/'});
	}
	/**
	 * Checks if an application route is protected.
	 * @param  {[type]} $rootScope     [description]
	 * @param  {[type]} $location      [description]
	 * @param  {[type]} sharedServices [description]
	 * @return {[type]}                [description]
	 */
  function routeLogin($rootScope, $location, $route){
  	$rootScope.$on('$routeChangeStart', function(event, next, current){
  		if(next.access.restricted){
				 $location.path('/login');
				 $route.reload();
			}
  	});
  }

})();
