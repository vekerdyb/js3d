export default ngModule => {
  var inject = ["CanvasPlus"];

  function random(number) {
    return Math.floor((Math.random() * number));
  };

  class ExampleController {

    constructor(...args) {
      inject.forEach((injectable, i) => this[injectable] = args[i]);
      this.canvas = document.getElementById('canvas1').children[0];
      this.CanvasPlus.init(this.canvas);
      this.CanvasPlus.setContext({shadow: {blur: 20}});
      this.drawRandomCircles(200);
      this.CanvasPlus.drawGaussianCircle(this.canvas.width / 2, this.canvas.height / 2, 200)
    }

    drawRandomCircles(count) {
      for (let i = 0; i < count; i++) {
        this.CanvasPlus.drawCircle(
          random(this.canvas.width),
          random(this.canvas.width),
          random(20)
        )
      }
    }

  }

  ExampleController.$inject = inject;

  ngModule.controller('ExampleController', ExampleController);

}