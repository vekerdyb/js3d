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
  })
}