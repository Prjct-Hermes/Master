angular.module('hermes').controller('historyCtrl', function($scope, mainService, user){
$scope.getData = function(){
  $scope.allOrders = mainService.retrieveAllOrders();
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

$scope.dates = function(){
  var tempData = [];
  for (var i = 0; i < $scope.allOrders.length; i++){
    var date = new Date($scope.allOrders[i].date)
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthFunc = function(){
      switch(month) {
        case 0 :
          month = "January";
          break;
        case 1 :
          month = "February";
          break;
        case 2 :
          month = "March";
          break;
        case 3 :
          month = "April";
          break;
        case 4 :
          month = "May";
          break;
        case 5 :
          month = "June";
          break;
        case 6 :
          month = "July";
          break;
        case 7 :
          month = "August";
          break;
        case 8 :
          month = "September";
          break;
        case 9 :
          month = "October";
          break;
        case 10 :
          month = "November";
          break;
        case 11 :
          month = "December";
          break;
      };
    }();
    var day = date.getDay();
    var newDate = new Date(month + " "+ day + ", " + year).getTime();
    var obj = {};
    obj.date = newDate;
    obj.quantity = $scope.allOrders[i].quantityTotal;
    console.log("obj",obj);
    var check = false;
    if(tempData.length){
      for (var x = 0; x < tempData.length; x++){
        if(obj.date === tempData[x].date){
          tempData[x].quantity = tempData[x].quantity + obj.quantity;
        }else{
          check = true;
        }
      }
    }else{
      tempData.push(obj);
    }
    if(check){
      tempData.push(obj);
      check = false;
    }

  //mainService.updateOrders($scope.allOrders[i]._id, $scope.allOrders[i])
  }
  console.log("tempData" , tempData)
  // for (var x =0; x < tempData.length; x++){
  //   if(!$scope.data){
  //     $scope.data = [];
  //     $scope.data.push(tempData[x]);
  //   }else {
  //     for (y = 0; y < $scope.data.length; y++){
  //       if($scope.data[y].date === tempData[x].data){
  //
  //       }else{
  //         check = true;
  //       }
  //     }
  //   }
  //   if(tempData[x].date === $scope.data[x].date){
  //     $scope.data[x].quantity = $scope.data[x].quantity + obj.quantity;
  //   }else{
  //     $scope.data.push(obj);
  //   }
  //   }
  // }
}
//Get all orders to combine into a single day
//Create an array that is {day, qty}


})
