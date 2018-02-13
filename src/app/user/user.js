export const user = {
  template: require('./user.html'),
  controller(AccountService, $log, $cookies, $state, $stateParams) {
    const vm = this;

    vm.userDetails = {};
    vm.userId = '';

    vm.$onInit = () => {
      vm.userId = $stateParams.userId;
      AccountService.getUserData(vm.userId).then(data => {
        vm.userDetails = data.data;
        $log.log('details', vm.userDetails);
      });
    };

    vm.calculateAge = birthday => { // birthday is a date
      if (!birthday) {
        return '';
      }
      birthday = new Date(birthday);
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
  }
};

user.$inject = ['account.service', '$log', '$cookies', '$state', '$stateParams'];
