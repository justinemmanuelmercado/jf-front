export const matching = {
  template: require('./matching.html'),
  controller(AccountService,
    $cookies,
    $state,
    $log,
    $scope,
    $rootScope,
    $timeout,
    $uibModal) {
    const vm = this;
    vm.userDetails = {};
    vm.matches = [];
    vm.availableMatches = [];
    vm.ws = {};
    vm.loadingMatches = false;
    vm.matchModalInstance = {};
    vm.noMatchModalInstance = {};

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
          $log.log('Connected to websockets', vm.userDetails);
          if (vm.userDetails.type === 1) {
            vm.ws.send(angular.toJson(vm.userDetails));
          }
        };
        vm.ws.onmessage = msg => {
          const convertedMessageData = angular.fromJson(msg.data);

          if (convertedMessageData.message === 'newMatchesApplicant') {
            convertedMessageData.matches.forEach(business => {
              business.jobs.forEach(job => {
                vm.matches.push({
                  job,
                  business
                });
              });
            });
            $log.log('new match', vm.matches);
          }

          if (convertedMessageData.message === 'additionalMatchesApplicant') {
            const business = convertedMessageData.business;
            convertedMessageData.jobMatches.some(job => {
              let matchedAlready = false;
              vm.matches.some(match => {
                const jobId = match.job.id;
                if (jobId === job.id) {
                  matchedAlready = true;
                }
                return matchedAlready;
              });
              if (!matchedAlready) {
                vm.matches.push({
                  job,
                  business
                });
              }
              return matchedAlready;
            });
          }

          if (convertedMessageData.message === 'newMatchesBusiness' || convertedMessageData.message === 'additionalMatchesBusiness') {
            vm.matches.push(convertedMessageData.matches);
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

    vm.onStartMatching = () => {
      vm.loadingMatches = true;
      if (vm.userDetails.type === 2) {
        vm.ws.send(angular.toJson(vm.userDetails));
        return;
      }
      vm.availableMatches = vm.matches;
      $log.log('current matches => ', vm.matches);
      if (vm.availableMatches.length > 0) {
        $timeout(() => {
          vm.loadMatch();
        }, 2000);
      } else {
        $timeout(() => {
          vm.noMatches();
        }, 5000);
      }
    };

    vm.loadMatch = () => {
      if (vm.matches.length === 0) {
        vm.noMatches();
        return;
      }
      const randIndex = Math.floor(Math.random() * vm.availableMatches.length);
      const randMatch = vm.availableMatches[randIndex];
      vm.loadingMatches = false;
      vm.availableMatches.splice(randIndex, 1);

      vm.matchModalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'matchModal.html',
        controller: matchModalController,
        controllerAs: '$ctrl',
        size: 'lg',
        backdrop: 'static',
        resolve: {
          match: () => randMatch
        }
      });

      vm.matchModalInstance.result.then(msg => {
        if (msg === 'next') {
          vm.loadingMatches = true;
          $timeout(() => {
            vm.loadMatch();
          }, 1000);
        }

        if (msg === 'message') {
          $state.go('message');
        }

        if (msg === 'view') {
          $state.go('view-job');
        }
      }, () => {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.noMatches = () => {
      vm.loadingMatches = false;
      vm.noMatchModalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'noMatchModal.html',
        controller: noMatchModalController,
        controllerAs: '$ctrl',
        size: 'lg',
        backdrop: 'static'
      });
    };
  }
};

matching.$inject = [
  'account.service',
  '$cookies',
  '$state',
  '$log',
  '$scope',
  '$rootScope',
  '$timeout',
  '$uibModal'
];

const matchModalController = ['$uibModalInstance', 'match', '$log', function ($uibModalInstance, match, $log) {
  const vm = this;
  vm.match = match;

  $log.log('Open match');

  vm.ok = msg => {
    $uibModalInstance.close(msg);
  };
}];

const noMatchModalController = ['$uibModalInstance', '$log', function ($uibModalInstance, $log) {
  const vm = this;

  $log.log('Open match');

  vm.ok = () => {
    $uibModalInstance.close();
  };
}];

