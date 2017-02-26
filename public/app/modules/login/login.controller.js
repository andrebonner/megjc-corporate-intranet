(function() {
    'use strict';

    angular
        .module('login')
        .controller('Login', Login);

    Login.$inject = ['$location','loginService']
    /* @ngInject */
    function Login($location, loginService) {
        var vm = this
        vm.message = false
        vm.user = {}
        vm.handleForm = handleForm

        activate()
        /**
         * [activate description]
         * @return {[type]} [description]
         */
        function activate() {
          if(sessionStorage.getItem('_jwt') !== null){
            loginService
              .isAuthenticated()
              .then(function (res) {
                if(res.success) $location.path('/dashboard')
              })
          }
        }
        /**
         * [handleForm description]
         * @param  {[type]} form [description]
         * @return {[type]}      [description]
         */
        function handleForm(form) {
					loginService
						.authenticate(vm.user)
						.then(function (res) {
                if(form){
                    vm.user = {}
                    form.$setValidity()
                    form.$setPristine()
                    form.$setUntouched()
                }
                loginService.setToken(res.token)
                $location.path('/dashboard')
						}).catch(function (error) {
							console.log('Error')
						})
        }
    }
})();
