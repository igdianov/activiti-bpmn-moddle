'use strict';


describe('descriptor', function() {

  var activitiDescriptor = require('../../resources/activiti');


  it('should provide model', function() {

    // then
    expect(activitiDescriptor).to.exist;

    expect(activitiDescriptor.uri).to.eql('http://activiti.org/bpmn');
    expect(activitiDescriptor.prefix).to.eql('activiti');
  });

});