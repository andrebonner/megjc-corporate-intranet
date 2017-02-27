(function() {
    'use strict';

    angular
        .module('mail-mgmt')
        .controller('MailManager', MailManager);

    MailManager.$inject = ['$location', 'mailmgmtService'];

    /* @ngInject */
    function MailManager( $location, mailmgmtService) {
        var vm = this;
        vm.goTo = goTo
        vm.createMail = createMail
        vm.changedValue = changedValue
        vm.corr_types = [
          {id:1, title: "letter"},
          {id:2, title: "email"},
          {id:3, title: "file"},
          {id:4, title: "memo"},
          {id:5, title: "cabinet decision"},
          {id:6, title: "cabinet note"},
          {id:7, title: "cabinet submission"},
          {id:8, title: "invitation"},
          {id:9, title: "travel"}
        ]
        activate();

        function activate() {
          getIncoming()
          getOutgoing()
          getFollowUps()
        }

        function goTo( path ) {
          $location.path( path )
        }

        function createMail() {
          vm.mail.file_title = "blank"
          mailmgmtService.create( vm.mail )
        }

        function changedValue( value ) {
          console.log(value)
        }

        function getIncoming() {
          mailmgmtService
          .getByCategory(1)
          .then(function (res) {
             vm.incoming = res;
          }).catch(function (err) {
            console.log('Error')
          })
        }

        function getOutgoing() {
          mailmgmtService
          .getByCategory(2)
          .then(function (res) {
             vm.outgoing = res;
          }).catch(function (err) {
            console.log('Error')
          })
        }

        function getFollowUps() {
          // mailmgmtService
          // .getByCategory(1)
          // .then(function (res) {
          //    vm.incoming = res;
          // }).catch(function (err) {
          //   console.log('Error')
          // })
        }
    }
})();
