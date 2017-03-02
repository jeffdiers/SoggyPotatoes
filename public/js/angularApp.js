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
        postPromise: ['postService', function(postService){
          return postService.getAll()
        }]
      }
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'postService', function($stateParams, postService){
          return postService.get($stateParams.id)
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
    function($scope, postService, post){
      $scope.post = post
    }
  ])

  .factory('postService', ['$http', function($http, angularMoment){
    let o = { posts: [] }
    function getAll(){
      return $http.get('/api/posts').success(function (data){
        angular.copy(data, o.posts)
      })
    }
    function get(id){
      return $http.get('/api/posts/'+id).then(function (res){
        return res.data
      })
    }
    o.getAll = getAll
    o.get = get
    return o
  }])
