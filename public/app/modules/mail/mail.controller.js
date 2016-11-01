(function(){
	angular
	.module('mail')
	.controller('Mail', Mail);

	Mail.$inject = ['$routeParams', '$location', '$scope','mailService', 'loginService' , 'API_URLS'];

	function Mail($routeParams, $location, $scope, mailService, loginService, API_URLS){
			$scope.message = false;
			$scope.showOther = false;
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
						$scope.mail = mail.mail;
						$scope.uploads = mail.uploads;
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
				//var uid = loginService.getUser();
				var dept_id = loginService.getDepartmentId();
				mailService
					.getMails(dept_id)
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
				if($scope.mail.file_title === '' || $scope.mail.file_title == null){
						$scope.mail.file_title = 'none';
				}
				if($scope.file && $scope.file.length > 0){
						var files = $scope.file[0];
				}
				mailService
					.createMail($scope.mail, files)
					.then(function(res){
						clearForm();
						$scope.message = true;
						getMails();
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

			function removeFile(){
				$scope.files = [];
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
	}
})();
