(function(){
	angular
	.module('directory')
	.controller('Directory', Directory);

	Directory.$inject = ['$scope', '$http'];

	function Directory($scope, $http){
		$http.get('/api/employees').then(function(employees){
			$scope.employees = employees.data;
		});
	}
})();