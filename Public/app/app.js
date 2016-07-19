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
    resolve: {
      user: function(mainService, $state) {
        return mainService.getCurrentUser().then(function(response) {
          if (response.data){
            return response.data;
          }
        }).catch(function(err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }
    }
  })
  .state('stockItems', {
    url: '/stockItems',
    templateUrl: './app/routes/stockItems/stockItems.html',
    controller: 'stockItemsCtrl',
    resolve: {
      user: function(mainService, $state) {
        return mainService.getCurrentUser().then(function(response) {
          if (response.data){
            return response.data;
          }
        }).catch(function(err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }
    }
  })
  .state('recipes', {
    url: '/recipes',
    templateUrl: './app/routes/recipes/recipes.html',
    controller: 'recipesCtrl',
    resolve: {
      user: function(mainService, $state) {
        return mainService.getCurrentUser().then(function(response) {
          if (response.data){
            return response.data;
          }
        }).catch(function(err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }
    }
  })
  .state('orders', {
    url: '/orders',
    templateUrl: './app/routes/orders/orders.html',
    controller: 'ordersCtrl',
    resolve: {
      user: function(mainService, $state) {
        return mainService.getCurrentUser().then(function(response) {
          if (response.data){
            return response.data;
          }
        }).catch(function(err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }
    }
  })
  .state('alerts', {
    url: '/alerts',
    templateUrl: './app/routes/alerts/alerts.html',
    controller: 'alertsCtrl',
    resolve: {
      user: function(mainService, $state) {
        return mainService.getCurrentUser().then(function(response) {
          if (response.data){
            return response.data;
          }
        }).catch(function(err) {
          $state.go('login');
          alert('You need to login to access this page');
        });
      }
    }
  })

  $urlRouterProvider.otherwise('/home');
//


});
