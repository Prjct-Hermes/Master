angular.module('hermes')
.controller('stockItemsCtrl', function($scope, mainService, user){


  $scope.getUser = function() {
    $scope.user = mainService.userId()
  }();

  $scope.getitems = function(){
    mainService.getDataStockItems($scope.user).then(function(response){
          $scope.items = response.map(function(item){
            item.alertDate = new Date(item.alertDate);
            return item;
          });
    });
  }

  $scope.getitems();

  // update ingredient
  $scope.updateStockItems = function(itemId, body){
    mainService.updateStockItems(itemId, body).then(function(response){


      $scope.getitems();
    })

  }

  //create ingredient
  $scope.createStockItems = function(newItem){
    newItem.userId = user;

    mainService.createStockItems(newItem).then(function(response){
      $scope.newItem = {};

      $scope.getitems();
    })
  }

  //Delete ingredient
  $scope.destroyStockItems = function(oldItem){
     mainService.destroyStockItems(oldItem).then(function(response){


      $scope.getitems();

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
