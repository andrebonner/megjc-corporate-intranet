(function(){
  angular.module('form',[])
        .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/forms', {
        controller: 'Form',
        controllerAs: 'vm',
        templateUrl: 'public/app/modules/forms/form-list.html'
      });
  }
})();
