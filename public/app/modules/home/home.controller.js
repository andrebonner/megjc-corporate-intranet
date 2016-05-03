(function(){
	'use strict';
	angular
	.module('home')
	.controller('Home', Home);

	Home.$inject = ['$scope', '$http', '$location', '$window', '$templateCache'];
	/**
	 * Home Controller
	 * @param {[type]} $scope    [description]
	 * @param {[type]} $http     [description]
	 * @param {[type]} $location [description]
	 */
	function Home($scope, $http, $location, $window, $templateCache){

		// $http.get('/api/v3/wordpress/?json=get_category_posts&slug=notices').then(function(data){
		// 	$scope.notices = data.data.posts;
		// });
		showNotices();
		// $window.google.load("feeds", "1");
		
		$http.get('http://rss2json.com/api.json?rss_url=http://jamaica-gleaner.com/feed/rss.xml').then(function(data){			
			if(data.data.errorMessage){
				
			}else{
				$scope.news = data.data.items.splice(0,3);
			}			
		});

		// $http.get('/api/v3/wordpress/?json=get_category_posts&slug=birthday').then(function(data){
		// 	$scope.birthdays = data.data.posts;
		// });

		$scope.goTo = function(path){
			$location.path('/' + path);
		}	

		$scope.clearCache = function(){
			$templateCache.removeAll();
		}

		function showNotices(){
			var len = 5,
				notices = [];
			while(len--){
				notices.push({"title": "HLTSTUEI's Occasional Paper Series", "time": "11:25pm"});
			}
			$scope.notices = notices;
		}
	}
})();
