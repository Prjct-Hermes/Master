angular.module('hermes').controller('recipesCtrl', function($scope){

  $scope.getUser = function() {
    $scope.user = mainService.userId()
  }();

  mainService.getDataRecipes($scope.user).then(function(response){
        $scope.items = response;
  });




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
