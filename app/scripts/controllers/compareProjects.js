'use strict';

/**
 * @ngdoc function
 * @name masterThesisApp.controller:compareProjectsCtrl
 * @description
 * # compareProjectsCtrl
 * Controller of the masterThesisApp
 */
angular.module('masterThesisApp')
  .controller('compareProjectsCtrl', function ($scope, $http, $modal, $log) {
    $scope.data = {};
    $scope.data.projects = [];

     $scope.selectProject = function(project){
     $scope.projectName = project;
   };

   $scope.isValid = function(){
   };

    $scope.moreDetails = function(project, details){
          modalInstance.result.then(function (newProject) {
              $scope.projectName = projectName;

              }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                 });

    };

    $scope.getProjectList = function(){
      $http.post('http://localhost:7474/db/data/transaction/commit', {
        "statements" : [ {
          "statement" : 'Match (project:Project) RETURN project '
        } ]
      }).
      success(function(data, status, headers, config) {
        $scope.data.projects = [];
        for(var i = 0; i < data.results[0].data.length; i++){
          $scope.data.projects.push(data.results[0].data[i].row[0]);
        }
        console.log($scope.data.projects);

      });
    };
      $scope.getProjectList();
      console.log($scope.data.projects);
  });
