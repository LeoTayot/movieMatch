'use strict';

angular.
  module('movieApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider
        .when('/home/:roomId?', {
          name: 'home',
          template: '<movie-match-home></movie-match-home>'
        })
        .when('/room/:roomId/:userId', {
          name: 'room',
          template: '<movie-match-room></movie-match-room>'
        })
        .when('/play/:roomId/:userId/:year?:genres?', {
          name: 'play',
          template: '<movie-match-play></movie-match-play>'
        })
    }
  ]);
