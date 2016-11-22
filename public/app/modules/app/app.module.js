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
				base_url : '/api/v1/',
				root: '/intranet/api'
		});

	function config($routeProvider, $httpProvider){
		if (!$httpProvider.defaults.headers.get) {
			 $httpProvider.defaults.headers.get = {};
	 }
	 $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	 $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	 $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

	 $routeProvider.otherwise({redirectTo: '/'});
	}
	/**
	 * Checks if an application route is protected.
	 * @param  {[type]} $rootScope     [description]
	 * @param  {[type]} $location      [description]
	 * @param  {[type]} sharedServices [description]
	 * @return {[type]}                [description]
	 */
  function routeLogin($rootScope, $location, loginService){
  	$rootScope.$on('$routeChangeStart', function(event, next, current){
  		if(next.access.restricted && !loginService.isAuthenticated()){
				 $location.path('/login');
			}
  	});
  }
})();
