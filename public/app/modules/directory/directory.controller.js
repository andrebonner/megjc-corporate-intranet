(function(){
	angular
	.module('directory')
	.controller('Directory', Directory);

	Directory.$inject = ['$scope', '$http'];

	function Directory($scope, $http){
		// $http.get('/api/employees').then(function(employees){
		// 	$scope.employees = employees.data;
		// });
		$scope.departments = getDepartments();
		$scope.employees = [{"name": "Patrick Thompson",
					"position": "Director",
					"email": "patrick.thompson@mwlecc.gov.jm",
					"extension": "2918",
					"cug": "876-564-0131"}];

		function getDepartments(){
			return [{"name": "Public Relations"},{"name": "ICT Division"},{"name":"Executive Management"},]
		}
	}
})();