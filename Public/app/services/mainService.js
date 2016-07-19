angular.module('hermes').service('mainService', function($http, $q){

  // Login Controller //
this.login = function(user){
  return $http({
    method: 'POST',
    url: '/login',
    data: user
  }).then(function(response){
    return response;
  });
};
this.logout = function(){
  return $http({
    method: 'GET',
    url: '/logout',
  }).then(function(response){
    return response;
  });
};
this.getCurrentUser = function(){
  return $http({
    method: 'GET',
    url: '/me',
  }).then(function(response){
    return response;
  });
};
this.destroyUser = function(id){
  var deferred = $q.defer();
  $http({
    method: 'DELETE',
    url: "/api/users/" + id
  }).then(function(response){
    deferred.resolve(response);
  })
  return deferred.promise
}


this.createUser = function(body){
  var deferred = $q.defer();
  $http({
    method: 'POST',
    url: "/api/users",
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.updateUser = function(id, body){
  var deferred = $q.defer();
  $http({
    method: 'PUT',
    url: "/api/users/" + id,
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}

/*
get user data = this.user
get allStockItems
 this.allStockItems = data.data
get recipes
get Orders
>>>>>>> f72121ea51ebae26222804326f16c68880d62639

this.User = {}
this.stockItems = {}

function getUser (){
return this.User
}


*/
//Schema objects
//
// this.user = {
//  "name" : "",
//  "e-mail" : "",
//  "phone" : "",
//  "password" : "",
//  "createDate": ""
// }
//
// this.stockItem = {
//  "userId" : "",
//  "name" : "",
//  "description" : "",
//  "quantity" : 0,
//  "unitOfMeasure" : "",
//  "alertQuantity" : 0,
//  "alertDate" : ""
// }
//
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


//This var brings the scope back to the mainService
//allowing the data to be saved to the service.
var self = this;


//These are your stockItems requests
this.getDataStockItems =  function(id){
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: "/api/stockItems/" + id
  }).then(function(response){
    self.allStockItems = response.data;
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.destroyStockItems = function(id){
  var deferred = $q.defer();
  $http({
    method: 'DELETE',
    url: "/api/stockItems/" + id
  }).then(function(response){
    deferred.resolve(response);
  })
  return deferred.promise
}
this.createStockItems = function(body){
  var deferred = $q.defer();
  $http({
    method: 'POST',
    url: "/api/stockItems",
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.updateStockItems = function(id, body){
  var deferred = $q.defer();
  $http({
    method: 'PUT',
    url: "/api/stockItems/" + id,
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}

//These are your recipes requests
this.getDataRecipes =  function(id){
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: "/api/recipes/" + id
  }).then(function(response){
     self.allRecipes = response.data;
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.destroyRecipes = function(id){
  var deferred = $q.defer();
  $http({
    method: 'DELETE',
    url: "/api/recipes/" + id
  }).then(function(response){
    deferred.resolve(response);
  })
  return deferred.promise
}
this.createRecipes = function(body){
  var deferred = $q.defer();
  $http({
    method: 'POST',
    url: "/api/recipes",
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.updateRecipes = function(id, body){
  var deferred = $q.defer();
  $http({
    method: 'PUT',
    url: "/api/recipes/" + id,
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}

//These are your orders requests
this.getDataOrders =  function(id){
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: "/api/orders/" + id
  }).then(function(response){
    self.allOrders = response.data;
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.destroyOrders = function(id){
  var deferred = $q.defer();
  $http({
    method: 'DELETE',
    url: "/api/orders/" + id
  }).then(function(response){
    deferred.resolve(response);
  })
  return deferred.promise
}
this.createOrders = function(body){
  var deferred = $q.defer();
  $http({
    method: 'POST',
    url: "/api/orders",
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.updateOrders = function(id, body){
  var deferred = $q.defer();
  $http({
    method: 'PUT',
    url: "/api/orders/" + id,
    data: body
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}



//This is where all of our data and how to access it is going to live.
this.user = "";
this.userId = function(){
  return this.user;
}
this.allStockItems = {};
this.retrieveStockItems = function(){
  return this.allStockItems;
}
this.allRecipes = {};
this.retrieveAllRecipes = function(){
  return this.allRecipes;
}
this.allOrders = {};
this.retrieveAllOrders = function(){
  return this.allOrders;
}
})
