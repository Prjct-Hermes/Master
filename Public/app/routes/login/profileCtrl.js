angular.module('hermes').controller('profileCtrl', function($scope, $state, mainService, user){
  $scope.profile = user;
  $scope.passwordConfirmation = "Passwords is incorrect";
  $scope.passwordCheck = function(){
    if(temp.password === $scope.password){
      $scope.passwordConfirmation = "Passwords is correct";
    }else {
      $scope.passwordConfirmation = "Passwords is incorrect";
    }
  }
  $scope.updateProfile = function(id, body){
    console.log($scope.profile._id);
    mainService.updateUser(id, body);
    alert("Profile updated");
    // var check = prompt("Please confirm your password");
    // if(check === $scope.password){
    //   mainservice.updateUser(id, body);
    //   check = "";
    //   return alert("Profile updated");
    // }else {
    //   alert("Incorrect password")
    // }
  }
  $scope.deleteProfile = function(id){
    var check = confirm("Deleting your profile will remove all of your data. Do you want to proceed?")
    if(check){
      var stockItems = mainService.retrieveStockItems;
      console.log(stockItems)
      for (var i = 0; i < stockItems.length; i++){
        console.log("Stock ID", stockItems[i]._id);
        mainService.destroyStockItems(stockItems[i]._id)
      };
      var recipes = mainService.retrieveAllRecipes;
      for (var i = 0; i < recipes.length; i++){
        console.log("Recipes ID", recipes[i]._id);
        mainService.destroyRecipes(recipes[i]._id)
      }
      var orders = mainService.retrieveAllOrders;
      for (var i = 0; i < orders.length; i++){
        console.log("Orders ID", orders[i]._id);
        mainService.destroyOrders(orders[i]._id)
      }
      mainService.destroyUser(id);
      alert("Your Profile and data has been deleted")
      $state.go('login')
    }else{
      alert("Your Profile and data has been preserved")
    }

  }
  $scope.test = function(id){
    var stockItems = mainService.retrieveStockItems;
    console.log("Stock Items: ", stockItems)
    for (var i = 0; i < stockItems.length; i++){
      console.log("Stock ID", stockItems[i]._id);
    };
    var recipes = mainService.retrieveAllRecipes;
    console.log("Recipes: ", recipes)
    for (var i = 0; i < recipes.length; i++){
      console.log("Recipes ID", recipes[i]._id);
    }
    var orders = mainService.retrieveAllOrders;
    console.log("Orders ", orders)
    for (var i = 0; i < orders.length; i++){
      console.log("Orders ID", orders[i]._id);
    }
  }
})
