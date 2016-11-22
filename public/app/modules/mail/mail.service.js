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
          createAction: createAction,
          uploadFile: uploadFile
      };

      function uploadFile(file, mail_id) {
        var url = API_URLS.base_url + mail_id + '/upload'
        return Upload.upload({
          url: url,
          file: file
        }).then(handleSuccess)
          .catch(handleError);

        function handleSuccess(response) {
          return response.data
        }

        function handleError(error) {
          return error
        }
      }
      /**
       * Creates a mail correspondence.
       * @param  {[type]} mail [description]
       * @return {[type]}      [description]
       */
      function createMail(mail){
         mail.created_by = loginService.getUserId();
         mail.dept_id = loginService.getDepartmentId();
         var url = API_URLS.base_url + 'mails';
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
        //  return	Upload.upload({
       // 					 url: url,
       // 					 file: files,
       // 					 data: mail
   		// 	      }).then(handleSuccess)
        //         .catch(handleError);

          function handleSuccess(response) {
            return response.data;
          }
          function handleError(error) {
            return error;
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

      return service;
    }
})();
