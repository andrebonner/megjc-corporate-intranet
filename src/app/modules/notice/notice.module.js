(function(){
    angular
        .module('notice',[])
        .config(config);

    function config($routeProvider){
        $routeProvider
            .when('/notices/:id',{
                controller: 'Notice',
                templateUrl: 'public/app/modules/notice/notice.html'
            }).when('/notices', {
                controller: 'Notice',
                templateUrl: 'public/app/modules/notice/notice-list.html'
            });
    }
})();