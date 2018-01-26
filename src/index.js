import angular from 'angular';

// Components
import {home} from './app/home/home';
import {header} from './app/header/header';
import {registration} from './app/registration/registration';
import {search} from './app/search/search';

// Services/Factories
import {RegistrationService} from './app/services/registration.service';
import {SearchService} from './app/services/search.service';

// Vendor
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';

import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ui.bootstrap', 'ngAnimate'])
  .config(routesConfig)
  .component('app', home)
  .component('headerBar', header)
  .component('registration', registration)
  .component('search', search)
  .factory('registration.service', RegistrationService)
  .factory('search.service', SearchService);
