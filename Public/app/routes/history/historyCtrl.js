angular.module('hermes').controller('historyCtrl', function($scope, mainService, user){
$scope.name = "Scott Hendrickson";
$scope.getData = function(){
  $scope.allOrders = mainService.retrieveAllOrders();
  console.log("History", $scope.allOrders)
}();
$scope.updateQty = function(){
  for (var i = 0; i < $scope.allOrders.length; i++){
    $scope.allOrders[i].quantityTotal = 0;
    for(var x = 0; x < $scope.allOrders[i].recipes.length; x++){
      $scope.allOrders[i].quantityTotal = $scope.allOrders[i].quantityTotal + $scope.allOrders[i].recipes[x].quantity;
    }
    mainService.updateOrders($scope.allOrders[i]._id, $scope.allOrders[i])
  }
  console.log(("Updated History", $scope.allOrders))
}

d3.select("body").selectAll("div").data($scope.allOrders)
.style("height", "2em")
.style("background-color", "lightblue")
.style("margin", "2px")
.style("width", function(d, i){
  return d.quantityTotal + "px";
});

})
