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
			var apiBaseUrl = "/wordpress/api/";
			var services = {
				goTo: goTo,
				getVacancies: getVacancies,
				getVacancyBySlug: getVacancyBySlug
			};

			function goTo(path){
				$location.path('#/'+path);
			}

			/**
       * Gets all vacancies
       * @return {[type]} [description]
       */
      function getVacancies(){
        return $http.get(apiBaseUrl + '/get_category_posts?slug=vacancies')
                    .then(handleSuccess)
                    .catch(handleError);
        function handleSuccess(response){ return response.data.posts; }
        function handleError(error){ return error; }
      }

      function getVacancyBySlug(slug){
        return $http.get(apiBaseUrl + '/get_post/?slug=' + slug)
                    .then(handleSuccess)
                    .catch(handleError);
        function handleSuccess(response){ return response.data.post};
        function handleError(response) {return error; }
      }

			return services;
		}
})();
