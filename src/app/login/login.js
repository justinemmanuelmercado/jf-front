export const login = {
  template: require('./login.html'),
  controller(AccountService, $log) {
    const vm = this;

    vm.email = '';
    vm.password = '';

    vm.loginUser = (email, password) => {
      AccountService.loginUser(email, password).then(data => {
        $log.log(data);
      }, err => {
        $log.error(err);
      });
    };

    vm.$onInit = () => {
    };
  }
};

login.$inject = ['account.service', '$log'];
