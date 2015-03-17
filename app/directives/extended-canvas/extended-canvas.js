export default ngModule => {

  if (ON_TEST) {
    require('./extended-canvas.test.js')(ngModule);
  }

  function ExtendedCanvas() {
    return {
      restrict: 'E',
      template: `<canvas></canvas>`
    }
  }

  ngModule.directive('extendedCanvas', ExtendedCanvas)
}