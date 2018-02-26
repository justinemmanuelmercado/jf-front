export const SearchService = ($http, $log) => {
  const apiUrl = 'http://45.77.134.231:8000';
  return {
    getJobs: () => {
      return $http.get(`${apiUrl}/api/jobs`).then(data => {
        $log.log(data);
        return data.data;
      }).catch(err => $log(err));
    },
    getRecommended: userData => {
      return $http.get(`${apiUrl}/api/jobs`).then(data => {
        const toReturn = [];
        $log.log('User return: ', userData);
        $log.log('Server return: ', data);

        data.data.forEach(job => {
          let score = 0;
          userData.requirements.some(skill => {
            job.jobRequirements.forEach(requirement => {
              if (skill.skill === requirement.requirement && skill.years_exp >= requirement.years_exp) {
                score++;
              }
            });
            return score > 1;
          });
          if (score > 1) {
            toReturn.push(job);
          }
        });
        return toReturn;
      });
    }
  };
};

SearchService.$inject = ['$http', '$log'];

