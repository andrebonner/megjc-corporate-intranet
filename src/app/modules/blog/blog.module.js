(function(){
    angular
        .module('blog',[])
        .config(config);

    function config($routeProvider){
        $routeProvider
            .when('/blogs', {
                controller: 'Blog',
                templateUrl: 'public/app/modules/blog/blog-list.html'
            }).when('/blogs/:id', {
                controller: 'Blog',
                templateUrl: 'public/app/modules/blog/blog-detail.html'
            });
    }
})();
