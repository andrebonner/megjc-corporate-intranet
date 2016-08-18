(function(){
  angular.module('vacancy')
         .controller('Vacancy', Vacancy);

  Vacancy.$inject = ['$routeParams','sharedServices'];

  function Vacancy($routeParams, sharedServices){
    var vm = this;

    sharedServices.getVacancyBySlug($routeParams.slug).then(function(vacancy){
      vm.vacancy = vacancy;
    });

    sharedServices.getVacancies().then(function(vacancies){
      vm.vacancies = vacancies;
    })
  }
})();
