export const header = {
  template: require('./header.html'),
  controller($cookies) {
    const vm = this;
    vm.isLoggedIn = false;
    vm.$onInit = () => {
      if ($cookies.get('token')) {
        vm.isLoggedIn = true;
      }
    };
  }
};

header.$inject = ['$cookies'];
