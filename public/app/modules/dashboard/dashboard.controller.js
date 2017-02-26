(function() {
    'use strict'

    angular
        .module('dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$location']

    /* @ngInject */
    function Dashboard( $location ) {
        var vm = this;
        vm.goTo = goTo
        //activate();

        function activate() {
          console.log('Activated')
        }

        function goTo( path ) {
          $location.path( path )
        }
    }
})();
