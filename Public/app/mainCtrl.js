angular.module('hermes').controller('mainCtrl', function($scope, $state, mainService){
  $scope.logout = function(){
    mainService.logout().then(function(response){
      $state.go('home');
    })
  };

  $scope.retrieveAlerts =  function(){
    $scope.alerts = mainService.retrieveAlerts();
    $scope.alertLength = $scope.alerts.length;
    console.log($scope.alertLength)
  };
  $scope.retrieveAlerts();

});
