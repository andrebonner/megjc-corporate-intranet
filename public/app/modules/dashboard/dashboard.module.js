(function() {
    'use strict';

    angular
        .module('dashboard', [])
        .config(config);

        function config($routeProvider) {
          $routeProvider.when('/dashboard/apps',{
            templateUrl:'public/app/modules/dashboard/dashboard.html',
            controller: 'Dashboard as vm',
            access: {restricted: true}
          }).otherwise({redirectTo: '/'});
        }
})();
