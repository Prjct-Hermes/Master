angular.module('hermes')
.controller('stockItemsCtrl', function($scope, mainService){

  $scope.getUser = function() {
    $scope.user = mainService.userId()
  }


  mainService.getDataStockItems(user).then(function(response){
        $scope.items = response;
  });


  // update ingredient

  //create ingredient
  $scope.createStockItems = function(newItem){
    newItem.userId =$scope.user;

    mainService.createStockItems(newItem).then(function(response){
      $scope.newItem = {};

      mainService.getDataStockItems(user).then(function(response){
            $scope.items = response;
      });
    })
  }
  //Delete ingredient
  $scope.destroyStockItems = function(oldItem){
     mainService.destroyStockItems(oldItem).then(function(response){


      mainService.getDataStockItems(user).then(function(response){
            $scope.items = response;
      });
    })



  }



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
