(function() {
    'use strict';

    angular
        .module('mail-mgmt')
        .service('mailmgmtService', mailmgmtService);

    mailmgmtService.$inject = ['$http', 'API_URLS'];

    /* @ngInject */
    function mailmgmtService($http, API_URLS) {
        var service = {
          create: create,
          getByCategory: getByCategory
        }

        return service

        function create( mail ) {
          $http
            .post(API_URLS.base_url + 'mails', mail)
            .then(function(res){
              return res
            }).catch(function (res) {
               return res
            });
        }

        function getByCategory( id ) {
         return  $http
            .get(API_URLS.base_url + 'mails/categories/' + id)
            .then(function(res){
              return res.data
            }).catch(function (res) {
               return res
            });
        }


    }
})();
