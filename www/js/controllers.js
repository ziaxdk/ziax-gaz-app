angular.module('ziaxgazapp.controllers', ['ziaxgazapp.services'])

.controller('LoginCtrl', function($rootScope, $scope, $location, $state, $ionicViewService, $timeout, User) {
  $scope.user = {};
  $scope.signIn = function (user) {
    // console.log(user, $scope.user, $scope);
    if (user.email === '1' && user.password === '1') {
      console.log('ok. Signing in');
      var theUser = User.create(user.email, user.password);
      User.store(theUser);
      $rootScope.user = theUser;
      $state.go('app.new');
    }
  };
})

.controller('NewCtrl', function($rootScope, $scope, $ionicModal) {
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
