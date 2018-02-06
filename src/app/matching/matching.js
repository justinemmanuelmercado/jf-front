export const matching = {
  template: require('./matching.html'),
  controller(AccountService, $cookies, $state, $log, $scope, $rootScope) {
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

      const onStateChange = $rootScope.$on('$stateChangeStart', () => {
        vm.ws.close();
      });

      $log.log(onStateChange);

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

          if (convertedMessageData.message === 'newMatchesApplicant') {
            vm.matches = convertedMessageData.matches;
            $log.log('new match', vm.matches);
            $scope.$digest();
          }

          if (convertedMessageData.message === 'newMatchesBusiness') {
            vm.matches = convertedMessageData.matches;
            $log.log('new match', vm.matches);
            $scope.$digest();
          }

          $log.log(convertedMessageData);
        };
      });
    };

    vm.openConnection = () => {
      vm.ws = new WebSocket('ws://localhost:8079');
    };
  }
};

matching.$inject = [
  'account.service',
  '$cookies',
  '$state',
  '$log',
  '$scope',
  '$rootScope'
];

