(function(){
  angular
    .module('mail')
    .service('mailService', mailService);

    mailService.$inject = ['$http', 'API_URLS', 'loginService', 'Upload'];

    function mailService($http, API_URLS, loginService, Upload){
      var service = {
          getMailsByDepartmentId: getMailsByDepartmentId,
          getMail: getMail,
          createMail: createMail,
          initMail: initMail,
          getActions: getActions,
          getAttachments: getAttachments,
          createAction: createAction,
          uploadFile: uploadFile,
          updateMail: updateMail
      };
      /**
       * [uploadFile description]
       * @param  {[type]} file    [description]
       * @param  {[type]} mail_id [description]
       * @return {[type]}         [description]
       */
      function uploadFile(file, mail_id) {
        var url = API_URLS.base_url + 'upload/' + mail_id
        return Upload.upload({
          url: url,
          file: file
        }).then(function( response ){
            return response
        })
      }
      /**
       * Creates a mail correspondence.
       * @param  {[type]} mail [description]
       * @return {[type]}      [description]
       */
      function createMail(mail){
        if(mail.file_title === '' || mail.file_title == null)
						mail.file_title = 'none'

				if(mail.mail_type === 'other')
					mail.mail_type = mail.other_type

				if(mail.mail_type === 'cabinet_sub')
						mail.mail_type = 'cabinet sub'

         mail.created_by = loginService.getUserId();
         mail.dept_id = loginService.getDepartmentId();

         var url = API_URLS.base_url + 'mails';
         return $http
                  .post(url, mail)
                  .then(handleSuccess)
                  .catch(handleError);
        function handleSuccess(response) {
            return response
        }

        function handleError(error) {
           return error
        }
      }
      /**
       * Initializes an empty mail correspondence object
       * @return {[type]} [description]
       */
      function initMail(){
        return {
          mail_type: "letter",
  				sender: "",
  				receipent : "",
  				from_org: "",
  				subject: "",
          receipt_date: new Date(),
          file_title: ''
        }
      }
      /**
       * Get a mail correspondence by id.
       * @param  {[type]} id Id of a mail correspondence
       * @return {[type]}    [description]
       */
      function getMail (id) {
        var url = API_URLS.base_url + 'mails/' + id;
        return $http
                .get(url)
                .then(handleSuccess)
                .catch(handleError);
        function handleSuccess (response){
          return response.data;
        }
        function handleError (error) {
          return error;
        }
      }

      function getMailsByDepartmentId(dept_id) {
        var url = API_URLS.base_url + 'mails/departments/' + dept_id;
        return $http
                .get(url)
                .then(handleSuccess)
                .catch(handleError);
        function handleSuccess (response){
          return response.data;
        }
        function handleError (error) {
          return error;
        }
      }
      /**
       * Create a mail correspondence action
       * @param  {[type]} mail [description]
       * @return {[type]}      [description]
       */
      function createAction(mail) {
        var url = API_URLS.base_url + 'mails/' + mail.mail_id + '/actions'
        return $http
                  .post(url, mail)
                  .then(handleSuccess)
                  .catch(handleError);

        function handleSuccess(response) {
          return response.data
        }
        function handleError(error) {
          return error
        }
      }
      /**
       * Get all actions for a given mail correspondence by id
       * @param  {[type]} mail_id [description]
       * @return {[type]}         [description]
       */
      function getActions(mail_id){
        var url = API_URLS.base_url + 'mails/' + mail_id + '/actions'
        return $http
                  .get(url)
                  .then(handleSuccess)
                  .catch(handleError);

        function handleSuccess (response){
          return response.data
        }

        function handleError (error) {
          return error
        }
      }
      /**
       * Get file attachments by mail correspondence id.
       * @param  {[type]} id Mail correspondence id.
       * @return {[type]}    [description]
       */
      function getAttachments ( id ) {
          var url = API_URLS.base_url + 'mails/' + id + '/attachments'
          return $http
                  .get(url)
                  .then(handleSuccess)
                  .catch(handleError);

          function handleSuccess( response ) {
            return response.data
          }

          function handleError ( error ) {
            return error
          }
      }
      /**
       * [updateMail description]
       * @param  {[type]} mail [description]
       * @return {[type]}      [description]
       */
      function updateMail( mail ) {
        var url = API_URLS.base_url + 'mails/' + mail.id
        mail.created_by = loginService.getUserId()
        mail.uname = loginService.getUserName()
        return $http
                .put(url, mail)
                .then(handleSuccess)
                .catch(handleError);

        function handleSuccess( response ) {
          return response.data
        }

        function handleError ( error ) {
          return error
        }
      }

      return service;
    }
})();
