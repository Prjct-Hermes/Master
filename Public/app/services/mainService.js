angular.module('hermes').service('mainService', function($http, $q){

//This var brings the scope back to the mainService
//allowing the data to be saved to the service.
var self = this;


  // Login Controller //
this.login = function(user){
  return $http({
    method: 'POST',
    url: '/login',
    data: user
  }).then(function(response){
    self.user = response.data._id;
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
  })
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
this.alerts = [];
this.createAlerts = function(data){
  this.alerts = data;
}
this.retrieveAlerts = function(){
  return this.alerts;
}
})
