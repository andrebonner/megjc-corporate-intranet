(function(){
	angular
	.module('home')
	.controller('Home', Home);

	Home.$inject = ['$scope', '$http', '$location', '$templateCache'];
	/**
	 * Home Controller
	 * @param {[type]} $scope    [description]
	 * @param {[type]} $http     [description]
	 * @param {[type]} $location [description]
	 */
	function Home($scope, $http, $location, $templateCache){

		$http.get('/api/v3/wordpress/?json=get_category_posts&slug=notices').then(function(data){
			$scope.notices = data.data.posts;
		});

		$http.get('http://rss2json.com/api.json?rss_url=http://www.jamaicaobserver.com/rss/news/').then(function(data){			
			//console.log(data.data.items.splice(0,3));
			$scope.news = data.data.items.splice(0,3);
		});

		$http.get('/api/v3/wordpress/?json=get_category_posts&slug=birthday').then(function(data){
			$scope.birthdays = data.data.posts;
		});

		$scope.goTo = function(path){
			$location.path('/' + path);
		}	

		$scope.clearCache = function(){
			$templateCache.removeAll();
		}
	}
})();
