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
        vm.councils = [
          {name: 'Clarendon', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Manchester', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Saint Ann', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Trelawny', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Saint Elizabeth', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Saint James', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Portmore Municipal', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Saint Catherine', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Saint Mary', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Westmoreland', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Hanover', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Portland', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Saint Thomas', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
          {name: 'Kingston & Saint Andrew', balance: 2101500, allocation: 9900000, total: 12001500, expenses: 9830000, acc_bal: 2171500},
        ]

        vm.transactions = [
          {created: 'Mar 17, 2008', particular: 'Clarendon Parish Council', trans_type: 'Allocation', amount: 300000}
        ]

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
