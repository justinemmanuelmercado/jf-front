export const jobs = {
  template: require('./jobs.html'),
  controller(AccountService, $log, $cookies, $stateParams) {
    const vm = this;

    vm.jobDetails = {};
    vm.jobId = '';
    vm.$onInit = () => {
      vm.jobId = $stateParams.jobId;
      vm.authToken = $cookies.get('token');
      AccountService.getJobData(vm.jobId).then(data => {
        vm.jobDetails = data.data;
        $log.log(vm.jobDetails);
      });
    };
  }
};

jobs.$inject = ['account.service', '$log', '$cookies', '$stateParams'];
