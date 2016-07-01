(function(){
  angular
    .module('help')
    .factory('helpDeskService', helpDeskService);

    helpDeskService.$inject = ['$http'];

    function helpDeskService($http){
      var service = {
          getTickets: getTickets,
          getCategories : getCategories
      };
      return service;
      /**
       * Get all tickets for a user
       * @param  {[type]} user [description]
       * @return {[type]}      [description]
       */
      function getTickets(user){
          return $http.get('/api/v1/tickets/' + user.fname + '/' + user.lname)
                      .then(handleSuccess)
                      .catch(handleError);
         function handleSuccess(response){ return response.data; }
         function handleError(error){ return error; }
      }
      /**
       * Get issue categories
       * @return {[type]} [description]
       */
      function getCategories(){
        return $http.get('/api/v1/admin/tickets/types')
                    .then(handleSuccess)
                    .catch(handleError);
        function handleSuccess(response){ return response.data; }
        function handleError(error){ return error; }
      }
    }
})();
