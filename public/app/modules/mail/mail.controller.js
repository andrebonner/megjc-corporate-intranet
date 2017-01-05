(function(){
	angular
	.module('mail')
	.controller('Mail', Mail);

	Mail.$inject = ['$routeParams', '$location', '$scope','mailService', 'loginService' , 'API_URLS', 'Upload'];

	function Mail($routeParams, $location, $scope, mailService, loginService, API_URLS, Upload){
			$scope.message = {
					show: false,
					body: ''
			}
			$scope.showOther = false;
			$scope.file_upload_msg = false
			$scope.revealAction = false;
			$scope.mail = mailService.initMail();
			var blank = angular.copy($scope.mail);
			$scope.showMail = show;
			$scope.goTo = goTo;
			$scope.createMail = createMail;
			$scope.removeFile = removeFile;
			$scope.clearForm = clearForm;
			$scope.createMail = createMail;
			$scope.toggle = toggle;
			$scope.root = API_URLS.root
			$scope.createAction = createAction;
			$scope.revealActionForm = revealActionForm
			$scope.cancel = cancel
			$scope.uploadFile = uploadFile
			$scope.file = []
			$scope.logout = logout
			$scope.update = updateMail

			getMails();
			getActionTypes()

			if($routeParams.id){
				if($location.path().indexOf('view') != -1)
					show($routeParams.id, 'view')

				if($location.path().indexOf('edit') != -1)
					show($routeParams.id, 'edit')
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
			 * Show details of a mail correspondence.
			 * @param  {[type]} id Id of a mail correspondence.
			 */
			function show ( id, action ){
				mailService
					.getMail(id)
					.then(function(mail){
						$scope.mail_corr = mail.mail
						if(action == 'edit'){
							$scope.mail_corr.receipt_date = new Date(mail.mail.receipt_date)
							$scope.mail_corr.mail_date = new Date(mail.mail.mail_date)
						}
						$scope.uploads = mail.uploads
						$scope.actions = mail.actions
						$location.path('/mails/' + id + '/' + action)
					}).catch(function(error){
						$scope.mail = {}
					});
			}
			/**
			 * Get all mails created by a user.
			 * @return {[type]} [description]
			 */
			function getMails (){
				mailService.getMails().then(function(mails){
					$scope.mails = mails
				}).catch(function(error){
					$scope.mails = []
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

				if($scope.mail.mail_type === 'cabinet_sub')
						$scope.mail.mail_type = 'cabinet sub'

				mailService
					.createMail($scope.mail)
					.then(function(res){
						clearForm()
						$scope.message.show = true
						$scope.message.body = 'Mail correspondence successfully created.'
						getMails()
				}).catch(function(err){
					 console.log('Error in creating mail')
				});
			}
			/**
			 * Dimisses a success or error alert.
			 * @return {[type]} [description]
			 */
			function dismiss( alert_id ){
				switch (alert_id) {
					case 'file_upload_msg': $scope.file_upload_msg = !$scope.file_upload_msg;
						break;
						case 'message': $scope.message = !$scope.message;
							break;
				}
				//$scope.message = false;
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
									   description: $scope.description,
										 type_id: $scope.action_type.id
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
						var files = $scope.file[0],
								url = API_URLS.base_url + 'upload/' + $scope.mail_corr.id
						mailService
								.uploadFile( files, $scope.mail_corr.id )
								.then(function ( response ){
									//dismiss( 'file_upload_msg' )
									removeFile()
									getAttachments()
									getActions( $scope.mail_corr.id )
								})
				}
			}
			/**
			 * Get all attachments for a given mail correspondence by id
			 * @return {[type]} [description]
			 */
			function getAttachments() {
				var id = $scope.mail_corr.id
				mailService
						.getAttachments( id )
						.then(function ( attachments ){
								$scope.uploads = attachments
						}).catch(function ( error ){
								console.log('Error in getting attachments')
						})
			}
			/**
			 * Logs out a user
			 * @return {[type]} [description]
			 */
			function logout() {
				loginService.logout()
				$location.path('/login')
			}
			/**
			 * Updates a mail correspondence
			 * @return {[type]} [description]
			 */
			function updateMail(){
				mailService
					.update($scope.mail_corr)
					.then(function(res){
						$scope.message.show = true
						$scope.message.body = 'Mail correspondence successfully updated.'
					}).catch(function(error){
						$scope.message = true;
						$scope.message.body = "We are experiencing an error at this time."
					})
			}

			function getActionTypes() {
				mailService
						.getActionTypes()
						.then(function(action_types){
							$scope.action_type = action_types[0]
							$scope.action_types = action_types
						}).catch(function(error){
							console.log('error in getting action types')
						})
			}
	}
})();
