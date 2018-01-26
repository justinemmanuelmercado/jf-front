export const SearchService = ($http, $log) => {
  return {
    getJobs: search => {
      return $http.get(`http://localhost:8000/api/jobs/${search}`).then(data => {
        $log.log(data);
        return data.data;
      }).catch(err => $log(err));
    }
  };
};

SearchService.$inject = ['$http', '$log'];

