/**
 * Created by captain-kirk on 4/18/16.
 */
(function () {
    angular
        .module('birthday')
        .controller('Birthday', Birthday);

    Birthday.$inejct = ['$scope', '$http'];

    function Birthday($scope, $http){
        $scope.date = Date.now();

        $http.get('/api/employees/birthday').then(function(data){
            $scope.birthdays = data.data;
        });
    }
})();
