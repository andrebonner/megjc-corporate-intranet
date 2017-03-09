(function() {
    'use strict';

    angular
        .module('mail')
        .controller('View', View);

    View.$inject = ['$routeParams','mailService', 'loginService']

    /* @ngInject */
    function View($routeParams, mailService, loginService) {
        var vm = this
        vm.revealAction = false
        vm.revealActionForm = revealActionForm
        vm.cancel = cancel
        vm.createAction = createAction
        activate();

        function activate() {
          mailService
            .getMail($routeParams.id)
            .then(function (mail) {
              vm.mail_corr = mail.mail
              vm.actions = mail.actions
            }).catch(function () {
              vm.mail_corr = []
            })
        }
        /**
         * Get actions by mail id
         * @return {[type]} [description]
         */
        function getActions(mail_id){
          mailService
            .getActions(mail_id)
            .then(function(actions){
              vm.actions = actions
            }).catch(function(error){
              vm.actions = []
            });
        }
        /**
         * Toggles mail action form
         * @return {[type]} [description]
         */
        function revealActionForm() {
          vm.revealAction = !vm.revealAction
        }

        function cancel() {
            vm.revealAction = false
            vm.description = ''
        }

        /**
         * Creates an action for a mail correspondence
         * @param  {[type]} mail_id [description]
         * @return {[type]}         [description]
         */
        function createAction(){
          var mail = { mail_id : vm.mail_corr.id,
                       uid: loginService.getUserId(),
                       description: vm.description
                     }
          mailService
            .createAction(mail)
            .then(function(response){
              cancel()
              getActions(vm.mail_corr.id)
            }).catch(function(error){
              //show error message
            })
        }
    }
})();
