'use strict';

/**
* @ngdoc function
* @name masterThesisApp.controller:ModalAddProjectCtrl
* @description
* # ModalAddProjectCtrl
* Controller of the masterThesisApp
*/
angular.module('masterThesisApp').controller('ModalAddProjectCtrl', function ($scope, $http, $modalInstance, input) {

  $scope.data = {};
  $scope.data.additionalProperties = [
    // Asset and Devices
    { "name": "Total - Assets and Devices", "value": "" },
        // General
    { "name": "Number of Assets", "value": ""},
    { "name": "Value of individual Asset", "value": ""},
    { "name": "Economic Value Add of indiv. Asset / Year", "value": ""},
    { "name": "Complexity of Assets", "value": ""},
    { "name": "Heterogeneity of Assets", "value": "" },
      // Processing Power
    { "name": "Local Business Logic", "value": "" },
    { "name": "Local Event Processing", "value": "" },
    { "name": "Real time requirements", "value": "" },
      // Other HW Requirements
    { "name": "Power Supply", "value": "" },
    { "name": "Environment", "value": "" },
      // Lifecycle Management
    { "name": "Projected lifetime of assets", "value": "" },
    { "name": "HW update constraints", "value": "" },
    { "name": "Software update constraints", "value": "" },
    // Communications & Connectivity
    { "name": "Total - Communications and Connectivity", "value": "" },
      // Local und Remote C&C
    { "name": "Local C and C", "value": "" },
    { "name": "Remote C and C", "value": "" },
    // Backened Services
    { "name": "Total - Backend Services", "value": "" },
      // General
    { "name": "Application Strategy", "value": "" },
    { "name": "Business Complexity", "value": "" },
    { "name": "Backend Integration", "value": "" },
      // Data Management and Analytics
    { "name": "Data volumes / ingestion per day", "value": "" },
    { "name": "Data variety", "value": "" },
    { "name": "Data Variability (Schema Changes)", "value": "" },
    { "name": "Analytics", "value": "" },
    // Standards & Regulatory Requirements
    { "name": "Total - Standards and Regulatory Requirements", "value": "" },
      // Regulatory Requirements
    { "name": "Region specific ", "value": "" },
    { "name": "Industry specific ", "value": "" },
    { "name": "Technology specific ", "value": "" },
      // Standards
    { "name": "Technical Standards", "value": "" },
    { "name": "Functional / industry Standards", "value": "" },
    // Project Environment
    { "name": "Total - Project Environment", "value": "" },
    { "name": "Timeline", "value": "" },
    { "name": "Budget", "value": "" },
    { "name": "Functional skills & experience", "value": "" },
    { "name": "Technical skills & experience", "value": "" }
  ];


  $scope.newProject = {};
  $scope.tags = [];

// add another property
  $scope.addAdditionalProperty = function(index) {
    $scope.data.additionalProperties.push({});
  };

// delete a property next through the button
  $scope.deleteAdditionalProperty = function(index) {
    $scope.data.additionalProperties.splice(index, 1);
  };

// extractTags for using Open Calias

  $scope.data.tagText = input.tagText;

   $scope.extractTags = function(tagText){
  //   console.log(tagText);
    $http.post("http://localhost:3000/",
   {text: "'"+tagText+"'"}
    ).
    success(function(data, status, headers, config) {
      if(data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            //if(key contains(["socialTag", "cat"]))
            var tag = data[key].name;
            if(tag != undefined && $.inArray(tag, $scope.tags) == -1){
              $scope.tags.push({"text": tag});
            }
          }
        }
    }
  });
};

  // $scope.ok = function () {
  //   $modalInstance.close(  $scope.newProject);
  // };

  $scope.cancel = function () {
    $modalInstance.close();
  };

// project name and type have to be defined to add a new project
  $scope.isValid = function(){
    return $scope.newProject.name != undefined && $scope.newProject.type != undefined;
  };


  $scope.data.getProperties = function(){
  var statement = "MATCH (val: Value_Dim)-[r]-(part:Part_of_Dim)-[p]-(dim:Dimension)RETURN dim, part, val";
    $http.post('http://localhost:7474/db/data/transaction/commit', {
      "statements" : [ {
        "statement" : statement
      } ]
    }).
    success(function(data, status, headers, config) {


// get all dimensions
      var result = {};
      var rawData =  data.results[0].data;
      $scope.data.element = [];

      $scope.dimensionS = [];

      for(var i = 0; i < rawData.length; i++) {

        var values = [];
        var v;

        for(v in rawData[i].row[2]) {
          if(v != "name" && v != "$$hashKey")

          var dimensionname = rawData[i].row[2][v];
            values.push(dimensionname);
        }

}
      $scope.data.properties = [];
      $scope.data.propertyPreDimension = [];
      $scope.data.propertyDimension = [];


     for(var j = 0; j < data.results[0].data.length; j++){
        if (data.results[0].data[j].row[2] !== $scope.data.propertyPreDimension){
          $scope.data.propertyPreDimension.push(data.results[0].data[j].row[2]);
        } else {

        }

        if ($.inArray(data.results[0].data[j].row[1].name, $scope.data.test) == -1){
          $scope.data.test.push(data.results[0].data[j].row[1].name);
        } else {

        }

           for(var i = 0; i < data.results[0].data.length; i++){
              $scope.data.properties.push(data.results[0].data[i].row[4]);
            }


    }
      $scope.data.propertyDimension.push(data.results[0].data[0].row[0]);


    });
  };


// add new Project
  $scope.addProject = function(){
    // add a Project
    var statement = {
      "statements" : [ {
       "statement" : checkQuery($scope.newProject.name),
      } ]
    };

    $http.post('http://localhost:7474/db/data/transaction/commit', statement).
    success(function(data, status, headers, config) {
      // for projects which doesn't exist already
      if (data.results[0].data.length == 0) {
        var statement = {
          "statements" : [ {
            "statement" : buildAddQuery($scope.newProject.name, $scope.newProject.type, $scope.newProject.company, $scope.newProject.status, $scope.newProject.summary, $scope.newProject.weblink, $scope.data.additionalProperties)
          } ]
        };
        console.log(statement);
        $http.post('http://localhost:7474/db/data/transaction/commit', statement).
        success(function(data, status, headers, config) {
          // add tags
          var statement = {
            "statements" : addTagsStatements($scope.tags, $scope.newProject.name)
          };
        });
      } else{

    }
    // console.log(data);
    });

    $modalInstance.close($scope.newProject);
  };
});


// check whether a project already exists with this name or not (also possible with MERGE, but there is no possibility of checking upper and lower case)
function checkQuery(projectName) {
  var query ="MATCH (p:Project) WHERE p.name=~'(?i)"+projectName+"' RETURN p";
  // console.log(query);
  return query;
}

function buildAddQuery(projectName, projectType, projectCompany, projectStatus, projectSummary, projectWeblink, additionalProperties) {
  var query = "MERGE (proj:Project";

  if(projectName != "" || type != ""){
    query += "{";
    query += "name:"+'"'+projectName+'"})'+" ON CREATE SET proj.name="+ '"'+projectName+'"';
    query += ", proj.type ='" + projectType + "'";
    if(projectCompany != ""){
      query += ", proj.company ='" + projectCompany + "'";
    }
    if(projectStatus != ""){
      query += ", proj.status ='" + projectStatus + "'";
    }
    if(projectSummary != ""){
      query += ", proj.summary ='" + projectSummary + "'";
    }
    if(projectWeblink != ""){
      query += ", proj.weblink ='" + projectWeblink + "'";
    }

  // Will be needed if projects also will be able to update
  //  query += "ON MATCH SET ..."

  }else{
  }


// for each property
  for(var i = 0; i < additionalProperties.length; i++){
    if(additionalProperties[i].value != ""){
     query +=", proj.`"+additionalProperties[i].name+ "` ="+'"'+additionalProperties[i].value+'"';
   }
   else{
   }
  }

  query += " RETURN proj";
  // console.log(query);
  return query;
}

// add tags
function addTagsStatements (tags,projectName) {
  var result = [];

  // console.log(tags);
  // console.log(projectName);
  for(var i = 0; i < tags.length; i++){
    console.log(tags[i]);
    result.push({
      "statement" : "MERGE (add:AddInformation {name: '" + tags[i].text + "'})"
    });
  }

  for(var i = 0; i < tags.length; i++){
    // console.log(tags[i]);
    result.push({
      "statement" : "MATCH (add:AddInformation { name: '" + tags[i].text + "'}),(proj:Project {name: '" + projectName + "'}) MERGE (add)-[r:belongs_to]-> (proj)"
    });
  }
  // console.log(result);

  return result;
}
