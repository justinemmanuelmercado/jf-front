export const registration = {
  template: require('./registration.html'),
  controller(AccountService, $log, $uibModal) {
    const vm = this;
    vm.applicantEmail = '';
    vm.applicantPassword = '';
    vm.businessEmail = '';
    vm.businessPassword = '';
    vm.applicantValid = true;
    vm.businessValid = true;

    vm.$onInit = () => {
      AccountService.getUsers().then(data => {
        $log.log(data);
      });
    };

    vm.registerUser = (email, password, type, notRobot) => {
      if (!email || !password || !notRobot) {
        if (type === 1) {
          vm.applicantValid = false;
          return;
        }
        if (type === 2) {
          vm.businessValid = false;
          return;
        }
      } else {
        if (type === 1) {
          vm.applicantValid = true;
        }
        if (type === 2) {
          vm.businessValid = true;
        }
      }

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

    vm.passwordComplex = password => {
      if (!password) {
        return false;
      }
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      return password.match(regex);
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

