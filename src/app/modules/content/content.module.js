(function(){
    'use strict';
    angular
        .module('content',[])
        .config(config);

    function config($routeProvider){
        $routeProvider
            .when('/content/:id',{
                controller: 'Content',
                templateUrl: 'app/modules/content/content.html'
            });
    }
})();
