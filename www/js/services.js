angular.module('ziaxgazapp.services', [])

.service('User', function($window) {
  this.get = function() {
    var user;
    if (user) return user;
    var json = $window.localStorage.getItem('user');
    if (!json) return;
    user = JSON.parse(json);
    return user;
  };

  this.create = function(user) {
    if (!user) throw new Error("no user");
    angular.extend(user, { settings: { closeWindowNewProduct: true, slideLeftTransfer: true, slideRightBuy: true } });
    return user;
  };
  this.store = function(user) {
    $window.localStorage.setItem('user', JSON.stringify(user));
  };
  this.remove = function() {
    $window.localStorage.removeItem('user');
  };
})


// .service('GPSSer', [function() {
//   var watchId, gpsCallback;
//   this.startGps = function() {
//     console.log('Starting GPS');
//     if (watchId) return;
//     watchId = window.navigator.geolocation.watchPosition(function(position) {
//       console.log('Got position', position);
//       if (!gpsCallback) return;
//       gpsCallback(position.coords);
//     }, function(err) {
//       alert(err);
//     }, {
//       maximumAge: 10,
//       timeout: 90000,
//       enableHighAccuracy: true
//     });
//     console.log('GPS started', watchId);
//   };

//   this.stopGps = function() {
//     console.log('Stopping GPS');
//     if (!watchId) return;
//     window.navigator.geolocation.clearWatch(watchId);
//     watchId = undefined;
//   };

//   this.setCb = function(cb) {
//     gpsCallback = cb;
//   };
// }])

.service('Rest', ['$http', 'User', 'FINALS', function($http, User, FINALS) {
  var _host = FINALS.host;

  this.testv4 = function() {
    return $http.post(_host + 'v4', { x: 1, y: 2 });
    // var u = User.get();
    // return $http.get('http://localhost:8081/v4', { params: { uid: u.id, hid: u.hid }});
  };
  this.vehicles = function() {
    return $http.post(_host + 'api/vehicle/list');
  };
  this.authorize = function(uid, lastname) {
    return $http.post(_host + 'api/appauth', { uid: uid, lastname: lastname });
  };
  this.stationsNear = function(lat, lon) {
    return $http.post(_host + 'api/stations_near', { lat: lat, lon: lon });
  };
  this.store = function(gaz) {
    return $http.post(_host + 'api/document2', gaz);
  };
}])

.service('Hardware', [function() {
  this.vibrate = function(timeMs) {
    if (window.navigator && window.navigator.notification && window.navigator.notification.vibrate) {
      window.navigator.notification.vibrate(200);
    }
  };
}]);