(function(){
	'use strict';
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

		// $http.get('/api/v3/wordpress/?json=get_category_posts&slug=notices').then(function(data){
		// 	$scope.notices = data.data.posts;
		// });
		$scope.notices = showNotices();
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
			var notices = [{
				'title': 'JSCA 97th Birthday Celebration',
				'description': 'Please see flyer attached regarding JCSA 97th Birthday Celebration.Heads of Divisions/Departments and Units please bring this information to the attention of your team members',
				'time': 'Fri, 29 Apr 1:49pm'  
			},{
				'title': 'JPS Power Surges and Subsequent Outage',
				'description' : '',
				'time': 'Wed, 4 May 7:00am'
			},{
				'title' : 'CSW Magazine Page 1 May Issue',
				'description': 'Please see the attached Civil Service Week (CSW)2016 Magazine Page 1, May Issue for your information.Heads of Divisions/Departments and Units please bring this information to the attention of your team members.',
				'time': 'Tues, 3 May 1:39pm'
			}];
			return notices;
		}		
	}
})();
