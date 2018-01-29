export const login = {
  template: require('./login.html'),
  controller(AccountService, $log) {
    const vm = this;

    vm.email = '';
    vm.password = '';

    vm.loginUser = (email, password) => {
      AccountService.loginUser(email, password).success(data => {
        $log.log(data);
      });
    };

    vm.$onInit = () => {
    };
  }
};

login.$inject = ['account.service', '$log'];
