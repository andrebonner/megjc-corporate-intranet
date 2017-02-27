(function(){
  angular.module('form')
         .controller('Form', Form);

  Form.$inject = ['$routeParams','sharedServices'];

  function Form($routeParams, sharedServices){
    var vm = this;
    getForms();

    function getForms(){
      sharedServices.getPostsByCategory('forms').then(function(forms){
	        vm.forms = forms;
      }).catch(function(error){
        vm.forms = [];
      });
    }
  }
})();
