'use strict';

/**
 * @ngdoc function
 * @name masterThesisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the masterThesisApp
 */
angular.module('masterThesisApp')
  .controller('MainCtrl', function () {

    // Tag Cloud
    /*!
     * Create an array of word objects, each representing a word in the cloud
     */
    var word_array = [
        {text: "Search projects", weight: 8, link:"http://enterprise-iot.org/book/enterprise-iot/part-i/manufacturing/11340-2/"},
        {text: "Use the extended search", weight: 7, link: "http://microsoft.com/"},
        {text: "Compare projects", weight: 7, link: "http://jquery.com/"},
        {text: "Get more information about Ignite", weight: 6, link: "http://http://enterprise-iot.org/"}
    ];

    $(function() {
      // When DOM is ready, select the container element and call the jQCloud method, passing the array of words as the first argument.
      $("#tagcloud").jQCloud(word_array);
    });

  });
