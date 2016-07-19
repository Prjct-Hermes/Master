angular.module('hermes').controller('mainCtrl', function($scope, $state, mainService){
  $scope.logout = function(){
    mainService.logout().then(function(response){
      $state.go('home');
    })
  };


});
