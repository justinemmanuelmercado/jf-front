export const AccountService = ($http, $log) => {
  const apiUrl = 'http://localhost:8000';
  return {
    loginUser: (email, password) => {
      return $http.post(`${apiUrl}/api/auth/login`, {email, password}).then(data => {
        $log.log(data);
        return data;
      });
    },
    registerUser: data => {
      return $http.post(`${apiUrl}/api/users`, data).then(data => {
        $log.log(data);
        return data.data;
      });
    },
    getUsers: () => {
      return $http.get(`${apiUrl}/api/users`).then(data => {
        $log.log(data);
        return data.data;
      }).catch(err => $log.log(err));
    }
  };
};

AccountService.$inject = ['$http', '$log'];
