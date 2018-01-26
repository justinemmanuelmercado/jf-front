export const search = {
  template: require('./search.html'),
  controller(SearchService, $log) {
    const vm = this;

    vm.searchResults = [];
    vm.searchFilter = '';

    vm.$onInit = () => {
      SearchService.getJobs('search').then(results => {
        vm.searchResults = results;
        $log.log(vm.searchResults);
      }).catch(err => {
        $log.log(err);
      });
    };
  }
};

search.$inject = ['search.service', '$log'];
