(function() {
    'use strict';

    angular
        .module('trans')
        .service('transService', transService);

    transService.$inject = ['$http', 'API_URL'];

    /* @ngInject */
    function transService($http, API_URL) {
        var service = {
          getTransaction: getTransaction,
          getTransactions: getTransactions,
          updateTransaction: updateTransaction,
          createTransaction: createTransaction
        }

        function getTransactions() {
          return $http
                    .get(API_URL + 'transactions')
                    .then(function (res) {
                      return res.data
                    }).catch(function(res){
                      return res
                    })
        }

        function getTransaction( id ) {
          return $http
                    .get(API_URL + 'transactions/' + id)
                    .then(function (res) {
                      return res.data
                    }).catch(function(res){
                      return res
                    })
        }

        function updateTransaction( value, id ) {
          var update = {'value': value},
              url = API_URL + 'transactions/' + id
          return $http
                    .put(url, update)
                    .then(function (res) {
                      return res.data
                    }).catch(function(res){
                      return res
                    })
        }

        function createTransaction( trans ) {
          return $http
            .post(API_URL + 'transactions', trans)
            .then(function (res) {
               return res.data
            }).catch(function (res) {
               return res
            })
        }

        return service
    }
})();
