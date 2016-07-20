angular.module('hermes').controller('recipesCtrl', function($scope, mainService, user){

  $scope.ingredients = [];

  mainService.getDataRecipes(user).then(function(response){
        $scope.recipes = response;
  });
  mainService.getDataStockItems(user).then(function(response){
    $scope.stockItems = response;
  });

  $scope.addToIngredients = function(newIngredient){
    $scope.ingredients.push(angular.copy(newIngredient));
    console.log($scope.ingredients);
  }



});

/*
CRUD
Ingredients will need to pull id from Stock items

Unit options
ml
l
tsp
tbsp
fl-oz
cup
pnt
qt
gal

*/
// <input type="text" placeholder="Ingredients" ng-model="newRecipe.ingredients">
