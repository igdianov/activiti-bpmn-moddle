'use strict';


describe('descriptor', function() {

  var activitiDescriptor = require('../../resources/activiti');


  it('should provide model', function() {

    // then
    expect(activitiDescriptor).to.exist;

    expect(activitiDescriptor.uri).to.eql('http://activiti.org/schema/1.0/bpmn');
    expect(activitiDescriptor.prefix).to.eql('activiti');
  });

});