'use strict';

var assign = require('min-dash').assign,
    isFunction = require('min-dash').isFunction;

var Helper = require('../../helper');


describe('write', function() {

  var moddle = Helper.createModdle();


  function write(element, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }

    // skip preamble for tests
    options = assign({ preamble: false }, options);

    moddle.toXML(element, options, callback);
  }


  describe('should export types', function() {

    it('Field#stringValue', function(done) {

      // given
      var fieldElem = moddle.create('activiti:Field', {
        name: 'Field_1',
        stringValue: 'myFieldValue'
      });

      var expectedXML =
        '<activiti:field xmlns:activiti="http://activiti.org/bpmn" ' +
              'name="Field_1" stringValue="myFieldValue" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('Field#string', function(done) {

      // given
      var fieldElem = moddle.create('activiti:Field', {
        name: 'Field_1',
        string: 'myStringValue'
      });

      var expectedXML =
        '<activiti:field xmlns:activiti="http://activiti.org/bpmn" name="Field_1">' +
          '<activiti:string>myStringValue</activiti:string>' +
        '</activiti:field>';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('Field#expression', function(done) {

      // given
      var fieldElem = moddle.create('activiti:Field', {
        name: 'Field_1',
        expression: '${myExpressionValue}'
      });

      var expectedXML =
        '<activiti:field xmlns:activiti="http://activiti.org/bpmn" name="Field_1">' +
          '<activiti:expression>${myExpressionValue}</activiti:expression>' +
        '</activiti:field>';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


  });

});
