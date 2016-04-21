/**
 * Created by captain-kirk on 4/18/16.
 */
(function(){
    angular
        .module('notice',[])
        .config(config);

    function config($routeProvider){
        $routeProvider
            .when('/notices',{
                controller: 'Notice',
                templateUrl: 'app/modules/notice/notice.html'
            });
    }
})();