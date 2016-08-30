	(function(){
  angular.module('vacancy')
         .controller('Vacancy', Vacancy);

  Vacancy.$inject = ['$routeParams','sharedServices'];

  function Vacancy($routeParams, sharedServices){
    var vm = this;
    vm.goTo = goTo;
    getVacancies();

    sharedServices.getPostBySlug($routeParams.slug).then(function(vacancy){
      vm.vacancy = vacancy;
    });

   function goTo(path){
	sharedServices.goTo(path);
   }

    function getVacancies(){
      sharedServices.getPostsByCategory('vacancies').then(function(vacancies){
       	vm.vacancies = vacancies;
      }).catch(function(error){
        vm.vacancies = [];
      });
    }
  }
})();
