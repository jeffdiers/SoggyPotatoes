angular.module('soggy', ['ui.router', 'angularMoment'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll()
        }]
      }
    })
    $urlRouterProvider.otherwise('home');
  }])

  .controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){
      $scope.posts = posts.posts
    }
  ])

  .factory('posts', ['$http', function($http, angularMoment){
    let o = { posts: [] }
    o.getAll = function(){
      $http.get('/api/posts').success(function (data) {
        angular.copy(data, o.posts)
      })
    }
    return o
  }])
