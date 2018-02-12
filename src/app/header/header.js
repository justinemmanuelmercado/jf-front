export const header = {
  template: require('./header.html'),
  controller($cookies, AccountService, $rootScope, $log) {
    const vm = this;
    vm.isLoggedIn = false;
    vm.authToken = {};
    vm.isLoggedIn = Boolean($cookies.get('token'));
    vm.userDetails = {};

    vm.watchRoot = $rootScope.$on('$stateChangeSuccess', () => {
      vm.isLoggedIn = Boolean($cookies.get('token'));
    });

    vm.logOut = () => {
      AccountService.logOut();
    };

    vm.$onInit = () => {
      vm.authToken = $cookies.get('token');
      vm.isLoggedIn = Boolean($cookies.get('token'));
      if (vm.isLoggedIn) {
        AccountService.getData(vm.authToken).then(data => {
          vm.userDetails = data.data;
          $log.log('header details', vm.userDetails);
        });
      }
    };
  }
};

header.$inject = ['$cookies', 'account.service', '$rootScope', '$log'];
