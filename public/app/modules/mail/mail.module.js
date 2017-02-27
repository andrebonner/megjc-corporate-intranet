(function(){
	angular
	.module('mail',['ngFileUpload', 'ngMessages'])
	.config(config);

	function config($routeProvider){
		$routeProvider
		.when('/dashboard/mails',{
			templateUrl: "public/app/modules/mail/mail.html",
			controller: 'Mail',
			access: {restricted: true}
		});
		// .when('/mails/create', {
		// 	templateUrl: "public/app/modules/mail/create.html",
		// 	controller: 'Mail',
		// 	access: {restricted: true}
		// }).when('/mails/:id/view', {
		// 	templateUrl: "public/app/modules/mail/view.html",
		// 	controller: 'Mail',
		// 	access: {restricted: true}
		// });
	}
})();
