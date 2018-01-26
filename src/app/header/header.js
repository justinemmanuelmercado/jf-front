export const header = {
  template: require('./header.html'),
  controller() {
    const vm = this;
    vm.isLoggedIn = false;
  }
};
