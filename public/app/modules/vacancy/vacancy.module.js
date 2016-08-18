(function(){
  angular.module('vacancy',[])
        .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/vacancies', {
        controller: 'Vacancy',
        controllerAs: 'vm',
        templateUrl: 'public/app/modules/vacancy/vacancy-list.html'
      }).when('/vacancies/:slug',{
        controller: 'Vacancy',
        controllerAs: 'vm',
        templateUrl: 'public/app/modules/vacancy/vacancy.html'
      });
  }
})();
