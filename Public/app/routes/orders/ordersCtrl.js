angular.module('hermes').controller('ordersCtrl', function($scope, mainService, user){

//This segment should be removed when the project has working login
// user = "578bf14a5b25dcac0b00f9e6";
// $scope.recipes = function(){
//   mainService.getDataRecipes(user).then(function(){
//     $scope.allRecipes = mainService.retrieveAllRecipes();
//   });
// }();
//////////////////////////////////////////////////////




//This section hosts the iif that grabs our data from the server
//This segment should be uncommented when the above portion is removed
$scope.getData = function(){
  $scope.allRecipes = mainService.retrieveAllRecipes();
  $scope.stockItems = mainService.retrieveStockItems();
}();

$scope.order ={
  userId: "",
  date: "",
  recipes: [],
  total: 0,
};
$scope.alerts = [];
$scope.units = {
	"ml" : 3785.41,
	"l":3.78541,
	"tsp":768,
	"tbsp":256,
	"floz":133.228,
	"cup":15.7725,
	"pnt":8,
	"qt":4,
	"gal":1,
	};
$scope.converter = function(unit, from, to){
  units = {
  	"ml" : 3785.41,
  	"l":3.78541,
  	"tsp":768,
  	"tbsp":256,
  	"floz":133.228,
  	"cup":15.7725,
  	"pnt":8,
  	"qt":4,
  	"gal":1,
  	};
	var result = unit;
	for (var x in units){
		if(x === from){
			result = parseFloat(result / units[x]);
		}
	}
	for (var y in units){
		if(y === to){
			result = parseFloat(result * units[y]);
		}
	}
	return result;
};
$scope.incrementOrder = function(recipe){
  if (!$scope.order.userId){
    $scope.order.userId = user;
    $scope.order.date = new Date();
    $scope.order.recipes = [];
    $scope.order.total = recipe.price;
    return $scope.order.recipes.push({"name": recipe.name,"id": recipe._id,"quantity": 1, "price": recipe.price});
  };
  if($scope.order.recipes.length < 1){
    $scope.order.recipes.push({"name": recipe.name,"id": recipe._id,"quantity": 1, "price": recipe.price});
  }else {
    var check = true;
    for (var i = 0; i < $scope.order.recipes.length; i++){
      if ($scope.order.recipes[i].id === recipe._id){
        check = false;
        $scope.order.recipes[i].quantity++;
        $scope.order.recipes[i].price = parseFloat(recipe.price) * parseFloat($scope.order.recipes[i].quantity);
      }
    }
    if(check){
      $scope.order.recipes.push({"name": recipe.name,"id": recipe._id,"quantity": 1, "price": recipe.price});
    }
  }
  $scope.order.total = 0;
  for (var i = 0; i < $scope.order.recipes.length; i++){
    $scope.order.total = parseFloat($scope.order.total) + parseFloat($scope.order.recipes[i].price);
  }
}
$scope.decrementOrder = function(recipe){
  for (var i = 0; i < $scope.order.recipes.length; i++){
    if ($scope.order.recipes[i].id === recipe._id){
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
}
$scope.stockUpdate = function(recipe){
  for (var i = 0; i < $scope.allRecipes.length; i++){
    if(recipe.id === $scope.allRecipes[i]._id){
      var currentRecipe = $scope.allRecipes[i];
      for (var prop in currentRecipe.ingredients){
        for (var item in $scope.stockItems){
          if(currentRecipe.ingredients[prop].id === $scope.stockItems[item]._id){
            var amount = $scope.converter((recipe.quantity * currentRecipe.ingredients[prop].quantity),currentRecipe.ingredients[prop].unitOfMeasure,$scope.stockItems[item].unitOfMeasure)
            $scope.stockItems[item].quantity = $scope.stockItems[item].quantity - amount;
            if($scope.stockItems[item].quantity < 0){
              $scope.stockItems[item].quantity = 0;
            }
            mainService.updateStockItems($scope.stockItems[item]._id, $scope.stockItems[item])
          }
        }
      }
    }
  }
}
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
$scope.createOrder = function(){
  mainService.createOrders($scope.order);
  //Here is where it will loop through all the recipes
  //and update stock quantities
  $scope.order.recipes.forEach($scope.stockUpdate)
  $scope.alertCheck();
  console.log($scope.alerts);
  $scope.order ={userId: "",date: "",recipes: [],total: 0};
}

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
*/
})
