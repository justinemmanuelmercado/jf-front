import angular from 'angular';

// Components
import {home} from './app/home/home';
import {header} from './app/header/header';
import {registration} from './app/registration/registration';
import {search} from './app/search/search';
import {login} from './app/login/login';
import {profile} from './app/profile/profile';
import {matching} from './app/matching/matching';

// Services/Factories
import {AccountService} from './app/services/account.service';
import {SearchService} from './app/services/search.service';

// Vendor
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-cookies';

import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngCookies'])
  .config(routesConfig)
  .component('app', home)
  .component('headerBar', header)
  .component('registration', registration)
  .component('search', search)
  .component('login', login)
  .component('profile', profile)
  .component('matching', matching)
  .factory('account.service', AccountService)
  .factory('search.service', SearchService);
