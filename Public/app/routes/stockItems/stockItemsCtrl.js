angular.module('hermes')
.controller('stockItemsCtrl', function($scope, mainService){

  // $scope.getUser = function() {
  //   $scope.user = mainService.userId()
  // }

   var user = "578d45978ad845d80e3f695a";
  // get ingredients
  mainService.getDataStockItems($scope.user).then(function(response){
        $scope.items = response.data;
  });


  // update ingredient

  //create ingredient
  $scope.createStockItems = function(newItem){
    newItem.userId = user;
    console.log(newItem);
    mainService.createStockItems(newItem).then(function(response){
      $scope.newItem = {};

      mainService.getDataStockItems($scope.user).then(function(response){
            $scope.items = response.data;
      });
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
