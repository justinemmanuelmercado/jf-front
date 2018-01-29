export const RegistrationService = ($http, $log) => {
  const apiUrl = 'http://localhost:8000';
  return {
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

RegistrationService.$inject = ['$http', '$log'];
