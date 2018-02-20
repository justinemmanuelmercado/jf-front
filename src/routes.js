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
    })
    .state('profile', {
      url: '/profile',
      component: 'profile'
    })
    .state('matching', {
      url: '/matching',
      component: 'matching'
    })
    .state('recommended', {
      url: '/recommended',
      component: 'recommended'
    })
    .state('user', {
      url: '/profile/:userId',
      component: 'user'
    })
    .state('job', {
      url: '/job/:jobId',
      component: 'jobs'
    })
    .state('messaging', {
      url: '/messaging/:recipientId',
      component: 'messaging'
    })
    .state('update', {
      url: '/update',
      component: 'update'
    });
}
