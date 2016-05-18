(function(){
   'use strict';
   angular
   .module('directory')
   .factory('directoryService', directoryService)
   .constant('ENDPOINTS',{
       'departments': '/api/v1/departments',
       'search': '/api/v1/search/employees?name='
   });
   
   directoryService.$inject = ['$http', 'ENDPOINTS'];
   
   function directoryService($http, ENDPOINTS){
       var service = {
           getDepartments: getDepartments,
           getEmployeesByDepartment:getEmployeesByDepartment
       };
       /**
        * Get all departments
        */
       function getDepartments(){
           return $http.get(ENDPOINTS.departments)
                        .then(getDepartmentsSuccess)
                        .catch(getDepartmentsFailure);
             /**
              * Handle data retrieval success
              */
            function getDepartmentsSuccess(result){
                return result.data;
            }
            /**
             * Handle data retrieval error
             */
            function getDepartmentsFailure(error){
                
            }
       }
       /**
        * Get employees by department id
        * @param id Deparment id
        */
       function getEmployeesByDepartment(id){
           var url = ENDPOINTS.departments + '/' + id + '/employees';           
           return $http.get(url)
                        .then(getEmployeesSuccess)
                        .catch(getEmployeesFailure);
            /**
             * Handle data retrieval success
            */    
            function getEmployeesSuccess(result){
                return result.data;
            }
            /**
             * Handle data retrieval error
             */
            function getEmployeesFailure(error){
                
            }
       }
       return service;
   } 
})();