(function(){
	angular
	.module('mail',['ngFileUpload', 'ngMessages'])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/mails',{
			templateUrl: "public/app/modules/mail/mail.html",
			controller: 'Mail',
			// controllerAs: 'vm',
			access: {restricted: true}
		}).when('/mails/create', {
			templateUrl: "public/app/modules/mail/create.html",
			controller: 'Mail',
			// controllerAs: 'vm',
			access: {restricted: true}
		}).when('/mails/:id/view', {
			templateUrl: "public/app/modules/mail/view.html",
			controller: 'Mail',
			// controllerAs: 'vm',
			access: {restricted: true}
		});
	}
})();
