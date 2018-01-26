export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('registration', {
      url: '/registration',
      component: 'registration'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('search', {
      url: '/search/:search',
      component: 'search'
    });
}
