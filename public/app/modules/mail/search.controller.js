(function() {
    'use strict';

    angular
        .module('mail')
        .controller('Search', Search);

  //  Search.$inject = ['dependencies'];

    /* @ngInject */
    function Search() {
        var vm = this;

        activate();

        function activate() {
            console.log('Search')
        }
    }
})();
