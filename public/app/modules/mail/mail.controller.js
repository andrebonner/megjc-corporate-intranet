(function(){
	angular
	.module('mail')
	.controller('Mail', Mail);

	Mail.$inject = ['$routeParams', '$location', '$scope','mailService', 'loginService' , 'API_URLS'];

	function Mail($routeParams, $location, $scope, mailService, loginService, API_URLS){
			$scope.message = false;
			$scope.showOther = false;
			$scope.revealAction = false;
			$scope.mail = mailService.initMail();
			var blank = angular.copy($scope.mail);
			$scope.showMail = show;
			$scope.goTo = goTo;
			$scope.createMail = createMail;
			$scope.dimiss = dimiss;
			$scope.removeFile = removeFile;
			$scope.clearForm = clearForm;
			$scope.createMail = createMail;
			$scope.toggle = toggle;
			$scope.root = API_URLS.root;
			$scope.createAction = createAction;
			$scope.revealActionForm = revealActionForm
			$scope.cancel = cancel
			$scope.uploadFile = uploadFile
			$scope.file = []
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
				mailService
					.getMail(id)
					.then(function(mail){
						$scope.mail_corr = mail.mail;
						$scope.uploads = mail.uploads
						$scope.actions = mail.actions
						$location.path('/mails/' + id + '/view')
					}).catch(function(error){
						$scope.mail = {};
					});
			}
			/**
			 * Get all mails created by a user.
			 * @return {[type]} [description]
			 */
			function getMails (){
				var dept_id = loginService.getDepartmentId();
				mailService
					.getMailsByDepartmentId(dept_id)
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
				if($scope.mail.file_title === '' || $scope.mail.file_title == null)
						$scope.mail.file_title = 'none'

				if($scope.mail.mail_type === 'other')
					$scope.mail.mail_type = $scope.mail.other_type

				mailService
					.createMail($scope.mail)
					.then(function(res){
						clearForm();
						$scope.message = true;
						getMails()
				}).catch(function(err){
					 console.log('Error in creating mail');
				});
			}
			/**
			 * Dimisses a success or error alert.
			 * @return {[type]} [description]
			 */
			function dimiss(){
				$scope.message = false;
			}
			/**
			 * Clears file upload array
			 * @return {[type]} [description]
			 */
			function removeFile(){
				$scope.file = []
			}
			/**
			 * Toggles text field to accept other mail type.
			 * @param  {[type]} mail_type The type of mail correspondence.
			 * @return {[type]}           [description]
			 */
			function toggle(mail_type){
				switch (mail_type) {
						case 'other': $scope.showOther = true;
													$scope.showFile = false;
						break;
						case 'file': $scope.showFile = true;
													$scope.showOther = false;
						break;
						default: $scope.showOther = false;
										 $scope.showFile = false;
					}
			}
			/**
			 * Toggles mail action form
			 * @return {[type]} [description]
			 */
			function revealActionForm() {
				$scope.revealAction = !$scope.revealAction
			}
			/**
			 * Clears and hides mail action form
			 * @return {[type]} [description]
			 */
			function cancel() {
					$scope.revealAction = false
					$scope.description = ''
			}
			/**
			 * Creates an action for a mail correspondence
			 * @param  {[type]} mail_id [description]
			 * @return {[type]}         [description]
			 */
			function createAction(mail_id){
				var mail = { mail_id : $scope.mail_corr.id,
										 uid: loginService.getUserId(),
									   description: $scope.description
									 }
				mailService
					.createAction(mail)
					.then(function(response){
						cancel()
						getActions($scope.mail_corr.id)
					}).catch(function(error){
						//show error message
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
						$scope.actions = actions
					}).catch(function(error){
						$scope.actions = []
					});
			}
			/**
			 * Uploads a file associated with a mail correspondence
			 * @return {[type]} [description]
			 */
			function uploadFile() {
				if($scope.file && $scope.file.length > 0){
						var files = $scope.file[0];
						mailService
							.uploadFile(files, $scope.mail_corr.id)
							.then(function(response){
								 console.log('file uploaded')
							}).catch(function(error){
								console.log('file upload error')
							})
				}
			}
	}
})();
