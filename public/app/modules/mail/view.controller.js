(function() {
    'use strict';

    angular
        .module('mail')
        .controller('View', View);

    View.$inject = ['$scope','$routeParams','mailService']

    /* @ngInject */
    function View($scope, $routeParams, mailService) {
        var vm = this;

        activate();

        function activate() {
          mailService
            .getMail($routeParams.id)
            .then(function (mail) {
              $scope.mail_corr = mail.mail
              $scope.actions = mail.actions
            }).catch(function () {
              $scope.mail_corr = []
            })
        }
    }
})();
