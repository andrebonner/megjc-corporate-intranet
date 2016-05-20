(function(){
    angular
        .module('blog')
        .controller('Blog', Blog);

    Blog.$inject = ['$scope', 'sharedServices'];

    function Blog($scope, sharedServices){
        $scope.notices = sharedServices.getNotices();
    }
})();