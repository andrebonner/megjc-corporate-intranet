(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['loginService']
    /* @ngInject */
    function Dashboard(loginService) {
        var vm = this;
        vm.logout = logout
        activate();

        function activate() {

        }

        function logout() {
          loginService.logout()
        }
    }
})();
