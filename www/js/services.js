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

;