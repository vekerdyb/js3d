export default ngModule => {
  describe(`svgCanvas`, () => {
    beforeEach(window.module(ngModule.name));

    var el, isolateScope;

    beforeEach(inject(($rootScope, $compile) => {
      var scope = $rootScope.$new();
      el = $compile(angular.element('<svg-canvas></svg-canvas>'))(scope);
      scope.$digest();
      isolateScope = el.isolateScope();
    }));

    it(`should create a canvas`, () => {
      expect(el.find(`svg`).length).toBe(1);
    });
  })
}