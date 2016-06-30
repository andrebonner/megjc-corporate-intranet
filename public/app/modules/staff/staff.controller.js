(function(){
    'use strict';
    angular
        .module('staff')
        .controller('Staff', Staff);

    Staff.$inject = ['$scope', 'sharedServices'];

    function Staff($scope, sharedServices){
        $scope.notices = sharedServices.getNotices();
    }
})();
