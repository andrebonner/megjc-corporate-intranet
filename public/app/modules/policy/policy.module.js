(function(){
  angular.module('policy',[])
        .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/policies', {
        controller: 'Policy',
        controllerAs: 'vm',
        templateUrl: 'public/app/modules/policy/policy-list.html',
        access: {restricted: false}
      });
  }
})();
