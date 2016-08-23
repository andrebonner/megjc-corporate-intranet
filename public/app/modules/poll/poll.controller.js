(function(){
  angular
    .module('poll')
    .controller('Poll', Poll);

    Poll.$inject = ['$http'];

    function Poll($http){
      var vm = this;
      vm.response = "ok";
      vm.processPoll = processPoll;
      vm.showResults = false;
      vm.showPoll = true;
      vm.viewResults = viewResults;
      vm.viewPoll = viewPoll;
      vm.showPollMessage = false;
      vm.dismiss = dismissAlert;

      $http.get('/api/v1/poll/responses').then(function(response){
        vm.results = response.data;
      }).catch(function(error){
          vm.results = {};
      });
      
      function processPoll(){
        $http.post('/api/v1/poll/responses', {poll_id: 1, response: vm.response})
              .then(function(response){
                vm.showPollMessage = true;
              }).catch(function(error){
                console.log('Erorr');
              });
      }

      function viewResults(){
        vm.showPollMessage = false;
        vm.showResults = true;
        vm.showPoll = false;

      }

      function viewPoll(){
        vm.showResults = false;
        vm.showPoll = true;
      }

      function dismissAlert(){ vm.showPollMessage = false; };
    }
})();
