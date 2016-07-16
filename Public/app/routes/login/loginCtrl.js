angular.module("hermes").controller("loginCtrl", function($scope, $state){
  /*
  user object

  Login:
    get to service on fail post Incorrect Login or successfull login
    get, using user id, data and assign to Stock Items, Recipes, and Orders
    function to check stockItems qty against alert qty and post Alerts
      check date and if equal to alert date post alert

  Sign Up:
    create user object information
    post to server throuhgh service and return ._id and assign to user. Clear password afterwards
    $state.go('/stockItems')


  Profile:
    $scope.getUser = function(){
    $scope.user = mainService.getUser
  }
    password confirmation duplicate from login
    put updated info to server through service
  */
});
