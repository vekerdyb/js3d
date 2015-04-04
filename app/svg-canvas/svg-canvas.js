export default ngModule => {

  if (ON_TEST) {
    require('./svg-canvas.test.js')(ngModule);
  }

  function SvgCanvas() {
    return {
      restrict: 'E',
      template: `<svg></svg>`
    }
  }

  ngModule.directive('svgCanvas', SvgCanvas)

}