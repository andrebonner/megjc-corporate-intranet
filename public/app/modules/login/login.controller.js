(function(){
	angular
	.module('login')
	.controller('Login', Login);

	Login.$inject = ['loginService'];

	function Login(loginService){
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
		function handleForm(user){
			loginService
					.authUser(user)
					.then(function(response){
							console.log(response)
					}).catch(function (error){
							console.log(error);
					});
		}
	}
})();
