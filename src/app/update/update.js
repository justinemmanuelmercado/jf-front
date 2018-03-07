export const update = {
  template: require('./update.html'),
  controller(AccountService, $log, $cookies, $state, $scope, uiGmapGoogleMapApi) {
    const vm = this;

    vm.email = '';
    vm.password = '';
    vm.authToken = '';
    vm.userDetails = {};
    vm.skillsAvailable = [];
    vm.skillSelect = {};
    vm.newJob = {};
    /*eslint-disable */
    vm.addressPickerOptions = {
      distanceWidget: true,
      addressComponents: true,
      elements: {
        map: true,
        lat: true,
        lng: true,
        street_number: true,
        route: true,
        locality: true,
        administrative_area_level_3: true,
        administrative_area_level_2: true,
        administrative_area_level_1: true,
        country: true,
        postal_code: true,
        type: true
      }
    };
    /*eslint-enable */
    vm.$onInit = () => {
      if (!$cookies.get('token')) {
        $state.go('app');
      }

      vm.authToken = $cookies.get('token');
      AccountService.getData(vm.authToken).then(data => {
        vm.userDetails = data.data;
        vm.newJob = {
          businessId: vm.userDetails.id,
          requirements: []
        };

        /*eslint-disable */
        $scope.map = { center: { 
          latitude: vm.userDetails.data.latitude,
          longitude:  vm.userDetails.data.longitude 
        }, zoom: 15 };
        $scope.searchbox = {
          template: 'searchbox.tpl.html',
          events: {
            places_changed: searchBox => {
              const place = searchBox.getPlaces();
              $log.log(place);
              if (!place || place == 'undefined' || place.length == 0) {
                $log.log('no place data :(');
                return;
              }

              vm.userDetails.data.latitude = place[0].geometry.location.lat();
              vm.userDetails.data.longitude = place[0].geometry.location.lng();

              $scope.map = {
                "center": {
                  "latitude": place[0].geometry.location.lat(),
                  "longitude": place[0].geometry.location.lng()
                },
                "zoom": 18
              };
              $scope.marker = {
                id: 0,
                coords: {
                  latitude: place[0].geometry.location.lat(),
                  longitude: place[0].geometry.location.lng()
                }
              };
            }
          }
        };
        $scope.marker = {
          id: 0, coords: {
            latitude: vm.userDetails.data.latitude, longitude: vm.userDetails.data.longitude
          },
          options: { draggable: true },
          events: {
            dragend: (marker, eventName, args) => {
              $scope.marker.options = {
                draggable: true,
                labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                labelAnchor: "100 0",
                labelClass: "marker-labels"
              };

              vm.userDetails.data.latitude = $scope.marker.coords.latitude;
              vm.userDetails.data.longitude = $scope.marker.coords.longitude;
            }
          }
        };
        uiGmapGoogleMapApi.then(function (maps) {
          $log.log('Maps data', maps);
          maps.visualRefresh = true;
        });
        /*eslint-enable */

        $log.log(vm.userDetails);
      });

      AccountService.getSkills().then(data => {
        vm.skillsAvailable = data;
        $log.log(vm.skillsAvailable);
      });
    };

    vm.addRequirement = () => {
      AccountService.addSkillApplicant(vm.skillSelect, vm.userDetails.id).then(data => {
        $log.log(data);
      });

      vm.userDetails.requirements.push(vm.skillSelect);
      vm.skillSelect = {};
    };

    vm.saveProfile = () => {
      AccountService.updateApplicant({
        id: vm.userDetails.id,
        firstName: vm.userDetails.data.first_name,
        lastName: vm.userDetails.data.last_name,
        dateOfBirth: vm.userDetails.data.date_of_birth,
        number: vm.userDetails.data.number,
        educationAttained: vm.userDetails.data.education_attained,
        education: vm.userDetails.data.education,
        email: vm.userDetails.data.email
      }).then(data => {
        $log.log(data);
      });
    };

    vm.deleteSkillApplicant = id => {
      AccountService.deleteSkillApplicant(id).then(data => {
        vm.userDetails.requirements.some((val, ind) => {
          if (val.id === id) {
            vm.userDetails.requirements.splice(ind, 1);
            return true;
          }
          return false;
        });
        $log.log(data);
      });
    };

    vm.addSkillToJob = newSkill => {
      vm.newJob.requirements.push(newSkill);
      vm.newSkill = {};
    };

    vm.saveJob = () => {
      $log.log(vm.newJob);
      AccountService.businessSaveJob(vm.newJob).then(() => {
        AccountService.getData(vm.authToken).then(data => {
          vm.userDetails = data.data;
          $log.log(vm.userDetails);
        });
      });
      vm.newJob = {
        businessId: vm.userDetails.id,
        requirements: []
      };
    };

    vm.deleteJobSkill = ind => {
      vm.newJob.requirements.splice(ind, 1);
    };

    vm.updateBusinessDetails = () => {
      AccountService.updateBusiness({
        id: vm.userDetails.id,
        businessName: vm.userDetails.data.business_name,
        description: vm.userDetails.data.description,
        latitude: vm.userDetails.data.latitude,
        longitude: vm.userDetails.data.longitude
      }).then(data => {
        $log.log('update business return', data);
      });
    };
  }
};

update.$inject = ['account.service', '$log', '$cookies', '$state', '$scope', 'uiGmapGoogleMapApi'];
