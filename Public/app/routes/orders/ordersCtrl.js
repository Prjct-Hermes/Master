angular.module('hermes').controller('ordersCtrl', function($scope, mainService){

//This segment should be removed when the project has working login
$scope.user = "578bf14a5b25dcac0b00f9e6";
$scope.orders = function(){
  mainService.getDataOrders($scope.user).then(function(){
    console.log("something");
    $scope.allOrders = mainService.retrieveAllOrders();
    console.log($scope.allOrders)
  });
}();
// ////////////////////////////////////////////////////


//This section hosts the iff that grabs our data from the server
//This segment should be uncommented when the above portion is removed
// $scope.getData = function(){
//   $scope.user = mainService.userId();
//   $scope.allOrders = mainService.retrieveAllOrders();
// }();

$scope.allOrders = {};
});




/*

1.Convert all recipes ingredients converted to ingredient unit of measure
2.multiply by qty of recipe
3.Total all recipes
4.subtract from stock qty
5.upadte stock qty on server
6.post order to server
7.run through alerts and check if alert qty is below stock qty and if an alert already exists don't post

convert($scope.recipe.ingredientQty).from($scope.recipe.ingredientUnitOfMeasure).to($scope.stockItems.unitOfMeasure)
*/
