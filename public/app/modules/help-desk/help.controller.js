(function(){
	angular
	.module('help')
	.controller('HelpDesk', HelpDesk);

	HelpDesk.$inject = ['$scope', '$http'];

	function HelpDesk($scope, $http){
		$scope.issue = {};
		$scope.open_tickets = true;
		$scope.closed_tickets = false;
		$scope.create_ticket = false;
		$scope.all_tickets = false;
		$scope.isSubmitted = false;
		$scope.message = false;

		var issues = [];		
		$scope.open_issues = getIssues();

		$scope.submitIssue = function(){
			$scope.isSubmitted = true;
			$scope.issue.date = Date.now();
			$scope.issue.assignee = "zeus";
			$scope.issue.status = "Forwared to Help Desk";	
			createIssue($scope.issue);		
		}

		function getIssues(){
			console.log(JSON.parse(localStorage.getItem('issues')));
			return JSON.parse(localStorage.getItem('issues'));
		}

		function ticketsCount(){
			
		}

		function createIssue(issue){
			issues = JSON.parse(localStorage.getItem('issues'));
			issues.push(issue);
			localStorage.setItem('issues', JSON.stringify(issues));
			$scope.open_tickets = !$scope.open_tickets;
			$scope.create_ticket = !$scope.create_ticket;
			$scope.message = !$scope.message;
			$scope.open_issues = getIssues();
		}

		$scope.messageDismiss = function(){
			$scope.message = !$scope.message;
		}

		$scope.toggle = function(ticket){
			switch(ticket){
				case 'open-tickets': console.log('open')
				break;
				case 'create-ticket': $scope.create_ticket = !$scope.create_ticket;
									  $scope.open_tickets = !$scope.open_tickets;										
				break;
				case 'closed-tickets': console.log('closed')
				break;
				case 'all-tickets': console.log('all')
				break;
			}
		}


	}
})();