angular.module('ziaxgazapp', ['ionic', 'ziaxgazapp.controllers', 'ziaxgazapp.services', 'ziaxgazapp.directives'])

.run(function($ionicPlatform, $rootScope, $state, $timeout, User) {
  var watchId;
  function startGps() {
    console.log('Starting GPS');
    if (watchId) return;
    watchId = window.navigator.geolocation.watchPosition(function(position) {
      console.log('Got position', position.coords);
    }, function(err) {
      alert(err);
    }, {
      maximumAge: 10,
      timeout: 90000,
      enableHighAccuracy: true
    });
  }

  function stopGps() {
    console.log('Stopping GPS');
    if (!watchId) return;
    window.navigator.geolocation.clearWatch(watchId);
    watchId = undefined;
  }


  document.addEventListener("deviceready", function () {
    console.log('deviceready');


    document.addEventListener("pause", function () {
      console.log('Pause');
      stopGps();
    }, false);
    document.addEventListener("resume", function () {
      console.log('Resume');
      startGps();
    }, false);
    startGps();
  }, false);



  function out() {
    console.log(arguments);
  }

  // $ionicPlatform.ready(function() {
  //   if(window.StatusBar) {
  //     StatusBar.styleDefault();
  //   }
  // });

  $rootScope.user = User.get();

  $rootScope.$on('$stateChangeError', function() {
    console.log('$stateChangeError', arguments);
  });

  $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromstate, fromParams) {
    if ($rootScope.user && toState.name == 'login') {
      // console.log('$stateChangeStart', toState);
      // evt.preventDefault();
      $timeout(function() {
        $state.go('app.new', {}, { notify: true });
      }, 1);
      return;
    }

    if (!$rootScope.user && "login logout".indexOf($state.current.name) != -1) {
      $timeout(function() {
        $state.go('login', {}, { notify: true });
      }, 1);
      return;
    }
  });

  Array.prototype.spliceRem = function(cb) {
    for (var i = this.length - 1; i >= 0; i--) {
      if (cb(this[i]))
        this.splice(i, 1);
      // if (this[i].id == item.id) {
      //   this.splice(i, 1);
      // }
    }
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: "tmpl/login.html",
      controller: 'LoginCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl',
      resolve: {
        logout: function(User) {
          console.log('resolve', User);
        }
      }
    })

    .state('app', {
      data: { protected: true },
      url: "/app",
      abstract: true,
      templateUrl: "tmpl/menu.html"
      // controller: 'AppCtrl'
    })

    .state('app.new', {
      url: "/new",
      views: {
        'menuContent' :{
          templateUrl: "tmpl/new.html",
          controller: 'NewCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "tmpl/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/login');
});

// document.addEventListener('deviceready', function () {
//   angular.bootstrap(document.body, [ 'detkoeberjeg' ]);
// }, false);