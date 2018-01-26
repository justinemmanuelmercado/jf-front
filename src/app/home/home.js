export const home = {
  template: require('./home.html'),
  controller() {
    const vm = this;
    vm.isLoggedIn = false;
  }
};
