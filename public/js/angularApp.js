angular.module('soggy', ['ui.router', 'angularMoment', 'ngSanitize'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

    $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: '/js/home-template.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['postService', function(postService){
          return postService.getAll()
        }]
      }
    })

    .state('posts', {
      url: '/posts/{movie_title}',
      templateUrl: '/js/article-template.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'postService', function($stateParams, postService){
          return postService.get($stateParams.movie_title)
        }],
        movieData: ['$stateParams', 'postService', function($stateParams, postService){
            return postService.getMovieData($stateParams.movie_title)
          }]
        }
    })
    $urlRouterProvider.otherwise('/home');
  }])

  .controller('MainCtrl', [
    '$scope',
    'postService',
    function($scope, posts){
      $scope.posts = posts.posts
    }
  ])

  .controller('PostsCtrl', [
    '$scope',
    'postService',
    'post',
    'movieData',
    function($scope, postService, post, movieData){
      $scope.post = post[0]
      $scope.movieData = movieData.data
      console.log(movieData.data);
    }
  ])

  .factory('postService', ['$http', function($http, angularMoment){
    let o = { posts: [] }
    o.getAll = function(){
      return $http.get('/api/posts').success(function (data){
        angular.copy(data, o.posts)
      })
    }
    o.get = function(movie_title){
      return $http.get('/api/posts/'+movie_title).then(function (res){
        return res.data
      })
    }
    o.getMovieData = function(movie_title){
      let title = encodeURIComponent(movie_title)
      return $http.get('https://www.omdbapi.com/?t='+title)
    }
    return o
  }])
