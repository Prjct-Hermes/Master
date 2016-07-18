angular.module('hermes')
.controller('stockItemsCtrl', function($scope, mainService){

  $scope.getUser = function() {
    $scope.user = mainService.userId()
  }

  // get ingredients
  mainService.getDataStockItems($scope.user).then(function(response){
        $scope.items = response.data;
  });


  // update ingredient

  //create ingredient
  $scope.createStockItem = function(newItem){
    mainService.createStockItem(newItem).then(function(response){
      $scope.item =response;

    })
  }
  //Delete ingredient




});


/*
CRUD

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
