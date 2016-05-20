(function(){
    angular
        .module('content')
        .controller('Content', Content);

    Content.$inject = ['$scope', 'sharedServices'];

    function Content($scope, sharedServices) {
        $scope.notices = sharedServices.getNotices();
    }
})();
