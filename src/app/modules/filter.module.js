(function(){
    'use strict';
    angular
        .module('intranet')
        .filter('sanitize', sanitize)
        .filter('removeEntities', removeEntities);

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
