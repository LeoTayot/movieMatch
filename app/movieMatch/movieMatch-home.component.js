'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('movieMatch').
  component('movieMatchHome', {
    templateUrl: 'movieMatch/movieMatch-home.template.html',
    controllerAs: 'vm',
    controller: ['movieService', '$location', '$route',
      function movieMatchHomeController(movie, $location, $route) {
        var vm = this;
        vm.error = '';
        vm.pseudo = "";

        vm.$onInit = function() {
          var room = $route.current.params;
          vm.roomId = room.roomId;
        }

        vm.validate = function(newGroup) {
          vm.error = '';

          if(!vm.pseudo) {
            vm.error = 'INVALID_PSEUDO';
            return;
          } else if(!newGroup && !vm.roomId) {
            vm.error = 'INVALID_GROUP';
            return;
          }
          
          if(newGroup) { // Group creation
            movie.createRoom(vm.pseudo)
            .then(function(response) {
              console.log(response)
              var userId = response.userID;
              var roomId = response.roomID;

              var newRoom = $location.search('roomId', roomId);
              newRoom.search('userId', userId);
              newRoom.path('/room');
            })
            .catch(function() {
              vm.error = 'ERROR_ROOM_CREATION';
            })
          } else { // Group join
            movie.joinRoom(vm.pseudo, vm.roomId)
            .then(function(response) {
              console.log(response)
              var userId = response.userID;
              var roomId = response.roomID;
              $location.path('/room/'+roomId+'/'+userId);
            })
            .catch(function() {
              vm.error = 'ERROR_ROOM_CREATION';
            })
          }
        }
      }
    ]
  });
