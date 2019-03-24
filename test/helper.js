'use strict';

var fs = require('fs');


function readFile(filename) {
  return fs.readFileSync(filename, { encoding: 'UTF-8' });
}

module.exports.readFile = readFile;


var BpmnModdle = require('bpmn-moddle').default;

var activitiDescriptor = require('../resources/activiti');

function createModdle() {
  return new BpmnModdle({
    activiti: activitiDescriptor
  });
}

module.exports.createModdle = createModdle;