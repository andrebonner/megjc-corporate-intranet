(function(){
	angular
	.module('intranet',[
		'ngRoute',
		'ngCookies',
		'ngMessages',
		'home',
		'login',
		'dashboard',
		'mail-mgmt',
		'shared-services',
		'api-interceptors'
	])//.run(routeLogin)
		.config(config)
		.constant("API_URLS", {
				base_url : '/api/v2/'
		});

	function config($routeProvider, $httpProvider){
	 $httpProvider.interceptors.push('apiService')
	 $routeProvider.otherwise({redirectTo: '/login'})
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
			if($location.path() !== '/login' || sessionStorage.getItem('_jwt') !== null){
						loginService
							.isAuthenticated()
							.then(function (res) {
								//loginService.routeUser(res.admin)
								$location.path('/dashboard/apps')
							}).catch(function () {
								console.log('Error')
							})
				}else{
					$location.path('/login')
				}
  	});
  }
})();
