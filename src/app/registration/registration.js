export const registration = {
  template: require('./registration.html'),
  controller(RegistrationService, $log) {
    const vm = this;
    vm.applicantEmail = '';
    vm.applicantPassword = '';
    vm.businessEmail = '';
    vm.businessPassowrd = '';

    vm.$onInit = () => {
      RegistrationService.getUsers().then(data => {
        $log.log(data);
      });
    };

    vm.registerApplicant = () => {
      const data = {
        email: vm.applicantEmail,
        password: vm.applicantPassword,
        type: 1
      };

      $log.log(data);

      RegistrationService.registerApplicant(data).then(response => {
        $log.log(response);
      });
    };

    vm.registerBusiness = () => {
      const data = {
        email: vm.businessEmail,
        password: vm.businessPassword,
        type: 2
      };

      RegistrationService.registerBusiness(data);
    };

    vm.isLoggedIn = false;
  }
};

registration.$inject = ['registration.service', '$log'];
