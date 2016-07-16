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
