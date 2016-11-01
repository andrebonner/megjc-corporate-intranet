(function () {
   angular
   .module('login')
   .service('loginService', loginService);

   loginService.$inject = ['$http', 'API_URLS'];

   function loginService($http, API_URLS) {
     var service = {
       authUser: authUser,
       setUser: setUser,
       getDepartmentId: getDepartmentId,
       getUser: getUser,
       getUserId: getUserId,
       isAuthenticated: isAuthenticated,
       logout: logout
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

     function setUser(user) {
       localStorage.setItem('user', JSON.stringify(user));
     }

     function getUser() {
       return JSON.parse(localStorage.getItem('user'));
     }

     function getUserId(){
       var user = JSON.parse(localStorage.getItem('user'));
       return user.id;
     }

     function getDepartmentId() {
       var user = JSON.parse(localStorage.getItem('user'));
       return user.dept_id;
     }

     function isAuthenticated() {
       var user = JSON.parse(localStorage.getItem('user'));
       if(user == null) return false
       else if(typeof user === 'object') return true;
     }

     function logout() {
       localStorage.removeItem('user');
     }

     return service;
   }
})();
