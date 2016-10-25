(function(){
	angular
	.module('login')
	.controller('Login', Login);

	Login.$inject = ['$location','loginService'];

	function Login($location, loginService){
		var vm = this;
		vm.handleForm = handleForm;
		vm.user = {
			name : '',
			password : ''
		};
		/**
		 * Handles login form to authenticate user.
		 * @param  {[type]} user User email and password.
		 */
		function handleForm(credentials){
			loginService
					.authUser(credentials)
					.then(function(response){
							if(response.success){
								vm.user = {};
								loginService.setUser(response.uid.id);
								$location.path('/mails');
							}
					}).catch(function (error){
							console.log(error);
					});
		}
	}
})();
