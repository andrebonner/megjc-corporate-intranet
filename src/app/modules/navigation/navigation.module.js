/**
 * Created by root on 4/21/16.
 */
(function(){
    angular
        .module('navigation',[])
        .config(config);

    function config($routeProvider){
        $routeProvider.when
        ('/',{
            controller: 'Home',
            templateUrl: 'public/app/modules/home/home.html'
        }).when('/polices',{
            controller: 'Home',
            templateUrl: 'public/app/modules/home/home.html'
        });
    }
})();