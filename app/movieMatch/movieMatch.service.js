'use strict';

angular.
  module('movieMatch').
  factory('movieService', movieService);
  movieService.$inject = ['$http', '$log'];

  function movieService($http, $log) {
    const baseUrl =  'http://152.228.133.44:1880/';

    return {
      createRoom: createRoom
    };
  
    function createRoom(pseudo) {
      function createRoomComplete (response) {
        return response.data;
      }
  
      function createRoomFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      return $http({
        method: 'POST'
        , url: baseUrl+'movie?pseudo='+pseudo
        , headers: {'Content-Type': 'text/plain'}
        , data: {
          'pseudo': pseudo
        }
      })
      .then(createRoomComplete)
      .catch(createRoomFailed);
    }
  }
