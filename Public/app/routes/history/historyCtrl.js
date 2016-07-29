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
$scope.data = function(){
  for (var i = 0; i < $scope.allOrders.length; i++){
    var date = new Date($scope.allOrders[i].date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var newDate = year + "-" + month + "-"+ day;
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

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// The new data variable.
var data = [{date: "2016-07-01T21:39:56.537Z", quantity: 5 },
    {date: "2016-07-02T21:39:56.537Z", quantity: 11 },
    {date: "2016-07-02T21:39:56.537Z", quantity: 10 },
    {date: "2016-07-04T21:48:36.885Z", quantity: 23 },
    {date: "2016-07-05T19:58:14.297Z", quantity: 6 },
    {date: "2016-07-06T19:58:53.291Z", quantity: 2 },
    {date: "2016-07-07T20:00:42.465Z", quantity: 3 },
    {date: "2016-07-08T20:04:15.827Z", quantity: 3 },
    {date: "2016-07-09T20:05:45.491Z", quantity: 2 },
    {date: "2016-07-09T20:05:45.491Z", quantity: 2 },
    {date: "2016-07-11T20:11:11.789Z", quantity: 1 },
    {date: "2016-07-12T20:13:41.855Z", quantity: 1 },
    {date: "2016-07-13T20:22:22.529Z", quantity: 1 },
    {date: "2016-07-14T20:25:51.932Z", quantity: 1 },
    {date: "2016-07-15T20:26:29.642Z", quantity: 1 },
    {date: "2016-07-16T20:28:28.710Z", quantity: 1 },
    {date: "2016-07-16T20:28:28.710Z", quantity: 1 },
    {date: "2016-07-18T20:31:34.193Z", quantity: 1 },
    {date: "2016-07-19T20:36:32.218Z", quantity: 1 },
    {date: "2016-07-20T20:36:58.054Z", quantity: 1 },
    {date: "2016-07-21T20:37:05.060Z", quantity: 1 },
    {date: "2016-07-22T20:39:44.477Z", quantity: 1 },
    {date: "2016-07-23T20:39:47.528Z", quantity: 1 },
    {date: "2016-07-23T20:39:47.528Z", quantity: 1 },
    {date: "2016-07-25T20:41:12.045Z", quantity: 1 },
    {date: "2016-07-26T20:41:16.394Z", quantity: 1 },
    {date: "2016-07-27T20:41:43.656Z", quantity: 1 },
    {date: "2016-07-28T20:42:47.115Z", quantity: 1 },
    {date: "2016-07-29T20:44:04.225Z", quantity: 1 },
    {date: "2016-07-29T20:44:04.225Z", quantity: 1 },
    {date: "2016-07-29T20:44:04.225Z", quantity: 1 },
    {date: "2016-07-01T20:56:01.559Z", quantity: 1 },
    {date: "2016-07-02T22:03:26.052Z", quantity: 1 },
    {date: "2016-07-02T22:03:26.052Z", quantity: 1 },
    {date: "2016-07-04T22:08:20.442Z", quantity: 1 },
    {date: "2016-07-05T22:09:10.667Z", quantity: 1 },
    {date: "2016-07-15T22:10:26.000Z", quantity: 1 },
    {date: "2016-07-13T22:11:05.980Z", quantity: 1 },
    {date: "2016-07-12T22:11:23.191Z", quantity: 1 },
    {date: "2016-07-11T22:11:27.330Z", quantity: 12 },
    {date: "2016-07-11T22:12:30.093Z", quantity: 1 },
    {date: "2016-07-11T22:12:30.093Z", quantity: 1 },
    {date: "2016-07-09T22:14:22.896Z", quantity: 2 },
    {date: "2016-07-19T22:16:44.279Z", quantity: 1 },
    {date: "2016-07-08T22:16:48.677Z", quantity: 7 },
    {date: "2016-07-07T22:23:02.680Z", quantity: 1 },
    {date: "2016-07-07T22:24:40.575Z", quantity: 1 },
    {date: "2016-07-06T22:24:44.772Z", quantity: 3 },
    {date: "2016-07-05T22:33:29.545Z", quantity: 3 },
    {date: "2016-07-05T22:33:29.545Z", quantity: 4 },
    {date: "2016-07-04T22:23:06.375Z", quantity: 4 },
    {date: "2016-07-02T22:23:06.375Z", quantity: 4 },
    {date: "2016-07-01T22:23:06.375Z", quantity: 4 },
    {date: "2016-07-22T21:30:21.959Z", quantity: 3 },
    {date: "2016-07-22T21:34:43.083Z", quantity: 1 },
    {date: "2016-07-25T21:00:33.926Z", quantity: 1 },
    {date: "2016-07-25T21:06:10.677Z", quantity: 1 },
    {date: "2016-07-27T17:15:00.871Z", quantity: 4 },
    {date: "2016-07-27T17:59:27.879Z", quantity: 1 }];

// The following code was contained in the callback function.
x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.quantity; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

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
