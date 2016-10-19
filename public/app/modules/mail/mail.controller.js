(function(){
	angular
	.module('mail')
	.controller('Mail', Mail);

	Mail.$inject = ['$routeParams', '$location', '$scope','mailService', 'loginService'];

	function Mail($routeParams, $location, $scope, mailService, loginService){
			$scope.mail = mailService.initMail();
			var blank = angular.copy($scope.mail);
			$scope.showMail = show;
			$scope.goTo = goTo;
			$scope.createMail = createMail;
			$scope.message = false;
			$scope.dimiss = dimiss;
			$scope.removeFile = removeFile;
			$scope.clearForm = clearForm;
			$scope.createMail = createMail;
			getMails();

			if($routeParams.id){
				show($routeParams.id);
			}
			/**
			 * Clears form.
			 * @return {[type]} [description]
			 */
			function clearForm(){
				$scope.file = [];
				$scope.mail = angular.copy(blank);
				$scope.mailForm.$setPristine();
				$scope.mailForm.$setValidity();
    		$scope.mailForm.$setUntouched();
			}
			/**
			 * Show details of mail.
			 * @param  {[type]} id Id of a mail correspondence.
			 */
			function show (id){
				//vm.mail = mailService.getMail(id);
				// $location.path('/mails/' + id + '/view');
				mailService
					.getMail(id)
					.then(function(mail){
						vm.mail = mail;
					}).catch(function(error){
						vm.mail = {};
					});
			}
			/**
			 * Get all mails created by a user.
			 * @return {[type]} [description]
			 */
			function getMails (){
				var uid = loginService.getUser();
				mailService
					.getMails(uid)
					.then(function(mails){
						$scope.mails = mails;
					}).catch(function(error){
						$scope.mails = [];
					})
			}

			function goTo (path){
				$location.path('/' + path);
			}
			/**
			 * Creates a mail correspondence.
			 * @param  {[type]} mail [description]
			 * @return {[type]}      [description]
			 */
			function createMail(){
				if($scope.file && $scope.file.length > 0){
						var files = $scope.file[0];
						$scope.mail.file_title = "none";
						mailService.createMail($scope.mail, files).then(function(res){
							console.log(res);
							clearForm();
							$scope.message = true;
						}).catch(function(err){

						});
				}
			}
			/**
			 * Dimisses a success or error alert.
			 * @return {[type]} [description]
			 */
			function dimiss(){
				$scope.message = false;
			}
			/*d list
			 * @param  {[type]} file [description]
			 * @return {[type]}      [description]
			 */
			function removeFile(){
				$scope.files = [];
			}
			/**
			 * Initials form
			 * @return {[type]} [description]
			 */
			function initForm() {
					$scope.mail = {
					 mail_type : "letter",
					 file_title : "none"
				 };
				 //$scope.mailForm.$setPristine();
			}
	}
})();
