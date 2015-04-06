export default ngModule => {

  describe(`SvgCanvasManager`, () => {

    beforeEach(window.module(ngModule.name));

    var elem, sut;

    beforeEach(inject((_SvgCanvasManager_) => {
      elem = angular.element('<svg></svg>');
      sut = _SvgCanvasManager_;

    }));

    it(`should exist`, () => {
      expect(sut).toBeDefined();
    });

    describe(`initializer method`, () => {

      it(`should exist`, () => {
        expect(sut.init).toBeDefined();
      });

      it(`should initialize with an svg element`, () => {
        sut.init(elem);
        expect(sut.elem).toBe(elem);
      });

    });

    describe(`adding objects`, () => {

      var circle;

      beforeEach(() => {
        sut.init(elem);
        circle = {"circle" : {cx: 4, cy: 5, r: 3}};
      });

      it(`should be possible to add a new object`, () => {
        var testObj = {test: {test: 4}};
        expect(sut.addObject).toBeDefined();
        sut.addObject(testObj);
        expect(sut.objects.length).toBe(1);
        expect(sut.objects[0]).toBe(testObj);
      });

      it(`should add the object to the html element`, () => {
        sut.addObject(circle);
        expect(sut.elem.html()).toBe(`<circle cx="${circle["circle"].cx}" cy="${circle["circle"].cy}" r="${circle["circle"].r}"></circle>`);
      });

      it(`should not add empty attributes`, () => {
        var circle = {"circle" : {cx: 4, cy: 5, r: 3, boo: null, hoo: undefined}};
        sut.addObject(circle);
        expect(sut.elem.html()).toBe(`<circle cx="${circle["circle"].cx}" cy="${circle["circle"].cy}" r="${circle["circle"].r}"></circle>`);
      });

      describe(`circle`, () => {

        it(`should exist`, () => {
          expect(sut.circle).toBeDefined();
        });

        it(`should add a circle to the svg`, () => {
          sut.circle(4, 5, 3);
          expect(sut.elem.html()).toContain(`<circle cx="4" cy="5" r="3" stroke="black" stroke-width="1" fill="white"></circle>`);
          sut.circle(4, 5, 3, "green", 1, "red");
          expect(sut.elem.html()).toContain(`<circle cx="4" cy="5" r="3" stroke="green" stroke-width="1" fill="red"></circle>`);
        });

      });

    });


  });

}