angular.module('ziaxgazapp.services', [])

.service('User', function($window) {
  return {
    get: function() {
      var user;
      if (user) return user;
      var json = $window.localStorage.getItem('user');
      if (!json) return;
      user = JSON.parse(json);
      return user;
    },
    create: function(email, password) {
      var user = {
        email: email,
        password: password,
        name: 'ziaxdk',
        settings: {
          closeWindowNewProduct: true,
          slideLeftTransfer: true,
          slideRightBuy: true
        }
      };
      return user;
    },
    store: function(user) {
      $window.localStorage.setItem('user', JSON.stringify(user));
    },
    remove: function() {
      $window.localStorage.removeItem('user');
    }
  };
})


.service('GPSSer', [function() {
  var watchId, gpsCallback;
  function startGps() {
    console.log('Starting GPS');
    if (watchId) return;
    watchId = window.navigator.geolocation.watchPosition(function(position) {
      console.log('Got position', position);
      if (!gpsCallback) return;
      gpsCallback(position.coords);
    }, function(err) {
      alert(err);
    }, {
      maximumAge: 10,
      timeout: 90000,
      enableHighAccuracy: true
    });
    console.log('GPS started', watchId);
  }

  function stopGps() {
    console.log('Stopping GPS');
    if (!watchId) return;
    window.navigator.geolocation.clearWatch(watchId);
    watchId = undefined;
  }

  return {
    startGps: startGps,
    stopGps: stopGps,
    setCb: function(cb) {
      gpsCallback = cb;
    }
  };
}]);