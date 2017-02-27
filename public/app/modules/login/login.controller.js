(function(){
	angular
	.module('login')
	.controller('Login', Login);

	Login.$inject = ['$location','loginService'];

	function Login($location, loginService){
		var vm = this;
		vm.handleForm = handleForm;
		vm.message = false;
		vm.user = {
			username : '',
			password : ''
		};
		activate();
		/**
		 * Handles login form to authenticate user.
		 * @param  {[type]} user User email and password.
		 */
		function handleForm(credentials){
				loginService
					.authUser(credentials)
					.then(function(res){
						sessionStorage.setItem('_jwt', res.token)
						vm.user.password = ''
						$location.path('/dashboard/apps')
					}).catch(function(err){
						console.log('Error')
					})
		}
		/**
		 * Get mails by department id if user is authenticated.
		 * @return {[type]} [description]
		 */
		function activate() {
		}
	}
})();
