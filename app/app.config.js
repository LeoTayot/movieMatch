'use strict';

angular.
  module('movieApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider
        .when('/home', {
          name: 'home',
          template: '<movie-match-home></movie-match-home>'
        })
        .when('/room?:roomId', {
          name: 'room',
          template: '<movie-match-room></movie-match-room>'
        })
        .when('/play?:roomId', {
          name: 'play',
          template: '<movie-match-play></movie-match-play>'
        })
        .otherwise('/home');
    }
  ]);
