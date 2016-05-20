/**
 * Created by captain-kirk on 4/18/16.
 */
(function(){
    angular
        .module('notice')
        .controller('Notice', Notice);

    Notice.$inject = ['$scope', 'sharedServices'];
    /**
     * 
     * @param {[type]} $scope         [description]
     * @param {[type]} sharedServices [description]
     */
    function Notice($scope, sharedServices){
        $scope.notices = sharedServices.getNotices();
        
        $scope.getNotices = function(){
        	sharedServices.goTo('notices');
        }
    }
})();