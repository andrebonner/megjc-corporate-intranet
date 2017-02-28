(function(){
	angular
	.module('mail',['ngFileUpload', 'ngMessages'])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/dashboard/apps/mails',{
			templateUrl: "public/app/modules/mail/mail.html",
			controller: 'Mail',
			access: {restricted: true}
		}).when('/dashboard/apps/mails/create', {
			templateUrl: "public/app/modules/mail/create.html",
			controller: 'Mail',
			access: {restricted: true}
		}).when('/dashboard/apps/mails/:id/view', {
			templateUrl: "public/app/modules/mail/view.html",
			controller: 'Mail',
			access: {restricted: true}
		});
	}
})();
