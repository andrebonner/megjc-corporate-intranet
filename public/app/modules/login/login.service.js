(function () {
   angular
   .module('login')
   .service('loginService', loginService);

   loginService.$inject = ['$http', 'API_URLS'];

   function loginService($http, API_URLS) {
     var service = {
       authUser: authUser,
       setUser: setUser,
       getUser: getUser,
       isAuthenticated: isAuthenticated
     };
     /**
      * Authenticates a user based on email and password.
      * @param  {[type]} user User's email and password
      */
     function authUser(credentials) {
        if(credentials.name === '' && credentials.password === ''){
         return false;
       }
       return $http
                .post(API_URLS.base_url + 'auth', credentials)
                .then(handleSuccess)
                .catch(handleError);
        function handleSuccess(response){
          return response.data;
        }
        function handleError(error){
          return error;
        }
     }

     function setUser(id) {
       localStorage.setItem('uid', id);
     }

     function getUser(){
       return localStorage.getItem('uid');
     }

     function isAuthenticated() {
       if(localStorage.getItem('uid') == null) return false
       else if(typeof localStorage.getItem('uid') === 'string') return true;
     }

     return service;
   }
})();
