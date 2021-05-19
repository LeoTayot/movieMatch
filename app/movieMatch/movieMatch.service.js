'use strict';

angular.
  module('movieMatch').
  factory('movieService', movieService);
  movieService.$inject = ['$http', '$log'];

  function movieService($http, $log) {
    const baseUrl =  'http://152.228.133.44:1880/';

    return {
      getFilters: getFilters
      , getMovies: getMovies

      , createRoom: createRoom
      , joinRoom: joinRoom
      , getMembers: getMembers

      ,voteForMovie: voteForMovie
      ,getWinner: getWinner
    };
  
    function getFilters() {
      function getFiltersComplete (response) {
        return response.data;
      }
  
      function getFiltersFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      return $http({
        method: 'GET'
        , url: baseUrl+'filters'
        , headers: {'Content-Type': 'text/plain'}
      })
      .then(getFiltersComplete)
      .catch(getFiltersFailed);
    }

    function getMovies(roomId, userId, page, genres) {
      function getMoviesComplete (response) {
        return response.data;
      }
  
      function getMoviesFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      var with_genres = "";
      var genreFiltrer = "";
      if(genres) {
        genreFiltrer = genres.join(',');
        with_genres = "&with_genres="+genreFiltrer;
      }

      return $http({
        method: 'GET'
        , url: baseUrl+'nextMovies?roomID='+roomId+'&userID='+userId+'&page='+page+'&sort_by=popularity.desc'+with_genres
        , headers: {'Content-Type': 'text/plain'}
      })
      .then(getMoviesComplete)
      .catch(getMoviesFailed);
    }

    function createRoom(pseudo) {
      function createRoomComplete (response) {
        return response.data;
      }
  
      function createRoomFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      return $http({
        method: 'GET'
        , url: baseUrl+'createGroup?username='+pseudo
      })
      .then(createRoomComplete)
      .catch(createRoomFailed);
    }

    function joinRoom(pseudo, roomId) {
      function joinRoomComplete (response) {
        return response.data;
      }
  
      function joinRoomFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      return $http({
        method: 'GET'
        , url: baseUrl+'joinGroup?username='+pseudo+'&roomID='+roomId
      })
      .then(joinRoomComplete)
      .catch(joinRoomFailed);
    }

    function getMembers(roomId) {
      function getMembersComplete (response) {
        return response.data;
      }
  
      function getMembersFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      return $http({
        method: 'GET'
        , url: baseUrl+'getMembers?roomID='+roomId
      })
      .then(getMembersComplete)
      .catch(getMembersFailed);
    }

    function voteForMovie(roomId, userId, movieId) {
      function voteForMovieComplete (response) {
        return response.data;
      }
  
      function voteForMovieFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      return $http({
        method: 'GET'
        , url: baseUrl+'matchMovie?roomID='+roomId+'&userID='+userId+'&movieID='+movieId
      })
      .then(voteForMovieComplete)
      .catch(voteForMovieFailed);
    }

    function getWinner(roomId) {
      function getWinnerComplete (response) {
        return response.data;
      }
  
      function getWinnerFailed (error) {
        $log.info('fail : ' , error.data);
        throw error.data;
      }
      return $http({
        method: 'GET'
        , url: baseUrl+'theMovie?roomID='+roomId
      })
      .then(getWinnerComplete)
      .catch(getWinnerFailed);
    }
  }
