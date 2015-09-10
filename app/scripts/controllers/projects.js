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
 };

 // use a dropdown menu
 // $('.dropdown-toggle').dropdown();

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
            // $scope.projectName = projectName;

            }, function () {
                  $log.info('Modal dismissed at: ' + new Date());
               });
  };


  $scope.updateProjectList = function(){
    $http.post('http://localhost:7474/db/data/transaction/commit', {
      "statements" : [ {
        "statement" : 'Match (project:Project) RETURN project '
      } ]
    }).
    success(function(data, status, headers, config) {
      $scope.data.projects = [];
      var projectTypes = [];
      var helpvar = [];
      for(var i = 0; i < data.results[0].data.length; i++){
        var found = $scope.data.projects.indexOf(data.results[0].data[i].row[0].type);

        $scope.data.projects.push(data.results[0].data[i].row[0]);

        projectTypes.push({type: data.results[0].data[i].row[0].type});

        if (helpvar.indexOf(data.results[0].data[i].row[0].type) === -1) helpvar.push(data.results[0].data[i].row[0].type);
      }

      // is used in dropdown selection of a type
      $scope.formats = helpvar;
      $scope.format = $scope.formats[0];

      var test1 = [];
      for (var j=0; j <helpvar.length; j++){
        test1.push({name: helpvar[j]});
      }
      $scope.data.projects.type = [];
      $scope.data.projects.type = test1;
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
  };


  // show Additional Properties
  $scope.data.getProperties = function(){
    $http.post('http://localhost:7474/db/data/transaction/commit', {
      "statements" : [ {
        "statement" : 'MATCH (n: Value_Dim), (m:Part_of_Dim), (o:Dimension) RETURN *'
      } ]
    }).
    success(function(data, status, headers, config) {
      $scope.data.properties = [];
      for(var i = 0; i < data.results[0].data.length; i++){
        $scope.data.properties.push(data.results[0].data[i].row[0]);
      }
    });
    return $scope.data.properties;
  };

    $scope.updateProjectList();
});
