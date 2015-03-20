export default ngModule => {

  if (ON_TEST) {
    require('./extended-canvas.test.js')(ngModule);
  }

  function ExtendedCanvas() {
    return {
      restrict: 'E',
      template: `<canvas>No canvas available :/</canvas>`
    }
  }

  ngModule.directive('extendedCanvas', ExtendedCanvas)

  var inject = [];

  class CanvasPlus {
    constructor(...args) {
      inject.forEach((injectable, i) => this[injectable] = args[i]);
      this.objects = [];
      this.options = {
        fill: 'blue',
        stroke: {
          color: 'white',
          width: 1
        },
        shadow: {
          color: 'blue',
          blur: 0,
          offset: {
            x: 0,
            y: 0
          }
        }
      }
    }

    init(canvas, options=this.options) {
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
      this.setContext();
    }

    setContext(options=this.options) {
      options = angular.merge(this.options, options);
      this.context.fillStyle = options.fill;
      this.context.strokeStyle = options.stroke.color;
      this.context.lineWidth = options.stroke.width;
      this.context.shadowColor = options.shadow.color;
      this.context.shadowBlur = options.shadow.blur;
      this.context.shadowOffsetX = options.shadow.offset.x;
      this.context.shadowOffsetY = options.shadow.offset.y;
    }

    drawCircle(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, 2*Math.PI);
      this.context.fill();
    }

    drawGaussianCircle(centerX, centerY, r) {
      var tempCanvas = document.getElementById('tmp-canvas');
      var tempContext = tempCanvas.getContext('2d');
      var img = document.getElementById("transparent");
      tempContext.drawImage(img, 0, 0);
      var imgData = tempContext.getImageData(0, 0, 2 * r, 2 * r);

      //for (var x = 0; x < 2*r; x += 4) {
      //  for (var y = 0; y < 2*r; y += 4) {
      //    var base = (x * r) + y;
      //    console.log(imgData.data[base]);
      //    imgData.data[base] = 50;
      //    imgData.data[base + 1] = 50;
      //    imgData.data[base + 2] = 50;
      //    imgData.data[base + 3] = 255;
      //  }
      //}
      var newImg = new Image();
      newImg.data = imgData;
      this.context.drawImage(newImg, centerX - r/2, centerY - r/2);

    }

  }

  CanvasPlus.$inject = inject;

  ngModule.service('CanvasPlus', CanvasPlus);


}