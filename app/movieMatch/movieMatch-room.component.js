'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('movieMatch').
  component('movieMatchRoom', {
    templateUrl: 'movieMatch/movieMatch-room.template.html',
    controllerAs: 'vm',
    controller: ['movieService', '$scope', '$timeout', '$location', '$route',
      function movieMatchRoomController(movie, $scope, $timeout, $location, $route) {
        var vm = this;
        vm.error = '';
        vm.users = [];
        vm.selectedFilters = [];
        vm.roomId = '';
        vm.timoutMember = null;

        vm.$onInit = function() {
          var room = $route.current.params;
          vm.roomId = room.roomId;
          vm.userId = room.userId;

          new QRCode(document.getElementById("qrcode"), {
            text: "http://localhost:8000/#!/home?roomId="+vm.roomId,
            width: 200,
            height: 200,
            colorDark : "#001d3d",
            colorLight : "#dddddd",
          });

          movie.getFilters()
          .then(function(response) {
            vm.filters = response;
          })
          //getMembers();
        }

        function getMembers() {
          movie.getMembers(vm.roomId)
          .then(function(response) {
            var users = response;
            vm.users = users.value;
            vm.timoutMember = $timeout(function() {
              getMembers();
            }, 5000);
          })
          .catch(function(error) {
            vm.timoutMember = $timeout(function() {
              getMembers();
            }, 5000);
          })
        }

        vm.addFilter = function(event, filterId) {
          if(event.target.classList.contains('selected')) {
            event.target.classList.remove('selected')
            var index = array.indexOf(filterId);
            if (index > -1) {
              vm.selectedFilters.splice(index, 1);
            }
          } else {
            event.target.classList.add('selected')
            vm.selectedFilters.push(filterId);
          }
        }

        vm.launchSession = function() {
          var room = $location.search();
          console.log(vm.selectedFilters)

          $location.search('genres', vm.selectedFilters)
          .path('/play/'+vm.roomId+'/'+vm.userId);
        }

        vm.openModal = function() {
          angular.element("#largeModal").modal('show');
        }

        $scope.$on("$destroy", function(){
          $timeout.cancel(vm.timoutMember);
      });
      }
    ]
  });
