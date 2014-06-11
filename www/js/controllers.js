angular.module('ziaxgazapp.controllers', ['ziaxgazapp.services'])

.controller('LoginCtrl', function($rootScope, $scope, $location, $state, $ionicViewService, $timeout, User, Rest) {
  $scope.user = {};
  $scope.signIn = function (user) {
    Rest.authorize(user.email, user.password)
      .success(function(theUser) {
        User.store(theUser);
        $rootScope.user = theUser;
        $state.go('app.new');
      });
  };
})

.controller('NewCtrl', function($rootScope, $scope, $ionicModal, $filter, Rest) {
  $scope.form = {
    purchaseDateUtc: $filter("date")(Date.now(), 'yyyy-MM-dd')
  };
  Rest.vehicles().success(function(data) { $scope.vehicles = data.hits.hits; $scope.form.vehicle = $scope.vehicles[0].id; }).error(function(err) { throw err; });
  $rootScope.$watch('position', function(v) {
    if (v.hasFix) {
      Rest.stationsNear(v.latitude, v.longitude)
        .success(function(data) {
          $scope.stations = data.hits.hits;
          if ($scope.stations.length !== 0) {
            $scope.form.station = $scope.stations[0].id;
            angular.forEach($scope.stations, function(v) {
              v.display = v.source.name + ' (' + v.sort[0].toFixed(2) + ')';
            });
          }
          $scope.stations.push({ id: 'new', display: 'new...'});
        });
    }
  }, true);

  $scope.submit = function() {
    angular.extend($scope.form, { type: 'gaz', tags: [], onlyAuth: false });

    Rest.store($scope.form);
  };
})

.controller('LogoutCtrl', function($rootScope, $scope, $state, User) {
  console.log('Logout');
  delete $rootScope.user;
  // // $rootScope.user = null;
  User.remove();
  $state.go('login');
})

.controller('SettingsCtrl', function($rootScope, $scope, User) {
});
