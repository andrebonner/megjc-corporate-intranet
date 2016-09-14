(function(){
  angular.module('promotion',[])
        .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/promotion', {
        controller: 'Promotion',
        controllerAs: 'vm',
        templateUrl: 'public/app/modules/promotion/promotion.html'
      });
  }
})();
