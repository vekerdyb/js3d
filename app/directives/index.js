export default ngModule => {
  require('./extended-canvas')(ngModule);
  require('./simple-3d-canvas')(ngModule);
};