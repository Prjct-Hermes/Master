angular.module("hermes").controller("loginCtrl", function($scope, $state, mainService){
  //Create New User
    $scope.createNewUser = function(newUser){
      mainService.createNewUser(newUser).then(function(response){
        //Call the login function to automatically log in on successfull create.
      });
    };
    //Login
    $scope.login = function(user){
      mainService.login(user).then(function(response){
        if(!response.data){
          alert('User does not exist');
          $scope.user.password = '';
        }
        else{
          //Get all the info for the user.
          //state.go to some default page
        }
      });
    };
    $scope.logout = function(){
      return $http({
        method: 'GET',
        url: '/logout',
      }).then(function(response){
        $state.go('home')
      })
    };


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
