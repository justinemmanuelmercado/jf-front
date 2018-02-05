export const AccountService = ($http, $log, $cookies, $state) => {
  const apiUrl = 'http://localhost:8000';
  return {
    getData: authToken => {
      return $http.post(`${apiUrl}/api/auth/me?token=${authToken}`).then(data => {
        return data;
      }).catch(err => $log.log(err));
    },
    loginUser: (email, password) => {
      return $http.post(`${apiUrl}/api/auth/login`, {email, password}).then(data => {
        $cookies.put('token', data.data.access_token);
        $state.go('profile');
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
    }
  };
};

AccountService.$inject = ['$http', '$log', '$cookies', '$state'];
