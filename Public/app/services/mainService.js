angular.module('hermes').service('mainService', function($http){

// Login Controller //
this.createNewUser = function(newUser){
  return $http({
    method: "POST",
    url: '', //TBD
    data: newUser,
  }).then(function(response){
    return reponse;
  });
};
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





});
