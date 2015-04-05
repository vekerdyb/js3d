export default ngModule => {

  if (ON_TEST) {
    require('./svg-canvas.test.js')(ngModule);
  }

  class SvgCanvasManager {

  }

  ngModule.service('SvgCanvasManager', SvgCanvasManager);

}