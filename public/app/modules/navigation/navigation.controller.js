(function () {
   angular
   .module('navigation')
   .controller('Nav', Nav);

   Nav.$inject = ['$location','loginService'];

   function Nav ($location, loginService){
     var vm = this;
     vm.logout = logout;
     vm.action = 'LOGIN';
     //vm.login = !loginService.isAuthenticated();
     //vm.loggedin = loginService.isAuthenticated();
     activate();

     function activate() {
      vm.login = !loginService.isAuthenticated();
      vm.loggedin = loginService.isAuthenticated();
       if(vm.loggedin){
         vm.action = 'LOGOUT';
       }else{
         vm.action = 'LOGIN';
       }
     }

     function logout() {
       loginService.logout();
       activate();
       $location.path('/login');
     }
   }
})();
