'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('movieMatch').
  component('movieMatchPlay', {
    templateUrl: 'movieMatch/movieMatch-play.template.html',
    controllerAs: 'vm',
    controller: ['movieService',
      function movieMatchPlayController(movie) {
        var vm = this;
        vm.error = '';
        vm.users = [];
      }
    ]
  });
