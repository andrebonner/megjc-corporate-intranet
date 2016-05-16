(function(){
	angular
	.module('directory')
	.controller('Directory', Directory)
	.constant("DEFAULTS", {
		"department" : 1,
		"min_length" : 3
	});

	Directory.$inject = ['$scope', '$http', '$routeParams', 'DEFAULTS'];

	function Directory($scope, $http, $routeParams, DEFAULTS){
		// $http.get('/api/employees').then(function(employees){
		// 	$scope.employees = employees.data;
		// });
		var employees = getEmployees();
		$scope.departments = getDepartments();
		$scope.employees = getEmployeesByDepartmentId(parseInt($routeParams.dept_id) || DEFAULTS.department);
		$scope.search = search;
		/**
		 * Get all employees
		 * @return {[type]} [description]
		 */
		function getEmployees(){
			return [{	"id": 1,
						"name": "Winsome Christie",
						"position": "Director, Communication",
						"department_id": 10,
						"email": "w.christie@mtw.gov.jm",
						"extension": "2308",
						"cug": "876 444 4444"},
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
					},
					{	"id": 7,
						"name": "Natasha Higgins",
						"department_id": 30,
						"position": "Secretary",
						"email": "nastasha.higgins@mwlecc.gov.jm",
						"extension": "2151"
					},
					{	"id": 8,
						"name": "Shallia Wilks",
						"department_id": 30,
						"position": "Records Officer",
						"email": "shallia.wilks@mwlecc.gov.jm",
						"extension": "2151"
					},
					{	"id": 9,
						"name": "Tremaine Buchanan",
						"department_id": 40,
						"position": "Web Developer",
						"email": "tremaine.buchanan@megjc.gov.jm",
						"extension": "2930",
						"cug": "876 290 8887"
					},
					{	"id": 10,
						"name": "Zane Francis",
						"department_id": 40,
						"position": "Systems Development Manager",
						"email": "zane.francis@megjc.gov.jm",
						"extension": "2930",
						"cug": "876 504 5310"
					},
					{	"id": 11,
						"name": "Patrick Thompson",
						"department_id": 40,
						"position": "Director, ICT Division",
						"email": "patrick.thompson@megjc.gov.jm",
						"extension": "2918",
						"cug": "876 564 0131"
					}];
		}
		/**
		 * Get all departments
		 * @return {[type]} Array of departments
		 */
		function getDepartments(){
			return [{"id": 10, "name": "Public Relations"},
					{"id": 20, "name": "Documentation, Information and Access Serivces"},
					{"id": 30, "name": "Human Resources Department"},
					{"id": 40, "name": "ICT Divison"}];
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
					result.push(employees[len]);
				}
			}
			return result;
		}
		/**
		 * Searches database for a particular staff member
		 * @return {[type]} [description]
		 */
		function search(){
			$http.get('/api/departments').then(function(data){
				console.log(data);
			});
			//if($scope.searchValue && $scope.searchValue.length > DEFAULTS.min_length) 
				//console.log($scope.searchValue);
			//if($scope.searchValue.length > DEFAULTS.min_length) 
				
		}
	}
})();
