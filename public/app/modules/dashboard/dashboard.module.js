(function() {
    'use strict';

    angular
        .module('dashboard', [])
        .config(config);

        function config($routeProvider) {
            $routeProvider.when('/dashboard/apps',{
              templateUrl: 'public/app/modules/dashboard/tpl/dashboard.tpl.html',
              controller: 'Dashboard as vm',
              access: {restricted: true},
              role: {admin: false}
            }).otherwise({redirectTo: '/dashboard/apps'})
        }
})();
