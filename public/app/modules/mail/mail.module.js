(function(){
	angular
	.module('mail',[])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/mail',{
			templateUrl: "public/app/modules/mail/mail.html",
			controller: 'Mail',
			controllerAs: 'vm',
			access: {restricted: true}
		});
	}
})();
