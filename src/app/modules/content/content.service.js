(function(){
    angular
        .module('content')
        .factory('contentService', contentService)

    contentService.$inject = ['$http'];

    function contentService($http){
        var service = {
            getContentById: getContentById,
        };
        /**
         * Get content details by id
         * @param  {[type]} id Content id
         * @return {[type]}    [description]
         */
        function getContentById(id){
            var url = '/api/v1/content';
            return $http.get(url)
                        .then(getContentSuccess)
                        .catch(getContentFailure);
            /**
             * Handle data retrieval success
             * @param  {[type]} content List of content
             * @return {[type]}         [description]
             */
            function getContentSuccess(content){
                 return content.data;
            }
            /**
             * Handle data retrieval failuire
             * @param  {[type]} error Error object
             * @return {[type]}       [description]
             */
            function getContentFailure(error){

            }
        }
        return service;
    }
})();
