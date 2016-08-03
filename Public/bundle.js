angular.module('hermes', ['ui.router']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: './app/routes/home/home.html',
    controller: 'mainCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: './app/routes/login/login.html',
    controller: 'loginCtrl'
  }).state('profile', {
    url: '/profile',
    templateUrl: './app/routes/login/profile.html',
    controller: 'profileCtrl',
    resolve: {
      user: ["mainService", "$state", function (mainService, $state) {
        return mainService.getCurrentUser().then(function (response) {
          if (response.data) {
            return response.data;
          }
        }).catch(function (err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }]
    }
  }).state('stockItems', {
    url: '/stockItems',
    templateUrl: './app/routes/stockItems/stockItems.html',
    controller: 'stockItemsCtrl',
    resolve: {
      user: ["mainService", "$state", function (mainService, $state) {
        return mainService.getCurrentUser().then(function (response) {
          if (response.data) {
            return response.data._id;
          }
          $state.go('login');
        }).catch(function (err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }],
      items: ["mainService", function (mainService) {
        return mainService.getDataStockItems().then(function (itemData) {
          return itemData;
        });
      }]
    }
  }).state('recipes', {
    url: '/recipes',
    templateUrl: './app/routes/recipes/recipes.html',
    controller: 'recipesCtrl',
    resolve: {
      user: ["mainService", "$state", function (mainService, $state) {
        return mainService.getCurrentUser().then(function (response) {
          if (response.data) {
            return response.data._id;
          }
        }).catch(function (err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }],
      recipes: ["mainService", function (mainService) {
        return mainService.getDataRecipes().then(function (recipesData) {
          return recipesData;
        });
      }],
      stockItems: ["mainService", function (mainService) {
        return mainService.getDataStockItems().then(function (stockItemsData) {
          return stockItemsData;
        });
      }]
    }
  }).state('orders', {
    url: '/orders',
    templateUrl: './app/routes/orders/orders.html',
    controller: 'ordersCtrl',
    resolve: {
      user: ["mainService", "$state", function (mainService, $state) {
        return mainService.getCurrentUser().then(function (response) {
          if (response.data) {
            return response.data;
          }
        }).catch(function (err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }],
      recipes: ["mainService", function (mainService) {
        return mainService.getDataRecipes().then(function (recipesData) {
          return recipesData;
        });
      }],
      stockItems: ["mainService", function (mainService) {
        return mainService.getDataStockItems().then(function (stockItemsData) {
          return stockItemsData;
        });
      }]
    }
  }).state('alerts', {
    url: '/alerts',
    templateUrl: './app/routes/alerts/alerts.html',
    controller: 'alertsCtrl',
    resolve: {
      user: ["mainService", "$state", function (mainService, $state) {
        return mainService.getCurrentUser().then(function (response) {
          if (response.data) {
            return response.data;
          }
        }).catch(function (err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }]
    }
  }).state('history', {
    url: '/history',
    templateUrl: './app/routes/history/history.html',
    controller: 'historyCtrl',
    resolve: {
      user: ["mainService", "$state", function (mainService, $state) {
        return mainService.getCurrentUser().then(function (response) {
          if (response.data) {
            return response.data;
          }
        }).catch(function (err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }],
      orders: ["mainService", function (mainService) {
        return mainService.getDataOrders().then(function (ordersData) {
          return ordersData;
        });
      }]
    }
  });

  $urlRouterProvider.otherwise('/home');
}]);
angular.module('hermes').controller('mainCtrl', ["$scope", "$state", "mainService", function ($scope, $state, mainService) {}]);
angular.module('hermes').service('mainService', ["$http", "$q", function ($http, $q) {

  //This var brings the scope back to the mainService
  //allowing the data to be saved to the service.
  var self = this;

  // Login Controller //
  this.login = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function (response) {
      self.user = response.data._id;
      return response;
    });
  };
  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function (response) {
      return response;
    });
  };
  this.getCurrentUser = function () {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function (response) {
      return response;
    });
  };
  this.getCurrentUserProfile = function () {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function (response) {
      self.profile = response.data;
      return response;
    });
  };
  this.destroyUser = function (id) {
    var deferred = $q.defer();
    $http({
      method: 'DELETE',
      url: "/api/users/" + id
    }).then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };

  this.createUser = function (body) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: "/api/users",
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.updateUser = function (id, body) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: "/api/users/" + id,
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  //These are your stockItems requests
  this.getDataStockItems = function () {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: "/api/stockItems"
    }).then(function (response) {

      self.allStockItems = response.data;
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.destroyStockItems = function (id) {
    var deferred = $q.defer();
    $http({
      method: 'DELETE',
      url: "/api/stockItems/" + id
    }).then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };
  this.createStockItems = function (body) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: "/api/stockItems",
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.updateStockItems = function (id, body) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: "/api/stockItems/" + id,
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  //These are your recipes requests
  this.getDataRecipes = function () {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: "/api/recipes"
    }).then(function (response) {
      self.allRecipes = response.data;
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.destroyRecipes = function (id) {
    var deferred = $q.defer();
    $http({
      method: 'DELETE',
      url: "/api/recipes/" + id
    }).then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };
  this.createRecipes = function (body) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: "/api/recipes",
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.updateRecipes = function (id, body) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: "/api/recipes/" + id,
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  //These are your orders requests
  this.getDataOrders = function (id) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: "/api/orders/" + id
    }).then(function (response) {
      self.allOrders = response.data;
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.destroyOrders = function (id) {
    var deferred = $q.defer();
    $http({
      method: 'DELETE',
      url: "/api/orders/" + id
    }).then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };
  this.createOrders = function (body) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: "/api/orders",
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  this.updateOrders = function (id, body) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: "/api/orders/" + id,
      data: body
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  //This is where all of our data and how to access it is going to live.
  this.user = "";
  this.userId = function () {
    return this.user;
  };
  this.profile = {};
  this.retrieveProfile = function () {
    return this.profile;
  };
  this.allStockItems = {};
  this.retrieveStockItems = function () {
    return this.allStockItems;
  };
  this.allRecipes = {};
  this.retrieveAllRecipes = function () {
    return this.allRecipes;
  };
  this.allOrders = {};
  this.retrieveAllOrders = function () {
    return this.allOrders;
  };
  this.alerts = [];
  this.createAlerts = function (data) {
    this.alerts = data;
  };
  this.retrieveAlerts = function () {
    return this.alerts;
  };
}]);
angular.module('hermes').controller('footerCtrl', ["$scope", function ($scope) {}]);
angular.module('hermes').directive('footerdir', function () {
  return {
    restrict: "E",
    templateUrl: "./app/directives/footer/footer.html"
    // controller:"footerCtrl"
  };
});
angular.module('hermes').controller('headerCtrl', ["$scope", "$rootScope", "$state", "mainService", function ($scope, $rootScope, $state, mainService) {

  $scope.getAlerts = function () {
    mainService.getCurrentUser().then(function (response) {
      $scope.loggedIn = true;
      $scope.user = response.data._id;
      mainService.getDataStockItems($scope.user).then(function (response1) {
        $scope.alertItems = response1;
        $scope.alerts = [];
        for (var i = 0; i < $scope.alertItems.length; i++) {
          if ($scope.alertItems[i].quantity <= $scope.alertItems[i].alertQuantity) {
            var alert = {
              name: $scope.alertItems[i].name,
              id: $scope.alertItems[i]._id,
              quantity: $scope.alertItems[i].quantity,
              alertQuantity: $scope.alertItems[i].alertQuantity
            };
            $scope.alerts.push(angular.copy(alert));
          }
        }
        $scope.alertLength = $scope.alerts.length;
        mainService.createAlerts($scope.alerts);
      });
    });
  }();

  $scope.logout = function () {
    mainService.logout().then(function (response) {
      $scope.loggedIn = false;
      $state.go('home');
    });
  };

  $rootScope.$on('updateAlert', function () {
    mainService.getCurrentUser().then(function (response) {
      $scope.loggedIn = true;
      $scope.user = response.data._id;
      mainService.getDataStockItems($scope.user).then(function (response1) {
        $scope.alertItems = response1;
        $scope.alerts = [];
        for (var i = 0; i < $scope.alertItems.length; i++) {
          if ($scope.alertItems[i].quantity <= $scope.alertItems[i].alertQuantity) {
            var alert = {
              name: $scope.alertItems[i].name,
              id: $scope.alertItems[i]._id,
              quantity: $scope.alertItems[i].quantity,
              alertQuantity: $scope.alertItems[i].alertQuantity
            };
            $scope.alerts.push(angular.copy(alert));
          }
        }
        $scope.alertLength = $scope.alerts.length;
        mainService.createAlerts($scope.alerts);
      });
    });
  });
}]);
angular.module('hermes').directive('headerdir', function () {
  return {
    restrict: "E",
    templateUrl: "./app/directives/header/header.html",
    controller: "headerCtrl"
  };
});
angular.module('hermes').controller('alertsCtrl', ["$scope", function ($scope) {}]);
/*
need to grab stockItems data from service

*/
angular.module('hermes').controller('historyCtrl', ["$scope", "mainService", "user", "orders", function ($scope, mainService, user, orders) {

  $scope.allOrders = orders;
  $scope.minDate = "";
  $scope.maxDate = "";
  var dateRange = function () {
    if (!$scope.minDate) {
      $scope.minDate = new Date($scope.allOrders[0].date).getTime();
    }
    if (!$scope.maxDate) {
      $scope.minDate = new Date($scope.allOrders[0].date).getTime();
    }
    for (var i = 1; i < $scope.allOrders.length; i++) {
      var date = new Date($scope.allOrders[i].date).getTime();
      if (date < $scope.minDate) {
        $scope.minDate = new Date(date);
      }
      if (date > $scope.maxDate) {
        $scope.maxDate = new Date(date);
      }
    }
    console.log("Min: ", $scope.minDate, "Max: ", $scope.maxDate);
  }();
  $scope.setDateRange = function () {
    $scope.tempData = [];
    for (var i = 1; i < $scope.allOrders.length; i++) {
      var date = new Date($scope.allOrders[i].date).getTime();
      if (date > $scope.minDate && date < $scope.maxDate) {
        var date = new Date($scope.allOrders[i].date);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var newDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes;
        var obj = {};
        obj.date = newDate;
        obj.quantity = $scope.allOrders[i].quantityTotal;
        $scope.tempData.push(obj);
      }
    }
    console.log($scope.tempData);
  };
  $scope.tempData = [];
  $scope.data = function () {
    for (var i = 0; i < $scope.allOrders.length; i++) {
      var date = new Date($scope.allOrders[i].date);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDay();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var newDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes;
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

  $scope.logData = function () {
    console.log("Data: ", $scope.tempData);
  };
  $scope.logOrders = function () {
    console.log("Data: ", $scope.allOrders);
  };

  var margin = { top: 40, right: 20, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  //var formatPercent = d3.format(".0%");

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom");

  var yAxis = d3.svg.axis().scale(y).orient("left");
  //.tickFormat(formatPercent);

  var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function (d) {
    return "<strong>Quantity:</strong> <span style='color:red'>" + d.quantity + "</span>";
  });

  var svg = d3.select(".history-data").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  // The following code was contained in the callback function.
  x.domain($scope.tempData.map(function (d) {
    return d.date;
  }));
  y.domain([0, d3.max($scope.tempData, function (d) {
    return d.quantity;
  })]);

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", "-.55em").attr("transform", "rotate(-90)");

  svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Quantity");

  svg.selectAll(".bar").data($scope.tempData).enter().append("rect").attr("class", "bar").attr("x", function (d) {
    return x(d.date);
  }).attr("width", x.rangeBand()).attr("y", function (d) {
    return y(d.quantity);
  }).attr("height", function (d) {
    return height - y(d.quantity);
  }).on('mouseover', tip.show).on('mouseout', tip.hide);

  function type(d) {
    d.quantity = +d.quantity;
    return d;
  }

  $scope.updateData = function () {
    // Scale the range of the data again
    x.domain($scope.tempData.map(function (d) {
      return d.date;
    }));
    y.domain([0, d3.max($scope.tempData, function (d) {
      return d.quantity;
    })]);

    // Select the section we want to apply our changes to
    var bars = d3.select(".history-data").selectAll(".bar").data($scope.tempData, function (d) {
      return d.date;
    });

    // Make the changes
    bars.exit().transition().duration(300).attr("y", y(0)).attr("height", height - y(0)).style('fill-opacity', 1e-6).remove();

    bars.enter().append("rect").attr("class", "bar").attr("y", y(0)).attr("height", height - y(0));

    bars.transition().duration(300).attr("x", function (d) {
      return x(d.date);
    }) // (d) is one item from the data array, x is the scale object from above
    .attr("width", x.rangeBand()) // constant, so no callback function(d) here
    .attr("y", function (d) {
      return y(d.quantity);
    }).attr("height", function (d) {
      return height - y(d.quantity);
    }); // flip the height, because y's domain is bottom up, but SVG renders top down
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
}]);
angular.module("hermes").controller("loginCtrl", ["$scope", "$state", "mainService", function ($scope, $state, mainService) {
  //Create New User
  $scope.createNewUser = function (newUser) {
    $scope.newUser.createDate = new Date();
    mainService.createUser(newUser).then(function (response) {
      $scope.login(newUser);
    });
  };
  //Login
  $scope.login = function (user) {
    mainService.login(user).then(function (response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        var userId = response.data._id;
        mainService.getDataStockItems(userId).then(function (response) {
          $scope.stockItems = mainService.retrieveStockItems();
          $scope.alertCheck();
        });
        mainService.getDataRecipes(userId);
        mainService.getDataOrders(userId);
        $state.go('orders');
      }
    });
  };
  $scope.alerts = [];
  $scope.alertCheck = function () {
    for (var i = 0; i < $scope.stockItems.length; i++) {
      if ($scope.stockItems[i].quantity <= $scope.stockItems[i].alertQuantity) {
        var alert = {
          name: $scope.stockItems[i].name,
          id: $scope.stockItems[i]._id,
          quantity: $scope.stockItems[i].quantity,
          alertQuantity: $scope.stockItems[i].alertQuantity
        };
        $scope.alerts.push(alert);
      }
    }
    mainService.createAlerts($scope.alerts);
  };
  /*
  user object
   Login:
    get to service on fail post Incorrect Login or successfull login
    get, using user id, data and assign to Stock Items, Recipes, and Orders
    function to check stockItems qty against alert qty and post Alerts
      check date and if equal to alert date post alert
    Sign Up:
    1) Build user object.
    2)
     post to server throuhgh service and return ._id and assign to user. Clear password afterwards
    $state.go('/stockItems')
    Profile:
    $scope.getUser = function(){
    $scope.user = mainService.getUser
  }
    password confirmation duplicate from login
    put updated info to server through service
  */
}]);
angular.module('hermes').controller('profileCtrl', ["$scope", "$state", "mainService", "user", function ($scope, $state, mainService, user) {
  $scope.profile = user;
  $scope.remPassword = function () {
    delete $scope.profile.password;
  }();

  $scope.updateProfile = function () {
    var userLogin = {};
    userLogin.email = $scope.profile.email;
    userLogin.password = prompt("Please confirm your current password");
    mainService.login(userLogin).then(function (response) {
      // delete $scope.profile.password;
      if (!response.data) {
        // delete $scope.temp.oldPassword;
        // delete $scope.temp.newPassword;
        // delete $scope.temp.confirmPassword;
        // $scope.newPassword = true;
        alert('Incorrect Password');
      } else {
        // if(!$scope.newPassword && $scope.temp.newPassword.length > 1 && $scope.temp.newPassword === $scope.temp.confirmPassword){
        //   $scope.profile.password = $scope.temp.newPassword;
        //   $scope.temp.newPassword = '';
        //   delete $scope.temp.confirmPassword = '';
        //   $scope.newPassword = true;
        // }
        mainService.updateUser($scope.profile._id, $scope.profile).then(function (response) {
          alert("Profile updated");
        });
      }
    });
  };

  $scope.deleteProfile = function (id) {
    $scope.profile.password = prompt("To delete your profile and all your data please enter your password");
    mainService.login($scope.profile).then(function (response) {
      if (!response.data) {
        $scope.profile.password = '';
        alert('Incorrect Password');
      } else {
        var stockItems = mainService.retrieveStockItems();
        for (var i = 0; i < stockItems.length; i++) {
          mainService.destroyStockItems(stockItems[i]._id);
        };
        var recipes = mainService.retrieveAllRecipes();
        for (var i = 0; i < recipes.length; i++) {
          mainService.destroyRecipes(recipes[i]._id);
        };
        var orders = mainService.retrieveAllOrders();
        for (var i = 0; i < orders.length; i++) {
          mainService.destroyOrders(orders[i]._id);
        };
        mainService.destroyUser(id);
        alert("Your Profile and data have been deleted");
        $state.go('login');
        $scope.temp.oldPassword = '';
        $scope.temp.newPassword = '';
        $scope.temp.confirmPassword = '';
        $scope.profile.password = '';
        $scope.newPassword = true;
      }
    });
  };

  $scope.newPassword = true;
  $scope.changePassword = function () {
    $scope.newPassword = !$scope.newPassword;
  };
  $scope.passwordConfirmation = "Passwords don't match";
  $scope.passwordCheck = function () {
    if ($scope.temp.newPassword === $scope.temp.confirmPassword) {
      $scope.passwordConfirmation = "Passwords match";
    } else {
      $scope.passwordConfirmation = "Passwords don't match";
    }
  };
  $scope.test = function () {
    console.log("Profile: ", $scope.profile, "User: ", user);
  };
}]);
angular.module('hermes').controller('recipesCtrl', ["$scope", "$window", "mainService", "user", "recipes", "stockItems", function ($scope, $window, mainService, user, recipes, stockItems) {
  $scope.user = user;
  $scope.ingredients = [];
  $scope.recipes = [];
  $scope.recipes = recipes;
  $scope.stockItems = stockItems;

  $scope.getRecipes = function () {
    mainService.getDataRecipes(user).then(function (response) {
      $scope.recipes = response;
    });
  };

  $scope.addToIngredients = function (newIngredient) {
    var tempIngredient = {};
    tempIngredient.quantity = newIngredient.quantity;
    tempIngredient.unitOfMeasure = newIngredient.unitOfMeasure;
    tempIngredient.name = newIngredient.item.name;
    tempIngredient.id = newIngredient.item._id;
    $scope.ingredients.push(angular.copy(tempIngredient));
    $scope.newIngredient = {};
    $window.document.getElementById('recipe-quantity-input').focus();
  };

  $scope.saveRecipe = function (newRecipe) {
    newRecipe.ingredients = $scope.ingredients;
    newRecipe.userId = user;
    mainService.createRecipes(newRecipe).then(function (response) {
      $scope.ingredients = [];
      $scope.newRecipe = {};
      mainService.getDataRecipes(user).then(function (response) {
        $scope.recipes = response;
      });
    });
  };

  $scope.destroyRecipes = function (recipeToDelete) {
    mainService.destroyRecipes(recipeToDelete).then(function (response) {
      mainService.getDataRecipes(user).then(function (response) {
        $scope.recipes = response;
      });
    });
  };

  $scope.updateRecipe = function (itemId, body) {
    console.log("Recipe: ", body.ingredients[0]);
    mainService.updateRecipes(itemId, body).then(function (response) {
      console.log("response: ", response.ingredients[0]);
      $scope.getRecipes();
    });
  };

  $scope.removeIngredient = function (ingredientId, singleRecipe) {
    for (let i = 0; i < singleRecipe.ingredients.length; i++) {
      if (ingredientId === singleRecipe.ingredients[i].id) {
        singleRecipe.ingredients.splice(i, 1);
      }
    }
    var recipeId = singleRecipe._id;
    $scope.updateRecipe(recipeId, singleRecipe);
  };

  $scope.getSingleRecipe = function (recipe) {
    $scope.singleRecipe = recipe;
  };

  $scope.addToExisting = function (singleRecipe, ingredientToAdd) {
    var tempIngredient = {};
    tempIngredient.quantity = ingredientToAdd.quantity;
    tempIngredient.unitOfMeasure = ingredientToAdd.unitOfMeasure;
    tempIngredient.id = ingredientToAdd.item._id;
    tempIngredient.name = ingredientToAdd.item.name;
    singleRecipe.ingredients.push(angular.copy(tempIngredient));

    $scope.updateRecipe(singleRecipe._id, singleRecipe);

    $scope.addIngredient = {};
  };

  $scope.$watch('searchFilter', function () {
    var category = $scope.selectedSearchTerm;
    var searchInput = $scope.searchFilter;
    $scope.search = {};
    $scope.search[category] = searchInput;
  });
}]);
angular.module('hermes').controller('ordersCtrl', ["$scope", "mainService", "user", "stockItems", "recipes", function ($scope, mainService, user, stockItems, recipes) {

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
  $scope.stockItems = stockItems;
  $scope.allRecipes = recipes;

  $scope.order = {
    userId: "",
    date: "",
    recipes: [],
    total: 0
  };
  $scope.alerts = [];
  $scope.units = {
    "ml": 3785.41,
    "l": 3.78541,
    "tsp": 768,
    "tbsp": 256,
    "floz": 133.228,
    "cup": 15.7725,
    "pnt": 8,
    "qt": 4,
    "gal": 1
  };
  $scope.converter = function (unit, from, to) {
    units = {
      "ml": 3785.41,
      "l": 3.78541,
      "tsp": 768,
      "tbsp": 256,
      "floz": 133.228,
      "cup": 15.7725,
      "pnt": 8,
      "qt": 4,
      "gal": 1
    };
    var result = unit;
    for (var x in units) {
      if (x === from) {
        result = parseFloat(result / units[x]);
      }
    }
    for (var y in units) {
      if (y === to) {
        result = parseFloat(result * units[y]);
      }
    }
    return result;
  };
  $scope.incrementOrder = function (recipe) {
    if (!$scope.order.userId) {
      $scope.order.userId = user;
      $scope.order.date = new Date();
      $scope.order.recipes = [];
      $scope.order.total = recipe.price;
      $scope.order.quantityTotal = 1;
      return $scope.order.recipes.push({ "name": recipe.name, "id": recipe._id, "quantity": 1, "price": recipe.price });
    };
    if ($scope.order.recipes.length < 1) {
      $scope.order.recipes.push({ "name": recipe.name, "id": recipe._id, "quantity": 1, "price": recipe.price });
    } else {
      var check = true;
      for (var i = 0; i < $scope.order.recipes.length; i++) {
        if ($scope.order.recipes[i].id === recipe._id) {
          check = false;
          $scope.order.recipes[i].quantity++;
          $scope.order.quantityTotal++;
          $scope.order.recipes[i].price = parseFloat(recipe.price) * parseFloat($scope.order.recipes[i].quantity);
        }
      }
      if (check) {
        $scope.order.quantityTotal = 1;
        $scope.order.recipes.push({ "name": recipe.name, "id": recipe._id, "quantity": 1, "price": recipe.price });
      }
    }
    $scope.order.total = 0;
    for (var i = 0; i < $scope.order.recipes.length; i++) {
      $scope.order.total = parseFloat($scope.order.total) + parseFloat($scope.order.recipes[i].price);
    }
  };
  $scope.decrementOrder = function (recipe) {
    for (var i = 0; i < $scope.order.recipes.length; i++) {
      if ($scope.order.recipes[i].id === recipe._id) {
        $scope.order.recipes[i].quantity--;
        $scope.order.quantityTotal--;
        $scope.order.recipes[i].price = parseFloat(recipe.price) * parseFloat($scope.order.recipes[i].quantity);
        if ($scope.order.recipes[i].quantity < 1) {
          $scope.order.recipes.splice(i, 1);
        }
        if ($scope.order.quantityTotal < 1) {
          $scope.order.quantityTotal = 0;
        }
      }
    }
    $scope.order.total = 0;
    for (var i = 0; i < $scope.order.recipes.length; i++) {
      $scope.order.total = parseFloat($scope.order.total) + parseFloat($scope.order.recipes[i].price);
    }
  };
  $scope.stockUpdate = function (recipe) {
    for (var i = 0; i < $scope.allRecipes.length; i++) {
      if (recipe.id === $scope.allRecipes[i]._id) {
        var currentRecipe = $scope.allRecipes[i];
        for (var prop in currentRecipe.ingredients) {
          for (var item in $scope.stockItems) {
            if (currentRecipe.ingredients[prop].id === $scope.stockItems[item]._id) {
              var amount = $scope.converter(recipe.quantity * currentRecipe.ingredients[prop].quantity, currentRecipe.ingredients[prop].unitOfMeasure, $scope.stockItems[item].unitOfMeasure);
              $scope.stockItems[item].quantity = $scope.stockItems[item].quantity - amount;
              if ($scope.stockItems[item].quantity < 0) {
                $scope.stockItems[item].quantity = 0;
              }
              mainService.updateStockItems($scope.stockItems[item]._id, $scope.stockItems[item]);
            }
          }
        }
      }
    }
  };
  $scope.alertCheck = function () {
    for (var i = 0; i < $scope.stockItems.length; i++) {
      if ($scope.stockItems[i].quantity <= $scope.stockItems[i].alertQuantity) {
        var alert = {
          name: $scope.stockItems[i].name,
          id: $scope.stockItems[i]._id,
          quantity: $scope.stockItems[i].quantity,
          alertQuantity: $scope.stockItems[i].alertQuantity
        };
        $scope.alerts.push(alert);
      }
    }
    mainService.createAlerts($scope.alerts);
  };
  $scope.createOrder = function () {
    mainService.createOrders($scope.order);
    //Here is where it will loop through all the recipes
    //and update stock quantities
    $scope.order.recipes.forEach($scope.stockUpdate);
    $scope.alertCheck();
    console.log("Alerts ", $scope.alerts);
    $scope.order = { userId: "", date: "", recipes: [], total: 0 };
    mainService.getDataOrders();
  };

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
}]);
angular.module('hermes').controller('stockItemsCtrl', ["$scope", "$rootScope", "mainService", "user", "items", function ($scope, $rootScope, mainService, user, items) {

  $scope.items = items;

  $scope.$watch('searchFilter', function () {
    var category = $scope.selectedSearchTerm;
    var searchInput = $scope.searchFilter;
    $scope.search = {};
    $scope.search[category] = searchInput;
  });

  //
  // update ingredient and check alerts
  //get individual item for modal form
  $scope.getSingleItem = function (item) {
    $scope.stockItem = item;
  };

  // update ingredient
  $scope.updateStockItems = function (itemId, body) {
    mainService.updateStockItems(itemId, body).then(function (response) {
      $rootScope.$broadcast('updateAlert');
    }); //
  };

  //create ingredient
  $scope.createStockItems = function (newItem) {
    newItem.userId = user;

    mainService.createStockItems(newItem).then(function (response) {
      $scope.newItem = {};
      $scope.getItems();
    });
  };

  //Delete ingredient
  $scope.destroyStockItems = function (oldItem) {
    var check = confirm("Are you sure you want to delete this stock item?");
    if (check) {
      mainService.destroyStockItems(oldItem).then(function (response) {
        $scope.getItems();
      });
    }
  };

  //Get items
  $scope.getItems = function () {
    mainService.getDataStockItems(user).then(function (response) {
      $scope.items = response.map(function (item) {
        item.alertDate = new Date(item.alertDate);
        return item;
      });
    });
  };
}]);