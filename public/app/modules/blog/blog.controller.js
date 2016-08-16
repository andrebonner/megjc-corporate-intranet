(function(){
    angular
        .module('blog')
        .controller('Blog', Blog);

    Blog.$inject = ['$scope', '$routeParams','sharedServices', 'blogService'];

    function Blog($scope, $routeParams, sharedServices, blogService){
        $scope.notices = sharedServices.getNotices();

        blogService.getBlogById($routeParams.id).then(function(blog){
            console.log(blog)
            $scope.blog = blog;
        });
    }
})();