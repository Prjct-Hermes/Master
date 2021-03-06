angular.module('hermes').controller('recipesCtrl', function($scope, $window, mainService, user, recipes, stockItems){
  $scope.user = user;
  $scope.ingredients = [];
  $scope.recipes = [];
  $scope.recipes = recipes;
  $scope.stockItems = stockItems;


  $scope.getRecipes = function(){
    mainService.getDataRecipes(user).then(function(response){
          $scope.recipes = response;
    });
  };

  $scope.addToIngredients = function(newIngredient){
    var tempIngredient = {};
    tempIngredient.quantity = newIngredient.quantity;
    tempIngredient.unitOfMeasure = newIngredient.unitOfMeasure;
    tempIngredient.name = newIngredient.item.name;
    tempIngredient.id = newIngredient.item._id;
    $scope.ingredients.push(angular.copy(tempIngredient));
    $scope.newIngredient = {};
    $window.document.getElementById('recipe-quantity-input').focus();
  };

  $scope.saveRecipe = function(newRecipe){
    newRecipe.ingredients = $scope.ingredients;
    newRecipe.userId = user;
    mainService.createRecipes(newRecipe).then(function(response){
      $scope.ingredients = [];
      $scope.newRecipe = {};
      mainService.getDataRecipes(user).then(function(response){
            $scope.recipes = response;
      });
    })
  };

  $scope.destroyRecipes = function(recipeToDelete){
    mainService.destroyRecipes(recipeToDelete).then(function(response){
      mainService.getDataRecipes(user).then(function(response){
        $scope.recipes = response;
      })
    })
  };

  $scope.updateRecipe = function(itemId, body){
    console.log("Recipe: ",body.ingredients[0])
    mainService.updateRecipes(itemId, body).then(function(response){
      console.log("response: ", response.ingredients[0]);
      $scope.getRecipes();

    })
  }

  $scope.removeIngredient = function(ingredientId, singleRecipe){
    for(let i = 0; i < singleRecipe.ingredients.length; i++){
      if(ingredientId === singleRecipe.ingredients[i].id){
        singleRecipe.ingredients.splice(i, 1);
      }
    }
    var recipeId = singleRecipe._id;
    $scope.updateRecipe(recipeId, singleRecipe);
  };

  $scope.getSingleRecipe = function(recipe){
    $scope.singleRecipe = recipe;
  }

  $scope.addToExisting = function(singleRecipe, ingredientToAdd){
    var tempIngredient = {};
    tempIngredient.quantity = ingredientToAdd.quantity;
    tempIngredient.unitOfMeasure = ingredientToAdd.unitOfMeasure;
    tempIngredient.id = ingredientToAdd.item._id;
    tempIngredient.name = ingredientToAdd.item.name;
    singleRecipe.ingredients.push(angular.copy(tempIngredient));

    $scope.updateRecipe(singleRecipe._id, singleRecipe);

    $scope.addIngredient = {};
  }

  $scope.$watch('searchFilter', function(){
    var category = $scope.selectedSearchTerm;
    var searchInput = $scope.searchFilter;
    $scope.search = {};
    $scope.search[category] = searchInput;
  })


});
