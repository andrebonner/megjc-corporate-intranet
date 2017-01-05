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
          getMails: getMails,
          update:update,
          getActionTypes: getActionTypes
      };

      function getMails() {
        var currentTime = (new Date()).getTime(),
            token = loginService.getToken(),
            url = API_URLS.base_url + 'mails',
            header = {'Authorization': token}

        if(token){
          return $http
                  .get(url, {headers: header })
                  .then(handleSuccess)
                  .catch(handleError)
          function handleError(error) {
            return error
          }
          function handleSuccess(response) {
            return response.data
          }
        }
      }

      /**
       * Get a mail correspondence by id.
       * @param  {[type]} id Id of a mail correspondence
       * @return {[type]}    [description]
       */
      function getMail( id ){
        var token = loginService.getToken(),
            header = {'Authorization': token},
            url = API_URLS.base_url + 'mails/' + id

        return $http
                .get(url, {headers: header})
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
         var url = API_URLS.base_url + 'mails',
             token = loginService.getToken(),
             header = {'Authorization': token}

         return $http
                  .post(url, mail, {headers: header})
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
      function createAction( mail ) {
        var url = API_URLS.base_url + 'mails/' + mail.mail_id + '/actions',
            token = loginService.getToken(),
            header = {'Authorization': token}

        return $http
                  .post(url, mail, {headers: header})
                  .then(handleSuccess)
                  .catch(handleError);

        function handleSuccess( response ) {
          return response.data
        }

        function handleError( error ) {
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
       * Updates a mail correspondence
       * @param  {[type]} mail [description]
       * @return {[type]}      [description]
       */
      function update(mail){
        var url = API_URLS.base_url + 'mails/' + mail.id,
            token = loginService.getToken(),
            header =  { 'Authorization': token}

        return $http
                  .put(url, mail, {headers: header})
                  .then(handleSuccess)
                  .catch(handleError);

        function handleSuccess(response) {
            return response.data
        }
        function handleError(error) {
          return error;
        }
      }

      function getActionTypes(){
        var url = API_URLS.base_url + 'admin/actions/types'

        return $http
                  .get(url)
                  .then(handleSuccess)
                  .catch(handleError);

        function handleSuccess(response){
          return response.data
        }
        function handleError(error) {
           return error
        }
      }

      return service;
    }
})();
