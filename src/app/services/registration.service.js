export const RegistrationService = ($http, $log) => {
  const apiUrl = 'http://localhost:8000';
  return {
    registerBusiness: data => {
      return $http.post(`${apiUrl}/api/users`, data).then(data => {
        $log.log(data);
        return data.data;
      }).catch(err => $log.log(err));
    },
    registerApplicant: data => {
      return $http.post(`${apiUrl}/api/users`, data).then(data => {
        $log.log(data);
        return data.data;
      }).catch(err => $log.log(err));
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

