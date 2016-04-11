(function(){
    'use strict';
    angular
        .module('intranet')
        .filter('sanitize', sanitize);
   
    function sanitize($sce){
        return function(text){
            return $sce.trustAsHtml(text);
        }
    }

})();