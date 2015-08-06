'use strict';

/**
 * @ngdoc function
 * @name masterThesisApp.controller:extendedSearchCtrl
 * @description
 * # AboutCtrl
 * Controller of the masterThesisApp
 */
angular.module('masterThesisApp')
  .controller('extendedSearchCtrl', function ($scope, $http) {

    $scope.search = function(){
      var statement = {
        "statements" : [ {
          "statement" : buildSearchQuery($scope.searchName, "")
        } ]
      };
       console.log(statement);
      $http.post('http://localhost:7474/db/data/transaction/commit', statement).
      success(function(data, status, headers, config) {
       console.log(data);
      });

    }
});

function buildSearchQuery(name, type) {
  var query = "MATCH (proj:Project";

  if(name != "" || type != ""){
    query += "{";
    if(name != ""){
      query += "name:"+'"'+name+'"';
    }
    if(type != ""){
      query += "type:"+'"'+type+'"';
    }
    query += "}"
  }else{
  }

  query += ") RETURN proj";
  //  console.log(query);
  return query;
}
