(function () {
   angular
   .module('login')
   .service('loginService', loginService);

   loginService.$inject = ['$http', 'API_URLS'];

   function loginService($http, API_URLS) {
     var service = {
       authUser: authUser
     };
     /**
      * Authenticates a user based on email and password.
      * @param  {[type]} user User's email and password
      */
     function authUser(user) {
        if(user.name === '' && user.password === ''){
         return false;
       }
       return $http
                .post(API_URLS.base_url + 'auth', user)
                .then(handleSuccess)
                .catch(handleError);
        function handleSuccess(response){
          return response.data;
        }
        function handleError(error){
          return error;
        }
     }

     return service;
   }
})();
