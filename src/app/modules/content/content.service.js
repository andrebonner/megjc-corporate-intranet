(function(){
    angular
        .module('content')
        .factory('contentService', contentService)
        .constant('ENDPOINTS',{
           'content': '/api/v1/content/'
        });

    contentService.$inject = ['$http', 'ENDPOINTS'];

    function contentService($http, ENDPOINTS){
        var service = {
            getContentById: getContentById
        };

        function getContentById(id){
            var url = ENDPOINTS.content + id;
            return $http.get(url)
                        .then(getContentSuccess)
                        .catch(getContentFailure);

            function getContentSuccess(content){
                return content.data;
            }

            function getContentFailure(error){

            }
        }
        return service;
    }
})();
