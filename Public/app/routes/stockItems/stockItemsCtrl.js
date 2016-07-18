angular.module('hermes')
.controller('stockItemsCtrl', function($scope, mainService){

  // $scope.getUser = function() {
  //   $scope.user = mainService.userId()
  // }

   var user = "578d45978ad845d80e3f695a";
  // get ingredients
  mainService.getDataStockItems(user).then(function(response){
        $scope.items = response;
  });


  // update ingredient

  //create ingredient
  $scope.createStockItems = function(newItem){
    newItem.userId = user;

    mainService.createStockItems(newItem).then(function(response){
      $scope.newItem = {};

      mainService.getDataStockItems(user).then(function(response){
            $scope.items = response;
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
