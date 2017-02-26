(function() {
    'use strict';

    angular
        .module('trans')
        .controller('Trans', Trans);

    Trans.$inject = ['$location', '$routeParams', 'transService'];

    /* @ngInject */
    function Trans( $location, $routeParams, transService) {
        var vm = this
        vm.goTo = goTo
        vm.loading = true
        vm.show = show
        vm.update = update
        vm.create = create
        vm.message =  {
          show: false,
          message: ''
        }
        vm.councils = []
        activate()

        function activate() {
          if($routeParams.id){
            transService
              .getTransaction( $routeParams.id )
              .then(function (transaction) {
                vm.transaction = transaction
              }).catch(function () {
                vm.transaction = {}
              })
          }else{
            transService
              .getTransactions()
              .then(function (transactions) {
                 vm.transactions = transactions
              }).catch(function (error) {
                vm.transactions = []
              }).finally(function () {
                vm.loading = false
              })
          }
        }

        function goTo( path ) {
          $location.path( path )
        }

        function show( id ) {
          $location.path( '/dashboard/truck-allo/transactions/' + id + '/view')
        }

        function update() {
          transService
            .updateTransaction(vm.transaction.particular, vm.transaction.id)
            .then(function (res) {
              vm.message.show = vm.message.success = true
              vm.message.text = 'Transaction updated successfully'
            }).catch(function () {
              console.log('Error')
            });
        }

        function create() {
          transService
            .createTransaction( vm.trans )
            .then(function (res) {
              vm.message.show = vm.message.success = true
              vm.message.text = 'Transaction created successfully'
            }).catch(function (err) {
              console.log('Error')
            })
        }
    }
})();
