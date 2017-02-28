(function() {
    'use strict';

    angular
        .module('nav')
        .controller('Nav', Nav);

    Nav.$inject = ['$scope'];

    /* @ngInject */
    function Nav($scope) {
        $scope.logout = logout
        activate();

        function activate() {
          console.log('Nav')
        }

        function logout() {
          console.log('Logout')
        }
    }
})();
