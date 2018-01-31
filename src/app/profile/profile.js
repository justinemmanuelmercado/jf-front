export const profile = {
  template: require('./profile.html'),
  controller(AccountService, $log, $cookies, $state) {
    const vm = this;

    vm.email = '';
    vm.password = '';
    vm.authToken = '';
    vm.userDetails = {};

    vm.$onInit = () => {
      if (!$cookies.get('token')) {
        $state.go('app');
      }

      vm.authToken = $cookies.get('token');
      AccountService.getData(vm.authToken).then(data => {
        vm.userDetails = data.data;
        $log.log(vm.userDetails);
      });
    };

    vm.calculateAge = birthday => { // birthday is a date
      if (!birthday) {
        return '';
      }
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
  }
};

profile.$inject = ['account.service', '$log', '$cookies', '$state'];
