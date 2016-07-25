angular.module('hermes').controller('headerCtrl',function($scope, mainService){

  var getUser = mainService.getCurrentUser().then(function(response){
    $scope.user = response.data._id;
    $scope.alertItems = mainService.retrieveStockItems();


    $scope.alerts = [];

    (function(){
      for (var i = 0; i < $scope.alertItems.length; i++){
        if($scope.alertItems[i].quantity <= $scope.alertItems[i].alertQuantity){
          var alert = {
            name: $scope.alertItems[i].name,
            id: $scope.alertItems[i]._id,
            quantity: $scope.alertItems[i].quantity,
            alertQuantity: $scope.alertItems[i].alertQuantity
          }
          $scope.alerts.push(angular.copy(alert));
        }
      }
      $scope.alertLength = $scope.alerts.length;
      mainService.createAlerts($scope.alerts);
    })();
  });
});



















// angular.module('hermes').controller('headerCtrl',function($scope, mainService){
//
//   var getUser = mainService.getCurrentUser().then(function(response){
//     $scope.user = response.data._id;
//
//     (function(){
//       $scope.alertItems = mainService.retrieveStockItems();
//     })();
//
//     $scope.alerts = [];
//
//     (function(){
//       for (var i = 0; i < $scope.alertItems.length; i++){
//         if($scope.alertItems[i].quantity <= $scope.alertItems[i].alertQuantity){
//           var alert = {
//             name: $scope.alertItems[i].name,
//             id: $scope.alertItems[i]._id,
//             quantity: $scope.alertItems[i].quantity,
//             alertQuantity: $scope.alertItems[i].alertQuantity
//           }
//           $scope.alerts.push(angular.copy(alert));
//         }
//       }
//       $scope.alertLength = $scope.alerts.length;
//       mainService.createAlerts($scope.alerts);
//     })();
//   });
// });
