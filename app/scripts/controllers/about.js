'use strict';

/**
 * @ngdoc function
 * @name masterThesisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the masterThesisApp
 */
angular.module('masterThesisApp')
  .controller('AboutCtrl', function ($scope, $http) {


// Tag Cloud
/*!
 * Create an array of word objects, each representing a word in the cloud
 */
var word_array = [
    {text: "LHCb Experiment at CERN", weight: 9, link:"http://enterprise-iot.org/book/enterprise-iot/part-i/manufacturing/11340-2/"},
    {text: "energy", weight: 7, link: "http://jquery.com/"},
    {text: "Microsoft", weight: 4, link: "http://microsoft.com/"},
    {text: "software architecture", weight: 5},
    {text: "Internet of Things", weight: 6},
    {text: "gas supplies", weight: 5},
    {text: "igrid computing", weight: 5},
    {text: "glass-fiber network", weight: 7},
    {text: "Niko Neufeld", weight: 5},
    {text: "CERN", weight: 8, link: "http://home.web.cern.ch/"}
    // ...as many words as you want
];

$(function() {
  // When DOM is ready, select the container element and call the jQCloud method, passing the array of words as the first argument.
  $("#tagcloud").jQCloud(word_array);
});

  });
