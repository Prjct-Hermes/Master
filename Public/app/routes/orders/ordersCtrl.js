angular.module('hermes').controller('ordersCtrl', function($scope, mainService){

//This segment should be removed when the project has working login
$scope.user = "578bf14a5b25dcac0b00f9e6";
$scope.recipes = function(){
  mainService.getDataRecipes($scope.user).then(function(){
    $scope.allRecipes = mainService.retrieveAllRecipes();
  });
}();
// ////////////////////////////////////////////////////


//This section hosts the iff that grabs our data from the server
//This segment should be uncommented when the above portion is removed
// $scope.getData = function(){
//   $scope.user = mainService.userId();
//   $scope.allRecipes = mainService.retrieveAllRecipes();
// }();

$scope.allRecipes = {};
$scope.order ={
  userId: "",
  date: "",
  recipes: [],
  total: 0,
};


$scope.incrementOrder = function(recipe){
  console.log("1");
  if (!$scope.order.userId){
    console.log("2");
    $scope.order.userId = $scope.user;
    $scope.order.date = new Date();
    $scope.order.recipes = [];
    $scope.order.total = recipe.price;
    return $scope.order.recipes.push({"name": recipe.name,"id": recipe._id,"quantity": 1, "price": recipe.price});
  };
  if($scope.order.recipes.length < 1){
    console.log("3")
    $scope.order.recipes.push({"name": recipe.name,"id": recipe._id,"quantity": 1, "price": recipe.price});
  }else {
    console.log("4");
    var check = true;
    for (var i = 0; i < $scope.order.recipes.length; i++){
      if ($scope.order.recipes[i].id === recipe._id){
        console.log("5");
        check = false;
        $scope.order.recipes[i].quantity++;
        $scope.order.recipes[i].price = parseFloat(recipe.price) * parseFloat($scope.order.recipes[i].quantity);
      }
    }
    if(check){
      console.log("6");
      $scope.order.recipes.push({"name": recipe.name,"id": recipe._id,"quantity": 1, "price": recipe.price});
    }
  }
  $scope.order.total = 0;
  for (var i = 0; i < $scope.order.recipes.length; i++){
    $scope.order.total = parseFloat($scope.order.total) + parseFloat($scope.order.recipes[i].price);
  }
  console.log("7", $scope.order);
}

$scope.decrementOrder = function(recipe){
  console.log("1");
  for (var i = 0; i < $scope.order.recipes.length; i++){
    if ($scope.order.recipes[i].id === recipe._id){
      console.log("2");
      $scope.order.recipes[i].quantity--;
      $scope.order.recipes[i].price = parseFloat(recipe.price) * parseFloat($scope.order.recipes[i].quantity);
      if ($scope.order.recipes[i].quantity < 1){
        $scope.order.recipes.splice(i, 1)
      }
    }
  }
  $scope.order.total = 0;
  for (var i = 0; i < $scope.order.recipes.length; i++){
    $scope.order.total = parseFloat($scope.order.total) + parseFloat($scope.order.recipes[i].price);
  }
  console.log("3", $scope.order);
}

$scope.createOrder = function(){
  console.log("creating order");
  mainService.createOrders($scope.order);
  console.log("Order created");
}

// this.recipe = {
//  "userId" : "",
//  "name" : "",
//  "description" : "",
//  "ingredients" :{
//   "name" : "",
//   "id" : "",
//   "quantity" :0,
//   "unitOfMeasure" : "",
//  }
//  "instructions" : "",
//  "price" :0
// }
//
// this.order = {
//  "userId" : "",
//  "date" : "",
//  "recipes" : [{
//      "name" :"",
//      "id" : "",
//      "quantity" : 0
//  }
//  ]
// }

/*
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


1.Convert all recipes ingredients converted to ingredient unit of measure
2.multiply by qty of recipe
3.Total all recipes
4.subtract from stock qty
5.upadte stock qty on server
6.post order to server
7.run through alerts and check if alert qty is below stock qty and if an alert already exists don't post

convert($scope.recipe.ingredientQty).from($scope.recipe.ingredientUnitOfMeasure).to($scope.stockItems.unitOfMeasure)
*/
})
