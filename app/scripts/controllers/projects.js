'use strict';

/**
* @ngdoc function
* @name masterThesisApp.controller:ProjectCtrl
* @description
* # ProjectCtrl
* Controller of the masterThesisApp
*/
angular.module('masterThesisApp')
.controller('ProjectsCtrl', function ($scope, $http, $modal, $log) {
  $scope.data = {};
  $scope.data.projects = [];

   $scope.selectProject = function(project){
   $scope.projectName = project;
 }

  $scope.moreDetails = function(project, details){

  //  pop-up window
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal_project_detail.html',
            controller: 'ModalProjectDetailCtrl',
            resolve: {
              input: function () {
                var temp = {};
                temp.project = project;
                return temp;
              }
            }
          });

        modalInstance.result.then(function (newProject) {
            $scope.projectName = projectName;

            }, function () {
                  $log.info('Modal dismissed at: ' + new Date());
               });

  }

  $scope.updateProjectList = function(){
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

    });
  };

  $scope.addProject = function(size, project, details){

    $scope.projectName = project;
    console.log ($scope.projectName);

  //  pop-up window
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal_add_project.html',
            controller: 'ModalAddProjectCtrl',
  //          size: 'lg',
            resolve: {
              input: function () {
                var temp = {};
                temp.projectName = $scope.projectName;
                return temp;
              }
            }
          });

        modalInstance.result.then(function () {
            $scope.updateProjectList();
            }, function () {
                  $log.info('Modal dismissed at: ' + new Date());
               });

  }

    $scope.updateProjectList();
});
