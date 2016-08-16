(function(){
	'use strict';
	angular
	.module('directory')
	.controller('Directory', Directory);

	Directory.$inject = ['$http', '$routeParams', 'directoryService'];

	function Directory($http, $routeParams, directoryService){
		var vm = this;
		vm.search = search;
		vm.getEmployees = getEmployeesByDepartmentId;
		activate();
		/**
		 * Get all departments
		 */
		directoryService
			.getDepartments()
			.then(function(departments){
				vm.departments = departments;
			});
		/**
		 * [activate description]
		 * @return {[type]} [description]
		 */
		function activate(){
			getEmployeesByDepartmentId(5);
		}
		/**
		 * Retrieves employees by department id.
		 * @param  {[type]} id Employee department id.
		 */
		function getEmployeesByDepartmentId(id){
			directoryService
				.getEmployeesByDepartment(id)
				.then(function(employees){
					vm.employees = employees;
				}).catch(function(error){
					vm.employees = [];
				});
		}
		/**
		 * Searches database for a particular staff member
		 * @return {[type]} [description]
		 */
		function search(){
			if(vm.query && vm.query.length > 2){
				directoryService.search(vm.query)
					.then(function(result){
						vm.employees = result;
					}).catch(function(error){
							vm.employees = getEmployeesByDepartmentId(5);
					});
			}else{
				vm.employees = getEmployeesByDepartmentId(5);
			}
		}
	}
})();
