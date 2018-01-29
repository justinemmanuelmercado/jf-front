export const registration = {
  template: require('./registration.html'),
  controller(AccountService, $log, $uibModal) {
    const vm = this;
    vm.applicantEmail = '';
    vm.applicantPassword = '';
    vm.businessEmail = '';
    vm.businessPassowrd = '';

    vm.$onInit = () => {
      AccountService.getUsers().then(data => {
        $log.log(data);
      });
    };

    vm.registerUser = (email, password, type) => {
      const data = {
        email,
        password,
        type
      };

      AccountService.registerUser(data).then(() => {
        vm.successModal = privateServices.registrationSuccessModal($uibModal);
      }, err => {
        $log.error(err);
      });

      vm.isLoggedIn = false;
    };
  }
};
registration.$inject = ['account.service', '$log', '$uibModal', '$state'];

const privateServices = {
  registrationSuccessModal: $uibModal => {
    $uibModal.open({
      animation: true,
      template: `<div class="modal-header">
                    <div class="modal-body" id="modal-body">
                        <h3>Success!</h3>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button" ng-click="close()">OK</button>
                    </div>`,
      controller: ['$uibModalInstance', '$scope', ($uibModalInstance, $scope) => {
        $scope.close = () => {
          $uibModalInstance.close();
        };
      }],
      controllerAs: '$ctrl',
      size: 'sm'
    });
  }
};
