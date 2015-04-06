export default ngModule => {

  if (ON_TEST) {
    require('./svg-canvas.test.js')(ngModule);
  }

  class SvgCanvasManager {

    init(elem) {
      this.objects = [];
      this.elem = elem;

      this.htmls = {
        "circle": "<circle></circle>"
      };
    }

    addHtml(tag, attrsObj) {
      let html = tag;
      let attrs = "";
      Object.keys(attrsObj).forEach(attr => {
        var value = attrsObj[attr];
        if (angular.isDefined(value) && value !== null) {
          attrs += ` ${attr}=${value}`
        }
      });
      this.elem.append(`<${html} ${attrs}></${html}>`);
    }

    addObject(object) {
      if (object) {
        this.objects.push(object);
        Object.keys(object).forEach(key => {
          this.addHtml(key, object[key]);
        });
      } else {
        console.error("SVG-Canvas: Object not defined")
      }
    }

    circle(x=0, y=0, r=1, stroke="black", strokeWidth=1, fill="white") {
      var circle = {
        "circle" : {
          cx: x,
          cy: y,
          r: r,
          stroke: stroke,
          "stroke-width": strokeWidth,
          fill: fill
        }
      };
      this.addObject(circle);
    }
  }

  ngModule.service('SvgCanvasManager', SvgCanvasManager);

}