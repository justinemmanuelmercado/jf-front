export const profile = {
  template: require('./profile.html'),
  controller(AccountService, $log, $cookies, $state, $scope) {
    const vm = this;

    vm.email = '';
    vm.password = '';
    vm.authToken = '';
    vm.userDetails = {};

    vm.$onInit = () => {
      if (!$cookies.get('token')) {
        $state.go('app');
      }

      vm.authToken = $cookies.get('token');
      AccountService.getData(vm.authToken).then(data => {
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
        $log.log(vm.userDetails);
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

profile.$inject = ['account.service', '$log', '$cookies', '$state', '$scope'];
