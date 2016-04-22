(function(){
	angular
	.module('home')
	.controller('Home', Home);

	Home.$inject = ['$scope', '$http', '$location', 'API_ROUTE'];
	/**
	 * Home Controller
	 * @param {[type]} $scope    [description]
	 * @param {[type]} $http     [description]
	 * @param {[type]} $location [description]
	 */
	function Home($scope, $http, $location, API_ROUTE){

		$http.get('/api/v3/wordpress/?json=get_category_posts&slug=notices').then(function(data){
			$scope.notices = data.data.posts;
		});

		// $http.get('/api/notices').then(function(data){
		// 	$scope.notices = data.data;
		// });
        //
		$http.get('/api/v3/wordpress/?json=get_category_posts&slug=birthday').then(function(data){
			console.log(data.data.posts);
			$scope.birthdays = data.data.posts;
		});

		$scope.goTo = function(path){
			$location.path('/' + path);
		}
	}
})();
