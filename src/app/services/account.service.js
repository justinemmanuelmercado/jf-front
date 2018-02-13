export const AccountService = ($http, $log, $cookies, $state, $window) => {
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
    }
  };
};

AccountService.$inject = ['$http', '$log', '$cookies', '$state', '$window'];
