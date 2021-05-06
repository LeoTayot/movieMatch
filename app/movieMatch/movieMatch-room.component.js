'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('movieMatch').
  component('movieMatchRoom', {
    templateUrl: 'movieMatch/movieMatch-room.template.html',
    controllerAs: 'vm',
    controller: ['movieService', '$location',
      function movieMatchRoomController(movie, $location) {
        var vm = this;
        vm.error = '';
        vm.users = [];

        vm.users = [
          {
            pseudo: "Bob"
          }
        ];

        vm.launchSession = function() {
          var room = $location.search();
          $location.search('roomId', room.roomId).path('/play');
        }
      }
    ]
  });
