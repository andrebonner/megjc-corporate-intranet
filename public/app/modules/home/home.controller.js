(function(){
	'use strict';
	angular
	.module('home')
	.controller('Home', Home);

	Home.$inject = ['$http', '$location', '$window', '$routeParams', 'homeService', 'sharedServices'];
	/**
	 * Home Controller
	 * @param {[type]} $scope    [description]
	 * @param {[type]} $http     [description]
	 * @param {[type]} $location [description]
	 * @param {[type]} $window
	 * @param {[type]} sharedServices
	 */
	function Home($http, $location, $window, $routeParams, homeService, sharedServices){
		var vm = this;
		//getVacancies();
		getLeadStory();
		getDidYouKnow();
		getRSSFeed();
		getStaffFocus();
		getBlogPosts();

		vm.goTo = goTo;
		//vm.getNotices = getNotices;
		vm.getBlogs = getBlogs;
		vm.getStaffFocus = getStaffFocus;

		function goTo(path){
			$location.path('#/' + path);
		};

		function getBlogs(){ sharedServices.goTo('blogs'); };

		function getStaffFocus(){ sharedServices.goTo('staff-focus'); };

		function getLeadStory(){
			homeService.getPostsByCategory('front-page').then(function(lead){
				vm.lead = lead.splice(0,1);
			}).catch(function(error){
				vm.lead = {};
			});
		}

		function getDidYouKnow(){
			homeService.getPostsByCategory('did-you-know').then(function(advice){
				 vm.advices = advice.splice(0,3);
			}).catch(function(error){
				vm.advices = [];
			});
		}

		function getRSSFeed(){
			homeService.getRSSFeed().then(function(items){
				 vm.news = items.splice(0,3);
			}).catch(function(error){
				vm.news = [];
			})
		}

		function getStaffFocus(){
			homeService.getPostsByCategory('staff-focus').then(function(staff){
				 vm.staff = staff.splice(0,5);
			}).catch(function(error){
				vm.staff = [];
			});
		}

		function getBlogPosts(){
			homeService.getPostsByCategory('blog').then(function(blogs){
				 vm.blogs = blogs.splice(0,5);
			}).catch(function(error){
				vm.blogs = [];
			})
		}
	}
})();
