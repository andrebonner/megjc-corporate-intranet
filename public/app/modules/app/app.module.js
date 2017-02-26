(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'ngCookies',
		'ngMessages',
		'home',
		'login',
		'dashboard',
		'mail',
		'trans',
		'shared-services',
		'api-interceptors'
	]).run(routeLogin)
		.config(config)
		.constant("API_URLS", {
				base_url : '/api/v2/'
		});

	function config($routeProvider, $httpProvider){
	 $httpProvider.interceptors.push('apiService')
	//  $routeProvider.when('/40')
	}
	/**
	 * Checks if an application route is protected.
	 * @param  {[type]} $rootScope     [description]
	 * @param  {[type]} $location      [description]
	 * @param  {[type]} sharedServices [description]
	 * @return {[type]}                [description]
	 */
  function routeLogin($rootScope, $location, $window, loginService){
  	$rootScope.$on('$routeChangeStart', function(event, next, current){
				if($location.path() !== '/login' || sessionStorage.getItem('_jwt') !== null){
						loginService.isAuthenticated()
				}else{
					$location.path('/login')
				}
		})
  }

})();
