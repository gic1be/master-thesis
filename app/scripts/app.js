'use strict';

/**
 * @ngdoc overview
 * @name masterThesisApp
 * @description
 * # masterThesisApp
 *
 * Main module of the application.
 */
angular
  .module('masterThesisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngTagsInput'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'projects'
      })
      .when('/compareProjects', {
        templateUrl: 'views/compareProjects.html',
        controller: 'compareProjectsCtrl',
        controllerAs: 'compareProjects'
      })
      .when('/extendedSearch', {
        templateUrl: 'views/extendedSearch.html',
        controller: 'extendedSearchCtrl',
        controllerAs: 'extendedSearch'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
