'use strict';

var BpmnModdle = require('bpmn-moddle').default;

var activitiDescriptor = require('../../resources/activiti');


describe('exports', function() {

  it('should extend bpmn-moddle', function() {

    // given
    var moddle = new BpmnModdle({
      activiti: activitiDescriptor
    });

    // when
    var serviceTask = moddle.create('bpmn:ServiceTask');

    // then
    expect(serviceTask.$instanceOf('activiti:ServiceTaskLike')).to.be.true;
  });

});