(function(){
	'use strict';
	angular
	.module('directory')
	.controller('Directory', Directory)
	.constant("DEFAULTS", {
		"department" : 5,
		"min_length" : 2,
		"api_base_url": "/api/v1/"
	});

	Directory.$inject = ['$scope', '$http', '$routeParams', 'DEFAULTS', 'directoryService'];

	function Directory($scope, $http, $routeParams, DEFAULTS, directoryService){
		var url = DEFAULTS.api_base_url + 'departments';
		$scope.employees = getEmployeesByDepartmentId($routeParams.dept_id || parseInt(DEFAULTS.department));
		$scope.search = search;	
		$scope.getEmployees = getEmployeesByDepartmentId;
		/**
		 * Get all departments
		 */
		directoryService
			.getDepartments()
			.then(function(departments){
				$scope.departments = departments;
			});
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
			var url = DEFAULTS.api_base_url + 'search/employees?name=';
			if($scope.searchValue && $scope.searchValue.length > DEFAULTS.min_length){
				var query = url + $scope.searchValue;
				$http.get(query).then(function(result){
					$scope.employees = result.data;
				});
			}else{
				$scope.employees = getEmployeesByDepartmentId(parseInt(DEFAULTS.department));
			}		
		}			
	}
})();
