(function() {
    'use strict';

    angular
        .module('api-interceptors', [])
        .service('apiService', apiService);

    apiService.$inject = ['$q', '$location'];

    /* @ngInject */
    function apiService($q, $location, loginService) {
        var service = {
            request: request,
            response:response,
            responseError: responseError
        }

        function request(config) {
          var token = sessionStorage.getItem('_jwt')
          if(token !== null){
            config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('_jwt')
          }
          //console.log(config)
          return config
        }

        function response(response) {
          return response
        }

        function responseError(rejection) {
          console.log(rejection)
          // switch (rejection.status) {
          //   case 403: $location.path('/login');
          //     break;
          //   default: $location.path('/login')
          //
          // }
          return $q.reject(rejection)
        }

        return service
    }
})();
