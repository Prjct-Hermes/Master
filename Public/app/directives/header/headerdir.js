angular.module('hermes').directive('headerdir',function(){
  return {
    restrict:"E",
    templateUrl:"./app/directives/header/header.html",
    controller:"headerCtrl"
  }
})
