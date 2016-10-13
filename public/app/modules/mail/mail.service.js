(function(){
  angular
    .module('mail')
    .service('mailService', mailService);

    mailService.$inject = [];

    function mailService($http){
      var service = {

      };
      return service;
    }
})();
