(function () {
   angular
   .module('login')
   .service('loginService', loginService);

   loginService.$inject = ['$http', '$window','API_URL'];

   function loginService($http, $window, API_URL) {
     var service = {
       authenticate: authenticate,
       checkCredentials: checkCredentials,
       isAuthenticated: isAuthenticated,
       getDepartmentId: getDepartmentId,
       getDepartment: getDepartment,
       getUserId: getUserId,
       getUser: getUser,
       getUserName: getUserName,
       logout: logout,
       setUser: setUser,
       setToken: setToken,
       getToken: getToken
     };
     /**
      * Authenticates a user based on email and password.
      * @param  {[type]} user User's email and password
      */
     function authenticate(user) {
       return $http
                .post(API_URL.base_url + 'auth', user)
                .then(handleSuccess)
                .catch(handleError);
        function handleSuccess(response){
          return response.data;
        }
        function handleError(error){
          return error;
        }
     }
     /**
      * Checks if user credentials are valid.
      * @param  object - credentials User name and password
      * @return boolean             [description]
      */
     function checkCredentials( credentials ) {
       if(credentials.username === '' && credentials.password === '') return false;
       if(credentials.username === '' || credentials.password === '') return false;

       return true;
     }
     /**
      * Get department id from dn.
      * @param  string dn Domain Name string
      * @return object
      */
     function getDepartment(dn) {
       return $http.post(API_URL.base_url + 'departments', {dn: dn})
                   .then(handleSuccess)
                   .catch(handleError);
       /**
        * Handles success
        * @param  {[type]} response [description]
        * @return {[type]}          [description]
        */
       function handleSuccess(response){
         return response.data;
       }
       /**
        * [handleError description]
        * @param  {[type]} error [description]
        * @return {[type]}       [description]
        */
       function handleError(error){
         return error;
       }
     }
     /**
      * Determines if a user is authenticated.
      * @return boolean true if user is authenticated.
      */
     function isAuthenticated() {
       return $http.get(API.URL + 'auth/token')
                   .then(function (res) {
                      return res.data
                   }).catch(function (error) {
                      return error
                   });
     }
     /**
      * Sets user object to local storage.
      * @param object user User object.
      */
     function setUser(user) {
       localStorage.setItem('user', JSON.stringify(user));
     }
     /**
      * Gets a user object from local storage.
      * @return string User object.
      */
     function getUser() {
       return JSON.parse(localStorage.getItem('user'));
     }
     /**
      * Get the user's id from local storage.
      * @return string User's id.
      */
     function getUserId(){
       var user = JSON.parse(localStorage.getItem('user'));
       return user.id;
     }
     /**
      * Get the user's department id from local storage.
      * @return {[type]} [description]
      */
     function getDepartmentId() {
       var user = JSON.parse(localStorage.getItem('user'));
       return user.dept_id;
     }
     /**
      * Logs out user.
      * @return {[type]} [description]
      */
     function logout() {
       localStorage.removeItem('user');
     }
     /**
      * Get username from local storage.
      * @return string uname
      */
     function getUserName(){
       var user = JSON.parse(localStorage.getItem('user'))
       return user.uname
     }
     /**
      * Gets the user.
      * @param  {[type]} dn      [description]
      * @param  {[type]} dept_id [description]
      * @return {[type]}         [description]
      */
     function getUser(dn, dept_id) {
       return $http.post(API_URL.base_url + 'users', {dn: dn, dept_id: dept_id})
                   .then(handleSuccess)
                   .catch(handleError);
           function handleSuccess(response){
             return response.data;
           }
           function handleError(error){
             return error;
           }
     }

     function setToken( token ) {
       if(token != null || token != undefined ) sessionStorage.setItem('_jwt', token)
     }

     function getToken() {
        var token = sessionStorage.getItem('_jwt');
        if(typeof token === 'undefined') return false
     }

     function _createAuthHeader() {
       var token = sessionStorage.getItem('_jwt') || '',
           auth_header = {'Authorization': 'Bearer ' + token }
       return auth_header
     }

     return service;
   }
})();
