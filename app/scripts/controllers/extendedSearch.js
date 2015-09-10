'use strict';

/**
 * @ngdoc function
 * @name masterThesisApp.controller:extendedSearchCtrl
 * @description
 * # AboutCtrl
 * Controller of the masterThesisApp
 */
angular.module('masterThesisApp')
  .controller('extendedSearchCtrl', function ($scope, $http, $modal) {

    $scope.data = {};
    $scope.data.projects = [];

    $scope.selectProject = function(project){
      $scope.projectName = project;
    };

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
             }, function () {
                   $log.info('Modal dismissed at: ' + new Date());
                });
   };

   $scope.getGraph = function(project, details){

   //  pop-up window
         var modalInstance = $modal.open({
             animation: $scope.animationsEnabled,
             templateUrl: 'views/getGraph.html',
             controller: 'ModalGraphCtrl',
             resolve: {
               input: function () {
                 var temp = {};
                 temp.project = project;
                 return temp;
               }
             }
           });

         modalInstance.result.then(function (newProject) {
             }, function () {
                   $log.info('Modal dismissed at: ' + new Date());
                });
   };

    $scope.search = function(searchName){
      var statement = {
        "statements" : [ {
          "statement" : buildSearchQuery($scope.tags)
        } ]
      };
      // console.log($scope.tags[0]);
      console.log(statement);
      $http.post('http://localhost:7474/db/data/transaction/commit', statement).
      success(function(data, status, headers, config) {
        $scope.data.projects = [];
        for(var i = 0; i < data.results[0].data.length; i++){
          $scope.data.projects.push(data.results[0].data[i].row[0]);
        }

      });

    };

    // demo alchemy
    var config = {
      dataSource: 'data/exampleNodes.json',
      forceLocked: false,
          linkDistance: function(){ return 40; },

          nodeTypes: {"type":["Project",
                             "AddInformation"]},
          caption: function(node){
              return node.caption;
          }
        };
        alchemy = new Alchemy(config);

});

function buildSearchQuery(tags) {
  // Search for all Projects
  var query = "MATCH (proj:Project), ";
  // name each tag
  for (var j=0; j < tags.length; j++) {
    var eachTag = tags[j].text;
    query += "(add" + j + ":AddInformation {name:'" + eachTag + "'}),";

  }
  // search the shortestPath for every tag
  for (var k=0; k < tags.length; k++) {
    var character = toLetters(k+1);
    query += character + " = shortestPath ((proj)-[*..1]-(add" + k + "))";
    if (k+1 < tags.length) {
      query += ",";
    }
  }


  query += " RETURN proj";
  console.log(query);
  return query;
}

function toLetters(num) {
    "use strict";
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    var character = pow ? toLetters(pow) + out : out;
    //  console.log (character);

    return pow ? toLetters(pow) + out : out;
}
