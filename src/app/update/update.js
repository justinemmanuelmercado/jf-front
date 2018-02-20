export const update = {
  template: require('./update.html'),
  controller(AccountService, $log, $cookies, $state) {
    const vm = this;

    vm.email = '';
    vm.password = '';
    vm.authToken = '';
    vm.userDetails = {};
    vm.skillsAvailable = [];
    vm.skillSelect = {};

    vm.$onInit = () => {
      if (!$cookies.get('token')) {
        $state.go('app');
      }

      vm.authToken = $cookies.get('token');
      AccountService.getData(vm.authToken).then(data => {
        vm.userDetails = data.data;
        $log.log(vm.userDetails);
      });

      AccountService.getSkills().then(data => {
        vm.skillsAvailable = data;
        $log.log(vm.skillsAvailable);
      });
    };

    vm.addRequirement = () => {
      AccountService.addSkillApplicant(vm.skillSelect, vm.userDetails.id).then(data => {
        $log.log(data);
      });

      vm.userDetails.requirements.push(vm.skillSelect);
      vm.skillSelect = {};
    };

    vm.saveProfile = () => {
      AccountService.updateApplicant({
        id: vm.userDetails.id,
        firstName: vm.userDetails.data.first_name,
        lastName: vm.userDetails.data.last_name,
        dateOfBirth: vm.userDetails.data.date_of_birth
      }).then(data => {
        $log.log(data);
      });
    };
  }
};

update.$inject = ['account.service', '$log', '$cookies', '$state'];
