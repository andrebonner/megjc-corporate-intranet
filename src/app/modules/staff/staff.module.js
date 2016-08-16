(function(){
    angular
        .module('staff',[])
        .config(config);
    /**
     * Route definitions
     * @param $routeProvider
     */
    function config($routeProvider){
        $routeProvider
            .when('/staff-focus',{
                controller: 'Staff',
                templateUrl: 'public/app/modules/staff/staff.html'
            });
    }
})();
