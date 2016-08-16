(function(){
  angular
    .module('help')
    .factory('helpDeskService', helpDeskService);

    helpDeskService.$inject = ['$http'];

    function helpDeskService($http){
      var service = {
          createTicket: createTicket,
          getTickets: getTickets,
          getClosedTickets: getClosedTickets,
          getCategories : getCategories
      };
      return service;
      /**
       * Creates a ticket
       * @param  {[type]} ticket [description]
       * @return {[type]}        [description]
       */
      function createTicket(ticket){
         return $http.post('/api/v1/tickets', ticket)
                      .then(handleSuccess)
                      .catch(handleError);
        function handleSuccess(response){ return response.data; }
        function handleError(error){ return error; }
      }
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
       * Get closed tickets for a user by firstname and lastname
       * @param  {[type]} user [description]
       * @return {[type]}      [description]
       */
      function getClosedTickets(user){
          return $http.get('/api/v1/tickets/' + user.fname + '/' + user.lname + '/closed')
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
