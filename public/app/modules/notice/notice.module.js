(function(){
    angular
        .module('notice',[])
        .config(config);

    function config($routeProvider){
        $routeProvider
            .when('/notices/:slug',{
                controller: 'Notice',
                controllerAs: 'vm',
                templateUrl: 'public/app/modules/notice/notice.html'

            }).when('/notices', {
                controller: 'Notice',
                controllerAs: 'vm',
                templateUrl: 'public/app/modules/notice/notice-list.html'
            });
    }
})();
