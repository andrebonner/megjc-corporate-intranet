(function(){
	'use strict';

	angular
		.module('shared-services',[])
		.factory('sharedServices', sharedServices);

		sharedServices.$inject = ['$http', '$location'];
		/**
		 * 
		 * @param  {[type]} $http [description]
		 * @return {[type]}       [description]
		 */
		function sharedServices($http, $location){
			var services = {
				goTo: goTo,
				getNotices: getNotices

			};
			/**
			 * Get all notices
			 * @return {[type]} List of notices
			 */
			function getNotices(){				
				return [{
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
			}

			function goTo(path){
				var page = '#/' + path;
				$location.path(path);
			}

			return services;
		}
})();