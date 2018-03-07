export const user = {
  template: require('./user.html'),
  controller(AccountService, $log, $cookies, $state, $stateParams, $scope) {
    const vm = this;

    vm.userDetails = {};
    vm.userId = '';

    vm.$onInit = () => {
      vm.userId = $stateParams.userId;
      AccountService.getUserData(vm.userId).then(data => {
        vm.userDetails = data.data;
        $scope.map = {
          center: {
            latitude: vm.userDetails.data.latitude,
            longitude: vm.userDetails.data.longitude
          }, zoom: 15
        };
        $scope.marker = {
          id: 0, coords: {
            latitude: vm.userDetails.data.latitude, longitude: vm.userDetails.data.longitude
          },
          options: {
            draggable: false
          },
          events: {}
        };
        $log.log('details', vm.userDetails);
      });
    };

    vm.calculateAge = birthday => { // birthday is a date
      if (!birthday) {
        return '';
      }
      birthday = new Date(birthday);
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    vm.returnEducationAttained = education => {
      if (education === 1) {
        return 'Elementary or lower';
      }

      if (education === 2) {
        return 'High School';
      }

      if (education === 3) {
        return 'College level';
      }
    };
  }
};

user.$inject = ['account.service', '$log', '$cookies', '$state', '$stateParams', '$scope'];
