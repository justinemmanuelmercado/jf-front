export const messaging = {
  template: require('./messaging.html'),
  controller(AccountService, $log, $cookies, $state, $stateParams) {
    const vm = this;

    vm.email = '';
    vm.password = '';
    vm.authToken = '';
    vm.messages = [];
    vm.userDetails = {};
    vm.recipientDetails = {};
    vm.recipientId = '';
    vm.message = '';
    vm.recipientName = '';

    vm.$onInit = () => {
      if (!$cookies.get('token')) {
        $state.go('app');
      }

      vm.recipientId = $stateParams.recipientId;

      vm.authToken = $cookies.get('token');
      AccountService.getData(vm.authToken).then(data => {
        vm.userDetails = data.data;
        $log.log(vm.userDetails);
        vm.refreshMessages();
      });
    };

    vm.refreshMessages = () => {
      AccountService.getMessages(vm.authToken, vm.recipientId).then(data => {
        vm.recipientDetails = data.recipient;
        vm.messages = data.messages;
        $log.log('recipient: ', vm.recipientDetails);
        if (vm.recipientDetails.recipient.type === 1) {
          vm.recipientName = `${vm.recipientDetails.additional.first_name} ${vm.recipientDetails.additional.last_name}`;
        } else {
          vm.recipientName = vm.recipientDetails.additional.business_name;
        }
      });
    };

    vm.sendMessage = () => {
      AccountService.sendMessage(vm.authToken, vm.recipientId, vm.message).then(data => {
        vm.refreshMessages();
        $log.log(data);
        vm.clearMessage();
        return;
      });
    };

    vm.clearMessage = () => {
      vm.message = '';
      vm.refreshMessages();
    };
  }
};

messaging.$inject = ['account.service', '$log', '$cookies', '$state', '$stateParams'];
