(function(){
	'use strict';

	angular
	.module('intranet')
	.factory('rssService', rssService);

	rssService.inject = ['$http'];

	function rssService($http){
		var service = {
			getRss : getRss
		};

		return service;

		function getRss(){
			var base_url = 'http://rss2json.com/api.json?rss_url=';
			var feed_url = 'http://www.jamaicaobserver.com/rss/news/';
			var abs_url = base_url + encodeURI(feed_url);

			$http.get(abs_url).then(function(data){
				console.log(data.data.items.slice(0,3));
				$scope.news = data.data.items.slice(0,3);
				
				// var top_news = data.items.slice(0,3);
				// console.log(top_news);
			});	
		}
	}

})();