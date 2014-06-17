angular.module('ziaxgazapp', ['ionic', 'ziaxgazapp.providers', 'ziaxgazapp.controllers', 'ziaxgazapp.services', 'ziaxgazapp.directives']).

constant('FINALS', {
  // host: 'http://host.ziax.dk:8081/'
  host: 'http://s.ziax.dk/'
})

.run(['$ionicPlatform', '$rootScope', '$state', '$timeout', 'User', 'Hardware', 'GPS', 'FINALS',
  function($ionicPlatform, $rootScope, $state, $timeout, User, Hardware, GPS, FINALS) {

  $ionicPlatform.ready(function() {
    console.log('ionicPlatform ready.');
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    console.log('Using host', FINALS.host);
    Hardware.vibrate(200);
    
    document.addEventListener("pause", function () {
      console.log('Pause');
      GPS.stopGps();
    }, false);
    document.addEventListener("resume", function () {
      console.log('Resume');
      GPS.reset();
      GPS.startGps();
    }, false);
    document.addEventListener("backbutton", function () {
      console.log('backbutton');
    }, false);
  });
  GPS.reset();
  GPS.startGps();


  $rootScope.user = User.get();

  // $rootScope.$on('$stateChangeError', function() {
  //   console.log('$stateChangeError', arguments);
  // });

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
}])

.config(['$stateProvider', '$urlRouterProvider', 'GPSProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, GPSProvider, $httpProvider) {

    GPSProvider.rootScopeVariable('position');
    GPSProvider.intervalVariable(10000);

    $httpProvider.interceptors.push(function($q, User) {
      return {
       request: function(config) {
          var u = User.get(),
              url = config.url;
          if (u && (url.indexOf('/v4') !== -1 || url.indexOf('/api') !== -1)) {
            // console.log('YUP', config);
            config.params = angular.extend({}, config.params, { uid: u.id, hid: u.hid });
          }
          return config;
        }
      };
    });

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
}]);

// document.addEventListener('deviceready', function () {
//   angular.bootstrap(document.body, [ 'detkoeberjeg' ]);
// }, false);