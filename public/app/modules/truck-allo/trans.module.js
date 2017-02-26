(function() {
    'use strict';

    angular
        .module('trans', [])
        .config(config);

        function config($routeProvider) {
          $routeProvider.when('/dashboard/truck-allo',{
            templateUrl: 'public/app/modules/truck-allo/tpl/truck-allo.tpl.html',
            controller: 'Trans as vm',
            access: {restricted: true}
          }).when('/dashboard/truck-allo/transactions',{
            templateUrl: 'public/app/modules/truck-allo/tpl/transactions.html',
            controller: 'Trans as vm',
            access: {restricted: true}
          }).when('/dashboard/truck-allo/transactions/create',{
            templateUrl: 'public/app/modules/truck-allo/tpl/create.tpl.html',
            controller: 'Trans as vm',
            access: {restricted: true}
          }).when('/dashboard/truck-allo/transactions/:id/view',{
            templateUrl: 'public/app/modules/truck-allo/tpl/transaction.html',
            controller: 'Trans as vm',
            access: {restricted: true}
          }).when('/dashboard/truck-allo/transactions/:id/edit',{
            templateUrl: 'public/app/modules/truck-allo/tpl/transaction-edit.html',
            controller: 'Trans as vm',
            access: {restricted: true}
          }).otherwise({redirectTo: '/dashboard/truck-allo'});
        }
})();
