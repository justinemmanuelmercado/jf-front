
/*eslint-disable */
import angular from 'angular';
/*eslint-enable */

// Components
import {home} from './app/home/home';
import {header} from './app/header/header';
import {registration} from './app/registration/registration';
import {search} from './app/search/search';
import {login} from './app/login/login';
import {profile} from './app/profile/profile';
import {matching} from './app/matching/matching';
import {recommended} from './app/recommended/recommended';
import {user} from './app/user/user';
import {jobs} from './app/jobs/jobs';
import {messaging} from './app/messaging/messaging';
import {update} from './app/update/update';

// Services/Factories
import {AccountService} from './app/services/account.service';
import {SearchService} from './app/services/search.service';

// Vendor
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-cookies';
import 'lodash';
import 'angular-simple-logger';
import 'angular-google-maps';

import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngCookies', 'uiGmapgoogle-maps'])
  .config(routesConfig)
  .component('app', home)
  .component('headerBar', header)
  .component('registration', registration)
  .component('search', search)
  .component('login', login)
  .component('profile', profile)
  .component('matching', matching)
  .component('recommended', recommended)
  .component('user', user)
  .component('jobs', jobs)
  .component('messaging', messaging)
  .component('update', update)
  .factory('account.service', AccountService)
  .factory('search.service', SearchService)
  .config(['uiGmapGoogleMapApiProvider', uiGmapGoogleMapApiProvider => {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCDuJfEa0g92pOOjsB7o08avrqror9q0Zo',
      v: '3.20',
      libraries: 'places'
    });
  }]);
