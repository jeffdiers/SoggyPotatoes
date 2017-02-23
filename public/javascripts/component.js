(function() {
  angular.module('app', [])
  .component('posts', {
    controller: controller,
    templateUrl: `/javascripts/template.html`
  })
  controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit

    function onInit() {
      $http.get('/api/posts').then(function (res) {
        vm.posts = res.data
      })
    }
  }
}());
