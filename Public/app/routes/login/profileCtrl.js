angular.module('hermes').controller('profileCtrl', function($scope, $state, mainService, user){
  $scope.profile = user;
  $scope.getData = function(){
    mainService.getDataStockItems($scope.profile._id).then(function(response){
      $scope.stockItems = response;
    })
    mainService.getDataRecipes($scope.profile._id).then(function(response){
      $scope.recipes = response;
    })
    mainService.getDataOrders($scope.profile._id).then(function(response){
      $scope.orders = response;
    })
  }();
  $scope.passwordConfirmation = "Passwords is incorrect";
  $scope.passwordCheck = function(){
    if(temp.password === $scope.password){
      $scope.passwordConfirmation = "Passwords is correct";
    }else {
      $scope.passwordConfirmation = "Passwords is incorrect";
    }
  }
  $scope.updateProfile = function(id, body){
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
      for (var i = 0; i < $scope.stockItems.length; i++){
        mainService.destroyStockItems($scope.stockItems[i]._id)
      };
      for (var i = 0; i < $scope.recipes.length; i++){
        mainService.destroyRecipes($scope.recipes[i]._id)
      }
      for (var i = 0; i < $scope.orders.length; i++){
        mainService.destroyOrders($scope.orders[i]._id)
      }
      mainService.destroyUser(id);
      alert("Your Profile and data has been deleted")
      $state.go('login')
    }else{
      alert("Your Profile and data has been preserved")
    }
  }
})
