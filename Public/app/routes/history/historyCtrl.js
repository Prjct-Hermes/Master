angular.module('hermes').controller('historyCtrl', function($scope, mainService, user, orders){
// $scope.getData = function(){
//   mainService.getDataOrders().then(function(response){
//     $scope.allOrders = mainService.retrieveAllOrders();
//     $scope.data();
//   })
//   $scope.allOrders = mainService.retrieveAllOrders();
// }();
$scope.allOrders = orders
//Get all orders to combine into a single day
//Create an array that is {day, qty}
$scope.tempData = [];
$scope.tempDates = [];
$scope.tempQuantities = [];
$scope.data = function(){
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
    $scope.tempDates.push(newDate);
    $scope.tempQuantities.push($scope.allOrders[i].quantityTotal);
    obj.quantity = $scope.allOrders[i].quantityTotal;
    var check = false;
    if($scope.tempData.length){
      for (var x = 0; x < $scope.tempData.length; x++){
        if(obj.date === $scope.tempData[x].date){
          $scope.tempData[x].quantity = $scope.tempData[x].quantity + obj.quantity;
        }else{
          check = true;
        }
      }
    }else{
      $scope.tempData.push(obj);
    }
    if(check){
      $scope.tempData.push(obj);
      check = false;
    }
  }
  console.log("$scope.tempData" , $scope.tempData)
}();

//this block of code successfully display's everthing but not formatted correctly.

// d3.select("ui-view").selectAll("div")
//     .data($scope.tempData)
//     .enter()
//     .append("div")
//     .style("height", "30px")
//     .style("width", function(d, i){
//       return (d.quantity * 20) + "px"
//     })
//     .style("background-color", function(d, i){
//       return d3.rgb(d.quantity*25%255, 150, d.quantity*25%255);
//     })
//     .style("border", "5px solid blue")
//     .style("margin", "5px")
//     .style('color', "white")
//     .text(function(d, i){
//       var date = new Date(d.date)
//       var year = date.getFullYear();
//       var month = date.getMonth();
//       var monthFunc = function(){
//         switch(month) {
//           case 0 :
//             month = "January";
//             break;
//           case 1 :
//             month = "February";
//             break;
//           case 2 :
//             month = "March";
//             break;
//           case 3 :
//             month = "April";
//             break;
//           case 4 :
//             month = "May";
//             break;
//           case 5 :
//             month = "June";
//             break;
//           case 6 :
//             month = "July";
//             break;
//           case 7 :
//             month = "August";
//             break;
//           case 8 :
//             month = "September";
//             break;
//           case 9 :
//             month = "October";
//             break;
//           case 10 :
//             month = "November";
//             break;
//           case 11 :
//             month = "December";
//             break;
//         };
//       }();
//       var day = date.getDay();
//       var newDate = (month + " "+ day + ", " + year)
//       return newDate;
//     });


//This block is an attempt to enclose everything in an svg container essentially
var svgContainer = d3.select("ui-view")
    .append("svg")
    .attr("width", 800)
    .attr("height", 400)
    .attr("border", "2px solid black");

var rectangle = svgContainer.append("rect")
    .data($scope.tempData)
    .attr("width", "30px")
    .attr("height", function(d, i){
      return (d.quantity * 20) + "px"
    })
    .attr("background-color", function(d, i){
      return d3.rgb(d.quantity*25%255, 150, d.quantity*25%255);
    })
    .attr("border", "5px solid blue")
    .attr("margin", "5px")
    .attr('color', "white")
    .text(function(d, i){
      var date = new Date(d.date)
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
      var newDate = (month + " "+ day + ", " + year)
      return newDate;
    });

//This is old stuff that probably doesn't work.

// // var maxQuantity = 2;
// // var maxY = 1;
// // for (var i = 0; i < $scope.allOrders.length; i++){
// //   if($scope.allOrders.quantityTotal > maxQuantity){
// //     maxQuantity = $scope.allOrders.quantityTotal;
// //     maxX = maxQuantity/maxY;
// //     console.log("Max QTY: ",maxQuantity)
// //   }
// // };
//
//
//
// var rectangle = svgContainer.append("rect")
//     .data($scope.allOrders)
//     .attr("x", function(d, i){
//       console.log("x", i,d);
//       return i*1.85;
//     })
//     .attr("y", function(d, i){
//       // linearScaleY(d.quantityTotal)
//       return 100 - (d.quantityTotal * 10)
//
//     })
//     .attr("width", "13px")
//     .attr("height", function(d, i){
//       // if (d.quantityTotal < 2){
//       //   return "20px"
//       // }else {
//       //   return d.quantityTotal*10 + "px";
//       // }
//       return d.quantityTotal*10 + "px";
//     })
//     .attr("background-color", function(d, i){
//       return d3.rgb(d.quantityTotal*25%255, 150, d.quantityTotal*25%255);
//     })
//     .attr("border", "5px solid blue")
//     .attr('color', "white")
//     .text(function(d, i){
//       return d.quantityTotal
//     });
// var test = d3.select("data-body")
//     .append('div')
//     .data($scope.allOrders)
//     .style("height", "13px")
//     .style("width", function(d, i){
//       return d.quantityTotal*10 + "px";
//       })
//     .style("background-color", function(d, i){
//       return d3.rgb(d.quantityTotal*25%255, 150, d.quantityTotal*25%255);
//     })
//     .style("border", "5px solid blue")
//     .style('color', "white")
//     .text(function(d, i){
//       return d.quantityTotal
// });

})
