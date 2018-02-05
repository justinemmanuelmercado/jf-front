export const matching = {
  template: require('./matching.html'),
  controller(AccountService, $cookies, $state, $log, $scope) {
    const vm = this;
    vm.userDetails = {};
    vm.matches = [];
    vm.ws = {};
    vm.$onInit = () => {
      if (!$cookies.get('token')) {
        $state.go('app');
      }

      $scope.$on('$destroy', () => {
        vm.ws.close();
      });

      AccountService.getData($cookies.get('token')).then(data => {
        vm.userDetails = data.data;
        $log.log('User data', vm.userDetails);
        vm.openConnection();
        vm.ws.onopen = () => {
          $log.log('Connected to websockets');
          vm.ws.send(angular.toJson(vm.userDetails));
        };
        vm.ws.onmessage = msg => {
          const convertedMessageData = angular.fromJson(msg.data);

          if (convertedMessageData.message === 'newMatches') {
            vm.matches = convertedMessageData.matches;
            $log.log('new match', vm.matches);
            $scope.$digest();
          }

          if (convertedMessageData.message === 'update') {
            vm.matches.concat(convertedMessageData.matches);
            $scope.$digest();
          }
          $log.log(convertedMessageData);
        };
        vm.ws.close = () => {
          vm.ws.send({
            message: 'close',
            id: vm.userDetails.id
          });
          $log.log('Closing websocket');
        };
      });
    };

    vm.openConnection = () => {
      vm.ws = new WebSocket('ws://localhost:8079');
    };
  }
};

matching.$inject = ['account.service', '$cookies', '$state', '$log', '$scope'];
