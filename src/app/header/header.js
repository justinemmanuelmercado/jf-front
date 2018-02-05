export const header = {
  template: require('./header.html'),
  controller($cookies, AccountService, $rootScope) {
    const vm = this;
    vm.isLoggedIn = false;
    vm.isLoggedIn = Boolean($cookies.get('token'));

    vm.watchRoot = $rootScope.$on('$stateChangeSuccess', () => {
      vm.isLoggedIn = Boolean($cookies.get('token'));
    });

    vm.logOut = () => {
      AccountService.logOut();
    };

    vm.$onInit = () => {
      vm.isLoggedIn = Boolean($cookies.get('token'));
    };
  }
};

header.$inject = ['$cookies', 'account.service', '$rootScope'];
