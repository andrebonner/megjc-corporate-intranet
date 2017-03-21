(function() {
    'use strict';

    angular
        .module('mail')
        .controller('View', View);

    View.$inject = ['$scope', '$routeParams','mailService', 'loginService']

    /* @ngInject */
    function View($scope, $routeParams, mailService, loginService) {
        var vm = this
        vm.revealAction = vm.revealFollowup = vm.showFollowupDate = false
        vm.revealActionForm = revealActionForm
        vm.cancel = cancel
        vm.createAction = createAction
        vm.revealFollowupForm = revealFollowupForm
        vm.revealFollowupDate = revealFollowupDate
        vm.closeFollowup = closeFollowup
        activate()

        function activate() {
          mailService
            .getMail($routeParams.id)
            .then(function (mail) {
              vm.mail_corr = mail.mail
              vm.actions = mail.actions
              vm.follow_up_date = new Date(vm.mail_corr.follow_date)
              vm.fileTitle = vm.mail_corr.file_title == 'none' ? false : true
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

        function revealFollowupForm() {
          vm.revealFollowup = !vm.revealFollowup
          vm.description = ''
        }

        function cancel() {
            vm.revealAction = false
            vm.description = ''
        }

        function revealFollowupDate() {
          vm.showFollowupDate = !vm.showFollowupDate
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

        function closeFollowup(){
          if(vm.followup_desc == '' || vm.followup_desc == null) return
          
          var mail = {
            mail_id: vm.mail_corr.id,
            uid: loginService.getUserId(),
            description: vm.followup_desc,
            follow_up: 1,
            closeFollowup: 1
          }
          mailService.createAction(mail).then(function(response){
            $scope.$broadcast('mailCreated')
            revealFollowupForm()
            activate()
          }).catch(function(error){

          })
        }
    }
})();
