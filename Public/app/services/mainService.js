angular.module('hermes').service('mainService', function($http, $q){

/*
get user data = this.user
get allStockItems
 this.allStockItems = data.data
get recipes
get Orders

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
//  "recipes" : {
//      "name" :"",
//      "id" : "",
//      "quantity" : 0
//  }
// }

//These are your user requests
this.findUser = function(id, key){
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: "/api/users/" + id + "," + key
  }).then(function(response){
    deferred.resolve(response.data);
  })
  return deferred.promise
}

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
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.findIndividualStockItems = function(id){
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: "/api/stockItems/" + id
  }).then(function(response){
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
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.findIndividualRecipes = function(id){
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: "/api/recipes/" + id
  }).then(function(response){
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
    deferred.resolve(response.data);
  })
  return deferred.promise
}
this.findIndividualOrders = function(id){
  var deferred = $q.defer();
  $http({
    method: 'GET',
    url: "/api/orders/" + id
  }).then(function(response){
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
})
