angular.module('hermes', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: './app/routes/home/home.html',
    controller: 'mainCtrl',
  })
  .state('login', {
    url: '/login',
    templateUrl: './app/routes/login/login.html',
    controller: 'loginCtrl',
  })
  .state('profile', {
    url: '/profile',
    templateUrl: './app/routes/login/profile.html',
    controller: 'loginCtrl',
  })
  .state('stockItems', {
    url: '/stockItems',
    templateUrl: './app/routes/stockItems/stockItems.html',
    controller: 'stockItemsCtrl',
  })
  .state('recipes', {
    url: '/recipes',
    templateUrl: './app/routes/recipes/recipes.html',
    controller: 'recipesCtrl',
  })
  .state('orders', {
    url: '/orders',
    templateUrl: './app/routes/orders/orders.html',
    controller: 'ordersCtrl',
  })
  .state('alerts', {
    url: '/alerts',
    templateUrl: './app/routes/alerts/alerts.html',
    controller: 'alertsCtrl',
  })

  $urlRouterProvider.otherwise('/home');



});
