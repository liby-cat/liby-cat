app.directive('svgIcon', function iconSvg() {
  return {
    restrict: 'E',
    scope: {
      size: '@',
      icon: '@',
      i: '@',
      s: '@'
    },
    template: `<md-icon md-svg-icon="{{icon}}" style="{{styleText}}"></md-icon>`,
    link: function link($s) {
      $s.icon = $s.icon ? $s.icon : $s.i;
      $s.size = $s.size ? $s.size : $s.s;
      $s.styleText = $s.size ? 'height: ' + $s.size + 'px; width: ' + $s.size + 'px' : '';
    }
  };
});
