angular.module('hermes').controller('profileCtrl', function($scope, $state, mainService, user){
  $scope.profile = user;
  $scope.remPassword = function(){
    delete $scope.profile.password;
  }();

  $scope.updateProfile = function(){
    var userLogin = {};
    userLogin.email = $scope.profile.email;
    userLogin.password = prompt("Please confirm your current password");
    mainService.login(userLogin).then(function(response){
      // delete $scope.profile.password;
      if(!response.data){
        // delete $scope.temp.oldPassword;
        // delete $scope.temp.newPassword;
        // delete $scope.temp.confirmPassword;
        // $scope.newPassword = true;
        alert('Incorrect Password');
      }else{
        // if(!$scope.newPassword && $scope.temp.newPassword.length > 1 && $scope.temp.newPassword === $scope.temp.confirmPassword){
        //   $scope.profile.password = $scope.temp.newPassword;
        //   $scope.temp.newPassword = '';
        //   delete $scope.temp.confirmPassword = '';
        //   $scope.newPassword = true;
        // }
        mainService.updateUser($scope.profile._id, $scope.profile).then(function(response){
          alert("Profile updated");
        });

      }
    })
  };

  $scope.deleteProfile = function(id){
    $scope.profile.password = prompt("To delete your profile and all your data please enter your password");
    mainService.login($scope.profile).then(function(response){
      if(!response.data){
        $scope.profile.password = '';
        alert('Incorrect Password');
      }
      else{
        var stockItems = mainService.retrieveStockItems();
        for (var i = 0; i < stockItems.length; i++){
          mainService.destroyStockItems(stockItems[i]._id)
        };
        var recipes = mainService.retrieveAllRecipes();
        for (var i = 0; i < recipes.length; i++){
          mainService.destroyRecipes(recipes[i]._id)
        };
        var orders = mainService.retrieveAllOrders();
        for (var i = 0; i < orders.length; i++){
          mainService.destroyOrders(orders[i]._id)
        };
        mainService.destroyUser(id);
        alert("Your Profile and data have been deleted")
        $state.go('login')
        $scope.temp.oldPassword = '';
        $scope.temp.newPassword = '';
        $scope.temp.confirmPassword = '';
        $scope.profile.password = '';
        $scope.newPassword = true;
      }
    })
  };

  $scope.newPassword = true;
  $scope.changePassword = function(){
    $scope.newPassword = !$scope.newPassword;
  }
  $scope.passwordConfirmation = "Passwords don't match";
  $scope.passwordCheck = function(){
    if($scope.temp.newPassword === $scope.temp.confirmPassword){
      $scope.passwordConfirmation = "Passwords match";
    }else {
      $scope.passwordConfirmation = "Passwords don't match";
    }
  }
  $scope.test = function(){
    console.log("Profile: ", $scope.profile, "User: ", user)
  }
})
