export const AccountService = ($http, $log, $cookies, $state, $window, $filter) => {
  const apiUrl = 'http://localhost:8000';
  return {
    getData: authToken => {
      return $http.post(`${apiUrl}/api/auth/me?token=${authToken}`).then(data => {
        return data;
      }).catch(err => $log.log(err));
    },
    loginUser: (email, password) => {
      return $http.post(`${apiUrl}/api/auth/login`, {email, password}).then(data => {
        const today = new Date();
        const expiresValue = new Date(today);
        expiresValue.setSeconds(today.getSeconds() + 3600);
        $cookies.put('token', data.data.access_token, {
          expires: expiresValue
        });
        $state.go('profile');
        $window.location.reload();
        return data;
      });
    },
    registerUser: data => {
      return $http.post(`${apiUrl}/api/users`, data).then(data => {
        $log.log(data);
        $state.go('login');
        return data.data;
      });
    },
    getUsers: () => {
      return $http.get(`${apiUrl}/api/users`).then(data => {
        $log.log(data);
        return data.data;
      }).catch(err => $log.log(err));
    },
    logOut: () => {
      $cookies.remove('token');
      $state.go('login');
      $window.location.reload();
    },
    getUserData: id => {
      return $http.get(`${apiUrl}/api/users/${id}`).then(data => {
        $log.log(data);
        return data;
      }).catch(err => $log.log(err));
    },
    getJobData: id => {
      return $http.get(`${apiUrl}/api/jobs/${id}`).then(data => {
        $log.log(data);
        return data;
      }).catch(err => $log.log(err));
    },
    sendMessage: (authToken, recipient, message) => {
      return $http.post(`${apiUrl}/api/auth/message?token=${authToken}`, {message, recipient}).then(data => {
        $log.log(data);
        return data.data;
      });
    },
    getMessages: (authToken, recipient) => {
      return $http.post(`${apiUrl}/api/auth/get_message?token=${authToken}`, {recipient}).then(data => {
        $log.log('Messages data: ', data.data);
        return data.data;
      });
    },
    getSkills: () => {
      return $http.get(`${apiUrl}/api/skills`).then(data => {
        $log.log(data);
        return data.data;
      });
    },
    addSkillApplicant: (skill, id) => {
      const skillName = skill.skill;
      const skillYears = skill.years_exp;
      return $http.post(`${apiUrl}/api/skills/applicant`, {skillName, skillYears, id}).then(data => {
        $log.log(data);
        return data.data;
      });
    },
    updateApplicant: applicant => {
      applicant.dateOfBirth = $filter('date')(applicant.dateOfBirth, 'yyyy-MM-dd');
      return $http.post(`${apiUrl}/api/applicant`, applicant).then(data => {
        $log.log(applicant, applicant);
        $state.go('profile');
        return data;
      });
    },
    deleteSkillApplicant: id => {
      return $http.post(`${apiUrl}/api/applicant/delete`, {id}).then(data => {
        $log.log(data);
        return data;
      });
    },
    businessSaveJob: job => {
      return $http.post(`${apiUrl}/api/business/job`, job).then(data => {
        $log.log('Save Job return: ', data);
        return data;
      });
    },
    updateBusiness: business => {
      return $http.post(`${apiUrl}/api/business/update`, business).then(data => {
        return data;
      });
    }
  };
};

AccountService.$inject = ['$http', '$log', '$cookies', '$state', '$window', '$filter'];
