(function(){
	angular
	.module('directory')
	.controller('Directory', Directory)
	.constant("DEFAULTS", {
		"department" : 1
	});

	Directory.$inject = ['$scope', '$http', '$routeParams', 'DEFAULTS'];

	function Directory($scope, $http, $routeParams, DEFAULTS){
		// $http.get('/api/employees').then(function(employees){
		// 	$scope.employees = employees.data;
		// });
		console.log($routeParams.dept_id);
		var employees = getEmployees();
		$scope.departments = getDepartments();
		$scope.employees = getEmployeesByDepartmentId(parseInt($routeParams.dept_id) || DEFAULTS.department);
		
		function getEmployees(){
			return [{	"id": 1,
						"name": "Winsome Christie",
						"position": "Director, Communication",
						"department_id": 10,
						"email": "w.christie@mtw.gov.jm",
						"extension": "2308",
						"cug": "876 444 4444",
						"photo": "pr1-color"},
					{	"id": 2,
						"name": "Dannie Clarke",
						"position": "Public Relation / Communication Specialist",
						"department_id": 10,
						"email": "d.clarke@mtw.gov.jm",
						"extension": "2318",
						"cug": "876 444 4444",
						"photo": "pr2-color"},
					{	"id": 3,
						"name": "Marva Hinds",
						"position": "Office Attendant",
						"department_id": 10,
						"email": "m.hinds@mtw.gov.jm",
						"extension": "2318",
						"photo": "pr3-color",
						"cug": "876 444 4444"},
					{	"id": 4,
						"name": "Chantelle Mcleod",
						"department_id": 20,
						"position": "Records Clerk",
						"email": "c.mcleod@mtwh.gov.jm",
						"extension": "2308"
					},
					{	"id": 5,
						"name": "Vanessa Asbourne",
						"department_id": 20,
						"position": "Records Clerk",
						"email": "v.asbourne@mtwh.gov.jm",
						"extension": "2308"
					},
					{	"id": 6,
						"name": "Stacy-Ann Atkins",
						"department_id": 20,
						"position": "Records Clerk",
						"email": "s.atkins@mtwh.gov.jm",
						"extension": "2308"
					}];
		}
		/**
		 * Get all departments
		 * @return {[type]} Array of departments
		 */
		function getDepartments(){
			return [{"id": 10, "name": "Public Relations"},
					{"id": 20, "name": "Documentation, Information and Access Serivces"},
					{"id": 30, "name": "ICT Division"}];
		}
		/**
		 * Retrieves employees by department id.
		 * @param  {[type]} id Employee department id.
		 * @return {[type]}    Array of employees
		 */
		function getEmployeesByDepartmentId(id){
			var len = employees.length,
				result = [];
			while(len--){
				if(employees[len].department_id === id){
					result.push(employees[len])
				}
			}
			return result;
		}
	}
})();