angular.module('hermes')
.controller('stockItemsCtrl', function($scope, mainService, user){


 $scope.getitems = function(){
   mainService.getDataStockItems(user).then(function(response){
         $scope.items = response.map(function(item){
           item.alertDate = new Date(item.alertDate);
           return item;
         });
   });
 }


 $scope.getitems();

//Alert checker
$scope.alertCheck = function(){
  for (var i = 0; i < $scope.stockItems.length; i++){
    if($scope.stockItems[i].quantity <= $scope.stockItems[i].alertQuantity){
      var alert = {
        name: $scope.stockItems[i].name,
        id: $scope.stockItems[i]._id,
        quantity: $scope.stockItems[i].quantity,
        alertQuantity: $scope.stockItems[i].alertQuantity
      }
      $scope.alerts.push(alert);
    }
  }
  mainService.createAlerts($scope.alerts);
};

 // update ingredient and check alerts
 $scope.alerts = [];
 //get individual item for modal form
 $scope.getSingleItem = function(item){
   $scope.stockItem = item;
 }

 // update ingredient
 $scope.updateStockItems = function(itemId, body){
   console.log(itemId, body);
   mainService.updateStockItems(itemId, body).then(function(response){
     $scope.getitems();
   })
   $scope.alertCheck();
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
    var check = confirm("Are you sure you want to delete this stock item?");
    if (check) {
      mainService.destroyStockItems(oldItem).then(function(response){
        $scope.getitems();
     })
    }



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
