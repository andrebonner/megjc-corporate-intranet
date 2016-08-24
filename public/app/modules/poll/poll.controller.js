(function(){
  angular
    .module('poll')
    .controller('Poll', Poll);

    Poll.$inject = ['$http', '$cookies'];

    function Poll($http, $cookies){
      var vm = this;
      vm.response = "ok";
      vm.processPoll = processPoll;
      vm.showResults = false;
      vm.showPoll = true;
      vm.viewResults = viewResults;
      vm.viewPoll = viewPoll;
      vm.showPollMessage = false;
      vm.dismiss = dismissAlert;

      getResponses();

      function processPoll(){
        var response = {
          poll_id: 1,
          answer: vm.response,
          session_id : $cookies.get('PHPSESSID')
        };

        $http.post('/intranet/api/v1/poll/responses', response)
              .then(function(response){
                vm.showPollMessage = true;
                vm.response = "ok";
                getResponses();
              }).catch(function(error){
                console.log('Erorr');
            });
      }

      function viewResults(){
        vm.showPollMessage = false;
        vm.showResults = true;
        vm.showPoll = false;
        getResponses();
      }

      function viewPoll(){
        vm.showResults = false;
        vm.showPoll = true;
        getResponses();
      }

      function dismissAlert(){ vm.showPollMessage = false; };

      function getResponses(){
        $http.get('/api/v1/poll/responses').then(function(response){
          vm.results = response.data;
        }).catch(function(error){
            vm.results = {};
        });
      }
    }
})();
