export const search = {
  template: require('./search.html'),
  controller(SearchService, $log, $stateParams) {
    const vm = this;

    vm.searchResults = [];
    vm.searchFilter = '';
    vm.maxResults = 10;
    vm.currentPage = 1;

    vm.$onInit = () => {
      if ($stateParams.search) {
        vm.searchFilter = $stateParams.search;
      }

      SearchService.getJobs('search').then(results => {
        vm.searchResults = results;
        $log.log(vm.searchResults);
      }).catch(err => {
        $log.log(err);
      });
    };
  }
};

search.$inject = ['search.service', '$log', '$stateParams'];
