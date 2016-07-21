angular.module('hermes')
.controller('stockItemsCtrl', function($scope, mainService, user){

 

$scope.getItems = function(){
  $scope.alertItems = mainService.retrieveStockItems();
  mainService.getDataStockItems(user).then(function(response){
    $scope.items = response.map(function(item){
      item.alertDate = new Date(item.alertDate);
      console.log("items", $scope.stockItems )
      return item;
  });
});
}
 $scope.getItems();



//Alert checker
$scope.alerts = [];
$scope.alertCheck = function(){
  for (var i = 0; i < $scope.alertItems.length; i++){
    if($scope.alertItems[i].quantity <= $scope.alertItems[i].alertQuantity){
      var alert = {
        name: $scope.alertItems[i].name,
        id: $scope.alertItems[i]._id,
        quantity: $scope.alertItems[i].quantity,
        alertQuantity: $scope.alertItems[i].alertQuantity
      }
      $scope.alerts.push(alert);
    }
  }
  mainService.createAlerts($scope.alerts);
}();



 // update ingredient and check alerts
 //get individual item for modal form
 $scope.getSingleItem = function(item){
   $scope.stockItem = item;
 }

 // update ingredient
 $scope.updateStockItems = function(itemId, body){
   console.log(itemId, body);
   mainService.updateStockItems(itemId, body).then(function(response){
     $scope.getItems();
   })

 }

 //create ingredient
 $scope.createStockItems = function(newItem){
   newItem.userId = user;

   mainService.createStockItems(newItem).then(function(response){
     $scope.newItem = {};

     $scope.getItems();

   })
 }

 //Delete ingredient
 $scope.destroyStockItems = function(oldItem){
    var check = confirm("Are you sure you want to delete this stock item?");
    if (check) {
      mainService.destroyStockItems(oldItem).then(function(response){
        $scope.getItems();

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
