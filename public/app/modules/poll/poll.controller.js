(function(){
  angular
    .module('poll')
    .controller('Poll', Poll);

    function Poll(){
      var vm = this;
      vm.response = "ok";
      vm.processPoll = processPoll;
      vm.showResults = false;
      vm.showPoll = true;
      vm.viewResults = viewResults;
      vm.viewPoll = viewPoll;
      //vm.showMessage = showMessage;

      function processPoll(){
        console.log(vm.response);
      }

      function viewResults(){
        vm.showResults = true;
        vm.showPoll = false;
      }

      function viewPoll(){
        vm.showResults = false;
        vm.showPoll = true;
      }
    }
})();
