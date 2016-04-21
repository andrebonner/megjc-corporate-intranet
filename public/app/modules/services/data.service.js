/**
 * Created by root on 4/21/16.
 */
(function(){
    angular
        .module('dataservice',[])
        .factory('dataService', dataService)
        .constant('API_ROUTE', {
            baseUrl: '/api/v3/wordpress/?json='
        });

    dataService.$inject = ['$http', 'API_ROUTE'];

    function dataService($http, API_ROUTE){
        var service = {
            getPosts: getPosts
        };

        function getPosts(){
            $http.get(API_ROUTE.baseUrl + 'get_posts').then(function(data){
                console.log(data);
            });
        }
        return service;
    }
})();