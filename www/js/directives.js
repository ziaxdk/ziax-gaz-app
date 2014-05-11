(function() {
  var m = angular.module('ziaxgazapp.directives', []);

  "SwipeRight SwipeLeft".split(' ').forEach(function(action) {
    var ngName = 'z' + action;
    m.directive(ngName, function($ionicGesture) {
      return {
        link: function($scope, $element, $attrs) {
          $ionicGesture.on(action.toLowerCase(), function(e) {
            $scope.$apply($attrs[ngName]);
          }, $element);
        }
      };
    });
  });

  m.directive('zTouchRelease', function($ionicGesture, $animate) {
    // console.log($animate)
    return function($scope, $element, $attrs) {
      $ionicGesture.on('touch', function(e) {
        $element.addClass('zTouchRelease');
      }, $element);
      $ionicGesture.on('release', function(e) {
        $element.removeClass('zTouchRelease');
      }, $element);
    };
  });

}());


