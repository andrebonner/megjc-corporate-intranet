/**
 * Created by captain-kirk on 4/18/16.
 */
(function(){
    angular
        .module('birthday',[])
        .config(config);

    function config($routeProvider){
        $routeProvider
            .when('/birthdays',{
                controller: 'Birthday',
                templateUrl: 'app/modules/birthday/birthday.html'
            });
    }
})();