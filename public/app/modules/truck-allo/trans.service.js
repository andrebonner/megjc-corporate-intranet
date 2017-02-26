(function() {
    'use strict';

    angular
        .module('trans')
        .service('transService', transService);

    transService.$inject = ['$http'];

    /* @ngInject */
    function transService($http) {
        var service = {
          getTransaction: getTransaction,
          getTransactions: getTransactions,
          updateTransaction: updateTransaction,
          createTransaction: createTransaction
        }

        function getTransactions() {
          return $http
                    .get('/api/v2/transactions')
                    .then(function (res) {
                      return res.data
                    }).catch(function(res){
                      return res
                    })
        }

        function getTransaction( id ) {
          return $http
                    .get('/api/v2/transactions/' + id)
                    .then(function (res) {
                      return res.data
                    }).catch(function(res){
                      return res
                    })
        }

        function updateTransaction( value, id ) {
          var update = {'value': value},
              url = '/api/v2/transactions/' + id
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
            .post('/api/v2/transactions', trans)
            .then(function (res) {
               return res.data
            }).catch(function (res) {
               return res
            })
        }

        return service
    }
})();
