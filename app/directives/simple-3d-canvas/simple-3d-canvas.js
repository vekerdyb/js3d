export default ngModule => {

  if (ON_TEST) {
    //require('./kcd-hello.test.js')(ngModule);
  }

  ngModule.directive('simple3dCanvas', () => {
    require('./simple-3d-canvas.scss');
    return {
      restrict: 'E',
      scope: {},
      template: ``,
      controllerAs: 'vm',
      controller: function($timeout) {
        $timeout(function () {
          var canvas = document.createElement('canvas'),
            width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight,
            depth = 100,
            center = {x: width/2, y: height/2, z: depth / 2};

          var context = canvas.getContext('2d');
          document.body.appendChild(canvas);

          var maxPixelSize = 10;
          var maxSpeed = 5;
          var fov = depth;

// RULES
          var numberOfPixels = 300;


          function random(number) {
            return Math.floor((Math.random() * number));
          };

          function drawPixel(pixel) {
            context.beginPath();
            var x = pixel.x,
              y = pixel.y,
              z = pixel.z,
              size = pixel.size;
            var zish = Math.max(0, (z) / fov);
            var modX = (x * zish);
            var modY = (y * zish);
            context.arc(modX + center.x, modY + center.y, zish * size, 0, 2*Math.PI);
            context.fillStyle = 'blue';
            context.fill();
          }

          function randomPixel() {
            return {
              x: random(width) - width / 2,
              y: random(height) - height / 2,
              z: 0,
              speed: random(maxSpeed) + 1,
              size: random(maxPixelSize) + 1
            }
          }

          var items = [];
          for (var i = 0; i < numberOfPixels; i++) {
            items.push(randomPixel());
          }

          var status = 0;
          function update() {
            items.forEach(function(item, index, array) {
              item.z += item.speed;
              if (item.z <= 1.5 * depth) {
                array[index] = item;
              } else {
                array[index] = randomPixel();
              }
            });
          }

          function draw() {
            context.clearRect(0, 0, width, height);
            items.forEach(function(item) {
              drawPixel(item);
            });
            context.strokeStyle = "red";
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(center.x - 3, center.y);
            context.lineTo(center.x + 3, center.y);
            context.moveTo(center.x, center.y - 3);
            context.lineTo(center.x, center.y + 3);

            context.stroke();
          }


          var fps = 40;

          function gameLoop() {
            setTimeout(function() {
              requestAnimationFrame(gameLoop);
              update();
              draw();
            }, 1000 / fps);
          }

          gameLoop();

        });
     }
    }
  })
}