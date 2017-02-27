(function() {
    'use strict';

    angular
        .module('mail-mgmt', [])
        .config(config);

        function config($routeProvider) {
          $routeProvider.when('/dashboard/apps/mails',{
            templateUrl: 'public/app/modules/mail-mgmt/mail-mgmt.html',
            controller: 'MailManager as vm',
            access: {restricted: true}
          }).when('/dashboard/apps/mails/incoming',{
            templateUrl: 'public/app/modules/mail-mgmt/incoming-mails.html',
            controller: 'MailManager as vm',
            access: {restricted: true}
          }).when('/dashboard/apps/mails/create',{
            templateUrl: 'public/app/modules/mail-mgmt/mail-create.html',
            controller: 'MailManager as vm',
            access: {restricted: true}
          }).otherwise({redirectTo: '/dashboard/apps/mails'});
        }
})();
