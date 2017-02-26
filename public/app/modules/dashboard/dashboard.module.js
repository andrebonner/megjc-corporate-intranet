(function() {
    'use strict';

    angular
        .module('dashboard', [])
        .config(config);

        function config($routeProvider) {
          $routeProvider.when('/dashboard',{
            controller: 'Dashboard',
      			controllerAs: 'vm',
      			templateUrl: 'public/app/modules/dashboard/tpl/dashboard.tpl.html',
      			access: {restricted: true}
          });
        }
})();
