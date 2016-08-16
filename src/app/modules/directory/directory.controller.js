(function(){
	'use strict';
	angular
	.module('directory')
	.controller('Directory', Directory);

	Directory.$inject = ['$scope', '$http', '$routeParams', 'directoryService'];

	function Directory($scope, $http, $routeParams, directoryService){
		var url = '/api/v1/departments';
		$scope.search = search;	
		activate();
		/**
		 * Get all departments
		 */
		directoryService
			.getDepartments()
			.then(function(departments){
				$scope.departments = departments;
			});
		/**
		 * [activate description]
		 * @return {[type]} [description]
		 */
		function activate(){
			getEmployeesByDepartmentId($routeParams.dept_id || 5);
		}
		/**
		 * Retrieves employees by department id.
		 * @param  {[type]} id Employee department id.
		 */		
		function getEmployeesByDepartmentId(id){
			directoryService
				.getEmployeesByDepartment(id)
				.then(function(employees){
					$scope.employees = employees;
				});
		}		
		/**
		 * Searches database for a particular staff member
		 * @return {[type]} [description]
		 */
		function search(){
			var url = '/api/v1/search/employees?name=';
			if($scope.searchValue && $scope.searchValue.length > 2){
				var query = url + $scope.searchValue;
				$http.get(query).then(function(result){
					$scope.employees = result.data;
				});
			}else{
				$scope.employees = getEmployeesByDepartmentId(5);
			}		
		}			
	}
})();
