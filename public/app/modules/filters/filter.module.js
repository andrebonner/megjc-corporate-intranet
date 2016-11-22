(function(){
    'use strict';
    angular
        .module('intranet')
        .filter('sanitize', sanitize)
        .filter('removeEntities', removeEntities)
        .filter('timestamp', timestamp)
        .filter('toMB', toMB);

    function timestamp () {
      return function (dateString) {
        return new Date(dateString);
      }
    }

    function toMB(){
      return function(bytes){
        var result = bytes/1048576;
        return result.toFixed(2);
      }
    }

    function sanitize($sce){
        return function(text){
            return $sce.trustAsHtml(text);
        };
    }

    function removeEntities(){
            return function(text) {
                var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
                var translate = {
                    "nbsp": " ",
                    "amp" : "&",
                    "quot": "\"",
                    "lt"  : "<",
                    "gt"  : ">"
                };
                return ( text.replace(translate_re, function(match, entity) {
                    return translate[entity];
                }) );
            };
        }
})();
