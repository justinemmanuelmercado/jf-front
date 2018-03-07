export const login = {
  template: require('./login.html'),
  controller(AccountService, $log) {
    const vm = this;

    vm.email = '';
    vm.password = '';
    vm.invalidLogin = false;

    vm.onTypeCredentials = () => {
      if (vm.invalidLogin) {
        vm.invalidLogin = false;
      }
      return;
    };

    vm.loginUser = (email, password) => {
      AccountService.loginUser(email, password).then(data => {
        $log.log(data);
      }, err => {
        $log.error(err);
        vm.invalidLogin = true;
      });
    };

    vm.$onInit = () => {
    };
  }
};

login.$inject = ['account.service', '$log'];
