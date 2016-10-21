(function(){
  angular.module('promotion')
         .controller('Promotion', Promotion);

 Promotion.$inject = ['sharedServices'];

  function Promotion(sharedServices){
    var vm = this;
    getPromotions();	   

    function getPromotions(){
       sharedServices.getPostsByCategory('promos').then(function(promos){
	     vm.promo = promos;
     	}).catch(function(error){
            vm.promo = [];
       });
    }
  }
})();
