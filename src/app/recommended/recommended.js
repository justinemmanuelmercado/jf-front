export const recommended = {
  template: require('./recommended.html'),
  controller(AccountService, SearchService, $cookies, $log, $state) {
    const vm = this;
    vm.userDetails = {};
    vm.recommendedResults = [];
    vm.maxResults = 10;
    vm.currentPage = 1;
    vm.searchFilter = '';

    vm.$onInit = () => {
      if (!$cookies.get('token')) {
        $state.go('app');
      }
      vm.authToken = $cookies.get('token');
      AccountService.getData(vm.authToken).then(data => {
        vm.userDetails = data.data;
        SearchService.getRecommended(vm.userDetails).then(results => {
          $log.log('Search results:', results);
          vm.recommendedResults = results;
        });
      });
    };
  }
};

recommended.$inject = ['account.service', 'search.service', '$cookies', '$log', '$state'];
