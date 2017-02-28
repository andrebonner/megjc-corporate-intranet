(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$scope'];

    /* @ngInject */
    function Dashboard($scope) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
