(function(){
	angular
	.module('home')
	.controller('Home', Home);

	Home.$inject = ['$scope', '$http', '$location'];
	/**
	 * Home Controller
	 * @param {[type]} $scope    [description]
	 * @param {[type]} $http     [description]
	 * @param {[type]} $location [description]
	 */
	function Home($scope, $http, $location){
		$http.get('/api/news?limit=three').then(function(data){			
			$scope.news = data.data;
		});

		$http.get('/api/notices').then(function(data){
			$scope.notices = data.data;
		});

		$http.get('/api/employees/birthday').then(function(data){
			$scope.birthdays = data.data;
		});

		$scope.goTo = function(path){
			$location.path('/' + path);
		}
	}
})();
