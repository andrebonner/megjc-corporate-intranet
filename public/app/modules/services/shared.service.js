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
				getPostBySlug: getPostBySlug,
				getPostsByCategory: getPostsByCategory,
				getPostById:getPostById,
				isAuth: isAuth
			};

			function goTo(path){
				$location.path('#/'+path);
			}

      function isAuth(){
      	return $http.get('/api/v1/auth/user')
      				.then(handleSuccess)
      				.catch(handleError);
      	function handleSuccess(response){ return response.data; }
      	function handleError(error){ return error; }
      }

			function getPostsByCategory(category){
        return $http.get(apiBaseUrl + '/get_category_posts?slug=' + category)
                    .then(handleSuccess)
                    .catch(handleError);
        function handleSuccess(response){ return response.data.posts; }
        function handleError(error){ return error; }
      }

			function getPostById(id){
				return $http.get(apiBaseUrl + '/get_post?id=' + id)
										.then(handleSuccess)
										.catch(handlError);
				function handleSuccess(response){ return response.data.post; }
				function handlError(error) { return error; }
			}

			function getPostBySlug(slug){
        return $http.get(apiBaseUrl + '/get_post/?slug=' + slug)
                    .then(handleSuccess)
                    .catch(handleError);
        function handleSuccess(response){ return response.data.post};
        function handleError(error) {return error; }
      }

	  return services;
	}
})();
