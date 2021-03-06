angular.module('hermes')
.controller('stockItemsCtrl', function($scope, $rootScope, mainService, user, items){

$scope.items = items;

$scope.$watch('searchFilter', function(){
  var category = $scope.selectedSearchTerm;
  var searchInput = $scope.searchFilter;
  $scope.search = {};
  $scope.search[category] = searchInput;
})



//
 // update ingredient and check alerts
 //get individual item for modal form
 $scope.getSingleItem = function(item){
   $scope.stockItem = item;
 }

 // update ingredient
 $scope.updateStockItems = function(itemId, body){
   mainService.updateStockItems(itemId, body).then(function(response){
     $rootScope.$broadcast('updateAlert');
   })//
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

//Get items
$scope.getItems = function(){
  mainService.getDataStockItems(user).then(function(response){
    $scope.items = response.map(function(item){
      item.alertDate = new Date(item.alertDate);
      return item;
    });
  });
}


});
