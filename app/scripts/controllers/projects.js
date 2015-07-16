'use strict';

/**
 * @ngdoc function
 * @name masterThesisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the masterThesisApp
 */
angular.module('masterThesisApp')
  .controller('ProjectsCtrl', function ($scope, $http) {

    $http.post('http://localhost:7474/db/data/transaction/commit', {
  "statements" : [ {
    "statement" : 'Match (project:Project) RETURN project '
  } ]
}).
  success(function(data, status, headers, config) {
    $scope.projects = data.results[0].data;
  });

  $scope.selectProject = function(project){

    $scope.projectName = project;
  }

  });
