(function(){
   'use strict';
   angular
   .module('directory')
   .factory('directoryService', directoryService);
   
   directoryService.$inject = ['$http'];
   
   function directoryService($http){
       var service = {
           getDepartments: getDepartments,
           getEmployeesByDepartment:getEmployeesByDepartment
       };
       /**
        * Get all departments
        */
       function getDepartments(){
           var url = '/api/v1/departments';
           
           return $http.get(url)
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
           var url = '/api/v1/departments/' + id + '/employees';      

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