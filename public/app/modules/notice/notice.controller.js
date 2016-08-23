/**
 * Created by captain-kirk on 4/18/16.
 */
(function(){
    angular
        .module('notice')
        .controller('Notice', Notice);

    Notice.$inject = ['$routeParams', 'sharedServices'];

    function Notice($routeParams, sharedServices){
        var vm = this;
        getNotices();

        function getNotices(){
    			sharedServices.getPostsByCategory('staff-notice').then(function(notices){
    				 vm.notices = notices.splice(0,5);
    			}).catch(function(error){
    				vm.notices = [];
    			})
    		};

        sharedServices.getPostBySlug($routeParams.slug).then(function(notice){
          vm.notice = notice;
        }).catch(function(error){
            vm.notice = {};
        });
    }
})();
