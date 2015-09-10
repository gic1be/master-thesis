'use strict';

/**
 * @ngdoc function
 * @name masterThesisApp.controller:GraphCtrl
 * @description
 * # AboutCtrl
 * Controller of the masterThesisApp
 */
angular.module('masterThesisApp')
  .controller('ModalGraphCtrl', function ($scope, $http) {

    var config = {
      dataSource: 'data/exampleNodes.json',
      forceLocked: false,
          linkDistance: function(){ return 40; },

          nodeTypes: {"type":["Project",
                             "AddInformation"]},
          cluster: true,
          clusterColours: ["#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E","#E6AB02"],
          caption: function(node){
              return node.caption;
          }
        };
        alchemy = new Alchemy(config)

  });
