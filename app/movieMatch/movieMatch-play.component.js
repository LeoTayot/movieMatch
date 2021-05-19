'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('movieMatch').
  component('movieMatchPlay', {
    templateUrl: 'movieMatch/movieMatch-play.template.html',
    controllerAs: 'vm',
    controller: ['$scope', '$location', '$timeout', '$route', 'movieService', 
      function movieMatchPlayController($scope, $location, $timeout,  $route, movie) {
        var vm = this;
        vm.error = '';
        vm.loading = true;
        vm.Math = window.Math;
        vm.page=1;

        vm.$onInit = function() {
          vm.defaultPoster = "../assets/flat_movie_round.jpg";
          var filters = $location.search();
          console.log(filters)
          if(filters.genres && !Array.isArray(filters.genres)) {
            filters.genres = [filters.genres];
          }
          vm.genres = filters.genres;
          var room = $route.current.params;
          vm.roomId = room.roomId;
          vm.userId = room.userId;

          movie.getMovies(vm.roomId, vm.userId, vm.page, vm.genres)
          .then(function(response) {
            console.log(response);
            var indexMovie = 1;
            vm.movies = response;
            response.forEach(function(movie) {
              movie.image = (movie.poster_path) ? movie.image : '';
              movie.state = 'POSTER';

              if(indexMovie++ >= response.length) {
                $timeout(function() {
                    vm.initCards()
                  } , 100
                )
              }
            })
          })
        }

        vm.initCards = function() {
          var allCards = document.querySelectorAll('.tinder--card');

          for(var i = 0; i < allCards.length; i++) {
            if(!allCards[i].classList.contains("movable")) {
              var card = allCards[i];
              card.style.zIndex = allCards.length - i;
              card.style.transform = 'scale(' + (20 - i) / 20 + ') translateY(-' + 30 * i + 'px)';
              addMovingEvents(card)
            }
          }

          vm.loading = false;
          document.querySelector('.tinder').classList.add('loaded');
        }

        vm.initCardsBis = function(card, index) {
          var newCards = document.querySelectorAll('.tinder--card');

          for(var i = 1; i <= vm.movies.length; i++) {
            var index = i - 1;
            var card = newCards[i];
            card.style.zIndex = vm.movies.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
          }

          $scope.$apply();

          if(vm.movies.length == 10) {
            vm.page++;
            movie.getMovies(vm.roomId, vm.userId, vm.page, vm.genres)
            .then(function(response) {
              console.log(response);
              var indexMovie = 1;
              response.forEach(function(movie) {
                movie.image = (movie.poster_path) ? movie.image : '';
                movie.state = 'POSTER';
                vm.movies.push(movie);
                if(indexMovie++ >= response.length) {
                  $timeout(function() {
                      vm.initCards()
                    } , 100
                  )
                }
              })
            })
          }
        }

        function addMovingEvents(el) {
          var tinderContainer = document.querySelector('.tinder');
          var hammertime = new Hammer(el);
  
          hammertime.on('tap', function (event) {
            vm.movies[0].state = (vm.movies[0].state == 'TITLE') ? 'POSTER' : 'TITLE';
            $scope.$apply();
          });
  
          hammertime.on('press', function (event) {
            vm.movies[0].state = (vm.movies[0].state == 'DETAIL') ? 'TITLE' : 'DETAIL';
            $scope.$apply();
          });

          hammertime.on('pan', function (event) {
            el.classList.add('moving');
          });
  
          hammertime.on('pan', function (event) {
            if (event.deltaX === 0) return;
            if (event.center.x === 0 && event.center.y === 0) return;
  
            tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
            tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
  
            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;
  
            if(!event.target.classList.contains("tinder--card")) { // If the poster is triggered, take the correct one
              var targetOk = false;
              while(!targetOk) {
                event.target = event.target.parentElement;
                if(event.target.classList.contains("tinder--card")) {
                  targetOk = true;
                }
              }
            }

            event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
          });
  
          hammertime.on('panend', function (event) {
            el.classList.remove('moving');
            tinderContainer.classList.remove('tinder_love');
            tinderContainer.classList.remove('tinder_nope');
  
            var moveOutWidth = document.body.clientWidth;
            var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
  
            event.target.classList.toggle('removed', !keep);
  
            if (keep) {
              event.target.style.transform = '';
            } else {
              var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
              var toX = event.deltaX > 0 ? endX : -endX;
              var endY = Math.abs(event.velocityY) * moveOutWidth;
              var toY = event.deltaY > 0 ? endY : -endY;
              var xMulti = event.deltaX * 0.03;
              var yMulti = event.deltaY / 80;
              var rotate = xMulti * yMulti;
  
              event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
              
              if(event.deltaX > 0) { // LOVE
                voteForCard(event.target.id);
              }

              vm.movies.shift();
              vm.initCardsBis();
            }
          });
          el.classList.add("movable");
        }

        function voteForCard(card) {
          var movieId = card.split('cardId_');
          movieId = movieId[1];
          console.log();
          movie.voteForMovie(vm.roomId, vm.userId, movieId)
          .then(function(response) {

          })
        }

        function createButtonListener(love) {
          return function (event) {
            var cards = document.querySelectorAll('.tinder--card:not(.removed)');
            var moveOutWidth = document.body.clientWidth * 1.5;

            if (!cards.length) return false;

            var card = cards[0];

            card.classList.add('removed');

            if (love) {
              card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
            } else {
              card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
            }

            vm.movies.shift();
            vm.initCardsBis();

            event.preventDefault();
          };
        }

        var nopeListener = createButtonListener(false);
        var loveListener = createButtonListener(true);

        document.getElementById('nope').addEventListener('click', nopeListener);
        document.getElementById('love').addEventListener('click', loveListener);
      }
    ]
  });
