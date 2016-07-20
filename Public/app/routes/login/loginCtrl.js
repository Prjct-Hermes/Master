angular.module("hermes").controller("loginCtrl", function($scope, $state, mainService){
  //Create New User
    $scope.createNewUser = function(newUser){
      mainService.createUser(newUser).then(function(response){
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
          var userId = response.data._id
          mainService.getDataStockItems(userId);
          mainService.getDataRecipes(userId);
          mainService.getDataOrders(userId);
          $state.go('orders');
          $scope.alertCheck();
        }
      });
    };
    $scope.alertCheck = function(){
      for (var i = 0; i < $scope.stockItems.length; i++){
        if($scope.stockItems[i].quantity <= $scope.stockItems[i].alertQuantity){
          var alert = {
            name: $scope.stockItems[i].name,
            id: $scope.stockItems[i]._id,
            quantity: $scope.stockItems[i].quantity,
            alertQuantity: $scope.stockItems[i].alertQuantity
          }
          $scope.alerts.push(alert);
        }
      }
      mainService.createAlerts($scope.alerts);
    };
  /*
  user object

  Login:
    get to service on fail post Incorrect Login or successfull login
    get, using user id, data and assign to Stock Items, Recipes, and Orders
    function to check stockItems qty against alert qty and post Alerts
      check date and if equal to alert date post alert


  Sign Up:
    1) Build user object.
    2)

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
