(function(){
	angular
	.module('login')
	.controller('Login', Login);

	Login.$inject = ['$location','loginService'];

	function Login($location, loginService){
		var vm = this
		vm.handleForm = handleForm
		vm.message = loginService.initMessage()
		vm.user = {
			name : '',
			password : ''
		}
		activate()

		/**
		 * Handles login form to authenticate user.
		 * @param  {[type]} user User email and password.
		 */
		function handleForm(credentials){
			if( loginService.checkCredentials( credentials ) ){
				loginService
						.authUser(credentials)
						.then(function(response){
							if(response.success){
								loginService
										.getDepartment(response.dn)
										.then(function (department) {
												loginService
														.getUser(response.dn, department.id)
														.then(function(user){
															if(user.success){
																vm.user = {};
																loginService.setUser(user.token);
																$location.path('/mails');
															}else{
																vm.message = loginService.message (response )
															}
														}).catch(function(error){
															console.log('We are experiencing an issue at this time.');
														})
										}).catch(function(error){
											console.log('We are experiencing an issue at this time.');
										});
							}else{
								vm.message = loginService.message( response )
							}
						}).catch(function (error){
								console.log(error);
						});
			}else{
				vm.message.show = true;
				vm.message.body = 'Invalid email/password!'
				vm.user.password = '';
			}
		}
		/**
		 * Get mails by department id if user is authenticated.
		 * @return {[type]} [description]
		 */
		function activate() {
			if(loginService.isAuthenticated()){
				$location.path('/mails');
			}
		}
	}
})();
