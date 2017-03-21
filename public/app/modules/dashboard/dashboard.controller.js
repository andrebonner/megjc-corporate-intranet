(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$location', 'loginService']
    /* @ngInject */
    function Dashboard($location, loginService) {
        var vm = this
        vm.logout = logout
        activate()

        function activate() {
          var user = JSON.parse(localStorage.getItem('user'))
          vm.username = user.uname
        }

        function logout() {
          loginService.logout()
          $location.path('/login')
        }
    }
})();
