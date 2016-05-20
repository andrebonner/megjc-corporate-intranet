(function(){
	'use strict';
	angular
	.module('home')
	.controller('Home', Home);


	Home.$inject = ['$scope', '$http', '$location', '$window', 'sharedServices'];
	/**
	 * Home Controller
	 * @param {[type]} $scope    [description]
	 * @param {[type]} $http     [description]
	 * @param {[type]} $location [description]
	 */
	function Home($scope, $http, $location, $window, sharedServices){
		$scope.notices = sharedServices.getNotices();

		$http.get('http://rss2json.com/api.json?rss_url=http://jamaica-gleaner.com/feed/rss.xml').then(function(data){
			if(data.data.errorMessage){

			}else{
				$scope.news = data.data.items.splice(0,3);
			}
		});

		$scope.goTo = function(path){
			if(path === 'jobs') $window.open('http://www.osc.gov.jm/OSC_vacancies.html', '_blank');
			else $location.path('#/' + path);
		};
		/**
		 * Show list of notices
		 * @return {[type]} [description]
		 */
		$scope.getNotices = function(){
        	sharedServices.goTo('notices');
        }
	}
})();
