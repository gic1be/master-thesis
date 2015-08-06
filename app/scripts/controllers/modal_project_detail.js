'use strict';

/**
* @ngdoc function
* @name masterThesisApp.controller:ModalProjectDetailCtrl
* @description
* # ModalProjectDetailCtrl
* Controller of the masterThesisApp
*/
angular.module('masterThesisApp').controller('ModalProjectDetailCtrl', function ($scope, $modalInstance, input) {

  $scope.project = input.project;
console.log(input.project);

  $scope.ok = function () {
    $modalInstance.close($scope.project);
    console.log ($scope.project);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
