(function(){
  angular.module('policy')
         .controller('Policy', Policy);

  Policy.$inject = ['$routeParams','sharedServices'];

  function Policy($routeParams, sharedServices){
    var vm = this;
    getPolicies();

    function getPolicies(){
      sharedServices.getPostsByCategory('policies').then(function(policies){
	        vm.policies = policies;
      }).catch(function(error){
        vm.policies = [];
      });
    }
  }
})();
