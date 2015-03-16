export default ngModule => {
  describe(`kcd-hello`, () => {
    beforeEach(window.module(ngModule.name));

    it(`should test properl`, () => {
      expect(false).toBe(false);
    });
  })
}