export default ngModule => {
  describe(`simple-2d-canvas`, () => {
    beforeEach(window.module(ngModule.name));

    var el, isolateScope;

    beforeEach(inject(($rootScope, $compile) => {
      var scope = $rootScope.$new();
      el = $compile(angular.element('<extended-canvas></extended-canvas>'))(scope);
      scope.$digest();
      isolateScope = el.isolateScope();
    }));

    it(`should create a canvas`, () => {
      expect(el.find(`canvas`).length).toBe(1);
    });
  })
}