angular.module('hermes').controller('historyCtrl', function($scope, mainService, user, orders){

$scope.allOrders = orders
$scope.minDate = "";
$scope.maxDate = "";
var dateRange = function(){
  if (!$scope.minDate){
    $scope.minDate = new Date($scope.allOrders[0].date).getTime()
  }
  if (!$scope.maxDate){
    $scope.minDate = new Date($scope.allOrders[0].date).getTime()
  }
  for (var i = 1; i < $scope.allOrders.length; i++){
    var date = new Date($scope.allOrders[i].date).getTime();
    if(date < $scope.minDate){
      $scope.minDate = new Date(date);
    }
    if(date > $scope.maxDate){
      $scope.maxDate = new Date(date);
    }
  }
  console.log("Min: ", $scope.minDate, "Max: ", $scope.maxDate);
}();
$scope.setDateRange = function(){
  $scope.tempData = [];
  for (var i = 1; i < $scope.allOrders.length; i++){
    var date = new Date($scope.allOrders[i].date).getTime();
    if(date > $scope.minDate && date < $scope.maxDate){
      var date = new Date($scope.allOrders[i].date);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDay();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var newDate = year + "-" + month + "-"+ day + " " + hour + ":" + minutes;
      var obj = {};
      obj.date = newDate;
      obj.quantity = $scope.allOrders[i].quantityTotal;
      $scope.tempData.push(obj);
    }
  }
  console.log($scope.tempData)
}
$scope.tempData = [];
$scope.data = function(){
  for (var i = 0; i < $scope.allOrders.length; i++){
    var date = new Date($scope.allOrders[i].date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var newDate = year + "-" + month + "-"+ day + " " + hour + ":" + minutes;
    var obj = {};
    obj.date = newDate;
    obj.quantity = $scope.allOrders[i].quantityTotal;
    $scope.tempData.push(obj);

    //For the sake of the demonstration I am NOT going to run this segment.
    //This part of the function would essentially collapse all the orders into their specific days.

    // var check = true;
    // if($scope.tempData.length){
    //   for (var x = 0; x < $scope.tempData.length; x++){
    //     if(obj.date === $scope.tempData[x].date){
    //       $scope.tempData[x].quantity = $scope.tempData[x].quantity + obj.quantity;
    //       check = false;
    //     }
    //   }
    // }else{
    //   $scope.tempData.push(obj);
    // }
    // if(check){
    //   $scope.tempData.push(obj);
    //   check = false;
    // }
  }
}();

$scope.logData = function(){
  console.log("Data: ", $scope.tempData)
}
$scope.logOrders = function(){
  console.log("Data: ", $scope.allOrders)
}

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    //.tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Quantity:</strong> <span style='color:red'>" + d.quantity + "</span>";
  })

var svg = d3.select(".history-data").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


// The following code was contained in the callback function.
x.domain($scope.tempData.map(function(d) { return d.date; }));
y.domain([0, d3.max($scope.tempData, function(d) { return d.quantity; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" );

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Quantity");

svg.selectAll(".bar")
    .data($scope.tempData)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.date); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.quantity); })
    .attr("height", function(d) { return height - y(d.quantity); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)



function type(d) {
  d.quantity = +d.quantity;
  return d;
}


 $scope.updateData = function() {
    	// Scale the range of the data again
      x.domain($scope.tempData.map(function(d) { return d.date; }));
      y.domain([0, d3.max($scope.tempData, function(d) { return d.quantity; })]);

    // Select the section we want to apply our changes to
    var bars = d3.select(".history-data").selectAll(".bar").data($scope.tempData, function(d) { return d.date; });

    // Make the changes
    bars.exit()
    .transition()
      .duration(300)
    .attr("y", y(0))
    .attr("height", height - y(0))
    .style('fill-opacity', 1e-6)
    .remove();

    bars.enter().append("rect")
    .attr("class", "bar")
    .attr("y", y(0))
    .attr("height", height - y(0));

    bars.transition().duration(300).attr("x", function(d) { return x(d.date); }) // (d) is one item from the data array, x is the scale object from above
    .attr("width", x.rangeBand()) // constant, so no callback function(d) here
    .attr("y", function(d) { return y(d.quantity); })
    .attr("height", function(d) { return height - y(d.quantity); }); // flip the height, because y's domain is bottom up, but SVG renders top down


    };

// //this block of code successfully display's everthing but not formatted correctly.
//
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
//       console.log("Date: ", d.date);
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


})
