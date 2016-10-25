(function(){
  angular
    .module('mail')
    .service('mailService', mailService);

    mailService.$inject = ['$http', 'API_URLS', 'loginService', 'Upload'];

    function mailService($http, API_URLS, loginService, Upload){
      var service = {
          getMails: getMails,
          getMail: getMail,
          createMail: createMail,
          initMail, initMail
      };
      /**
       * Creates a mail correspondence.
       * @param  {[type]} mail [description]
       * @return {[type]}      [description]
       */
      function createMail(mail, files){
         mail.created_by = loginService.getUser();

         return	Upload.upload({
       					 url: '/api/v1/mails',
       					 file: files,
       					 data: mail
   			      }).then(handleSuccess)
                .catch(handleError);

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
        return $http
                .get('/api/v1/mails/' + id)
                .then(handleSuccess)
                .catch(handleError);
        function handleSuccess (response){
          return response.data;
        }
        function handleError (error) {
          return error;
        }
      }

      function getMails(uid) {
        return $http
                .get('/api/v1/mails/users/' + uid)
                .then(handleSuccess)
                .catch(handleError);
        function handleSuccess (response){
          return response.data;
        }
        function handleError (error) {
          return error;
        }
      }
      return service;
    }
})();
