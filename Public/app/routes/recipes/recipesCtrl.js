angular.module('hermes').controller('recipesCtrl', function($scope, mainService, user){
  mainService.getDataRecipes(user).then(function(response){
        $scope.recipes = response;
  });
  mainService.getDataStockItems(user).then(function(response){
    $scope.stockItems = response;
    console.log($scope.stockItems);
  });

  $scope.ingredients = [];



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
