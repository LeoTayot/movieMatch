'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('movieMatch').
  component('movieMatchHome', {
    templateUrl: 'movieMatch/movieMatch-home.template.html',
    controllerAs: 'vm',
    controller: ['movieService', '$location',
      function movieMatchHomeController(movie, $location) {
        var vm = this;
        vm.error = '';

        vm.pseudo = "";

        vm.validate = function() {
          vm.invalidePseudo = '';

          if(!vm.pseudo) {
            vm.error = 'INVALID_PSEUDO';
          } else {
            movie.createRoom(vm.pseudo)
            .then(function(response) {
              $location.search('roomId', response.roomId).path('/room');
            })
            .catch(function() {
              vm.error = 'ERROR_ROOM_CREATION';
            })
          }
        }

      }
    ]
  });
