(function(){
    angular
        .module('blog')
        .factory('blogService', blogService);

    blogService.$inject = ['$http'];

    function blogService($http){
        var service = {
            getBlogById: getBlogById
        };
        /**
         * Get a blog post by id
         * @param id
         */
        function getBlogById(id) {
            var url = '/api/v1/blogs/' + id;
            return $http.get(url)
                        .then(getBlogSuccess)
                        .catch(getBlogFailure);
                    /**
                     * Handles data retrieval success
                     * @param blog
                     * @returns {*}
                     */
                    function getBlogSuccess(blog){ return blog.data; }
                    /**
                     * Handles data retrieval error
                     * @param error
                     */
                    function getBlogFailure(error){}
        }
        return service;
    }
})();
