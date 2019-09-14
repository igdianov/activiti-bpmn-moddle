'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });


    describe('activiti:historyTimeToLive', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-activiti-historyTimeToLive.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type : 'bpmn:Process',
            historyTimeToLive : 'foo'
          });

          done(err);

        });

      });

    });


    describe('activiti:isStartableInTasklist', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-activiti-isStartableInTasklist.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type : 'bpmn:Process',
            isStartableInTasklist : true
          });

          done(err);

        });

      });


      it('default value', function() {

        // when
        var bo = moddle.create('bpmn:Process');

        // then
        expect(bo.get('activiti:isStartableInTasklist')).to.be.true;
      });

    });


    describe('activiti:priority', function() {

      it('on UserTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/userTask-activiti-priority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:UserTask', function(err, serviceTask) {

          // then
          expect(serviceTask).to.jsonEqual({
            $type: 'bpmn:UserTask',
            priority: '${ priority }'
          });

          done(err);
        });

      });
    });


    describe('activiti:async', function() {

      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-activiti-async.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, serviceTask) {

          // then
          expect(serviceTask).to.jsonEqual({
            $type: 'bpmn:ServiceTask',
            async: true
          });

          done(err);
        });

      });

    });

    describe('activiti:scope', function() {

      it('on Signal', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/signal-activiti-scope.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Signal', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:Signal',
            scope: 'global'
          });

          done(err);
        });

      });

    });

    describe('activiti:correlationKey', function() {

      it('on MessageEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/messageEventDefinition-activiti-correlationKey.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:MessageEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:MessageEventDefinition',
            correlationKey: '${correlationId}'
          });

          done(err);
        });

      });

    });

    describe('activiti:messageExpression', function() {

      it('on MessageEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/messageEventDefinition-activiti-messageExpression.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:MessageEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:MessageEventDefinition',
            messageExpression: 'message-${name}'
          });

          done(err);
        });

      });

    });

    describe('activiti:errorCodeVariable', function() {

      it('on ErrorEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/errorEventDefinition-activiti-errorCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ErrorEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ErrorEventDefinition',
            errorCodeVariable: 'errorCode'
          });

          done(err);
        });

      });

    });


    describe('activiti:escalationCodeVariable', function() {

      it('on EscalationEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/escalationEventDefinition-activiti-escalationCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:EscalationEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:EscalationEventDefinition',
            escalationCodeVariable: 'escalationCode'
          });

          done(err);
        });

      });

    });


    it('activiti:script', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-script.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:Script', function(err, script) {

        // then
        expect(script).to.jsonEqual({
          $type: 'activiti:Script',
          scriptFormat: 'groovy',
          resource: 'null',
          value: 'foo = bar;'
        });

        done(err);
      });
    });


    it('activiti:connector', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-connector.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:Connector', function(err, connector) {

        // then
        expect(connector).to.jsonEqual({
          $type: 'activiti:Connector',
          connectorId: 'connector',
          inputOutput: {
            $type: 'activiti:InputOutput',
            inputParameters: [
              {
                $type: 'activiti:InputParameter',
                name: 'in'
              }
            ],
            outputParameters: [
              {
                $type: 'activiti:OutputParameter',
                name: 'out'
              }
            ]
          }
        });

        done(err);
      });
    });


    it('activiti:properties', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-properties.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:Properties', function(err, properties) {

        // then
        expect(properties).to.jsonEqual({
          $type: 'activiti:Properties',
          values: [
            {
              $type: 'activiti:Property',
              id: 'p1',
              name: 'foo',
              value: 'property1'
            }
          ]
        });

        done(err);
      });
    });


    it('activiti:potentialStarter', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-potentialStarter.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:PotentialStarter', function(err, starter) {

        // then
        expect(starter).to.jsonEqual({
          $type: 'activiti:PotentialStarter',
          resourceAssignmentExpression: {
            $type: 'bpmn:ResourceAssignmentExpression',
            expression: {
              $type: 'bpmn:FormalExpression',
              body: 'group2, group(group3), user(user3)'
            }
          }
        });

        done(err);
      });
    });


    describe('activiti:resource', function() {

      it('on FormalExpression', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/formalExpression-resource.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:FormalExpression', function(err, starter) {

          // then
          expect(starter).to.jsonEqual({
            $type: 'bpmn:FormalExpression',
            resource: 'deployment://some-file'
          });

          done(err);
        });
      });
    });


    it('activiti:in', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-in.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:In', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'activiti:In',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    it('activiti:out', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-out.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:Out', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'activiti:Out',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    describe('activiti:inputParameter', function() {

      it('with body content', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-inputParameter-body.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'activiti:InputParameter',
            name: 'foo',
            value: 'BAR'
          });

          done(err);
        });
      });


      it('with nested script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-inputParameter-script.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'activiti:InputParameter',
            definition: {
              $type: 'activiti:Script'
            }
          });

          done(err);
        });
      });


      it('with nested list', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-inputParameter-list.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'activiti:InputParameter',
            name: 'var1',
            definition: {
              $type: 'activiti:List',
              items: [
                {
                  $type: 'activiti:Value',
                  value: '${1+1}'
                },
                {
                  $type: 'activiti:Value',
                  value: '${1+2}'
                },
                {
                  $type: 'activiti:Value',
                  value: '${1+3}'
                }
              ]
            }
          });

          done(err);
        });
      });


      it('with nested map', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-inputParameter-map.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'activiti:InputParameter',
            definition: {
              $type: 'activiti:Map',
              entries: [
                {
                  $type: 'activiti:Entry',
                  key: 'a',
                  value: '${1+1}'
                },
                {
                  $type: 'activiti:Entry',
                  key: 'b',
                  value: '${1+2}'
                },
                {
                  $type: 'activiti:Entry',
                  key: 'c',
                  value: '${1+3}'
                }
              ]
            }
          });

          done(err);
        });
      });

    });


    describe('activiti:outputParameter', function() {

      it('with mixed contents', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-outputParameter-mixed.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:OutputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'activiti:OutputParameter',
            name: 'var1',
            definition: {
              $type: 'activiti:List',
              items: [
                {
                  $type: 'activiti:Value',
                  value: 'constantStringValue'
                },
                {
                  $type: 'activiti:Value',
                  value: '${ \'elValue\' }'
                },
                {
                  $type: 'activiti:Script',
                  scriptFormat: 'Groovy',
                  value: 'return "scriptValue";'
                }
              ]
            }
          });

          done(err);
        });
      });

    });


    describe('activiti:FormSupported with activiti:formKey and activiti:formHandlerClass', function() {

      it('on UserTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/userTask-activiti-formSupported.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:UserTask', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:UserTask',
            formHandlerClass: 'my.company.FormHandler',
            formKey: 'form.html'
          });

          done(err);
        });
      });


      it('on StartEvent', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/userTask-activiti-formSupported.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:UserTask', function(err, startEvent) {

          // then
          expect(startEvent).to.jsonEqual({
            $type: 'bpmn:UserTask',
            formHandlerClass: 'my.company.FormHandler',
            formKey: 'form.html'
          });

          done(err);
        });
      });

    });


    describe('activiti:TemplateSupported with activiti:modelerTemplate', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-activiti-modelerTemplate.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Process',
            modelerTemplate: 'foo'
          });

          done(err);
        });
      });

      it('on Task', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/task-activiti-modelerTemplate.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Task', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo'
          });

          done(err);
        });
      });

      it('on StartEvent', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/startEvent-activiti-modelerTemplate.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:StartEvent', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            modelerTemplate: 'bar'
          });

          done(err);
        });
      });

    });


    describe('activiti:initiator', function() {

      it('on StartEvent', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/startEvent-activiti-initiator.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:StartEvent', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            initiator: 'kermit'
          });

          done(err);
        });
      });

    });

    it('bpmn:CallActivity', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/callActivity.part.bpmn');

      // when
      moddle.fromXML(xml, 'bpmn:CallActivity', function(err, callActivity) {

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'bpmn:CallActivity',
          calledElementBinding: 'version',
          calledElementVersion: '1',
          calledElementVersionTag: 'version1',
          calledElementTenantId: 'tenant1',
          caseRef: 'oneTaskCase',
          caseBinding: 'version',
          caseVersion: '2',
          caseTenantId: 'tenant1',
          variableMappingClass: 'org.activiti.bpm.test.Test',
          variableMappingDelegateExpression: '${test}'
        });

        done(err);
      });

    });

    describe('activiti:taskPriority', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-activiti-taskPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type : 'bpmn:Process',
            taskPriority : '100'
          });

          done(err);
        });
      });


      it('on ServiceTaskLike Element', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-activiti-taskPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type : 'bpmn:ServiceTask',
            taskPriority : '100'
          });

          done(err);
        });
      });
    });


    describe('activiti:jobPriority', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-activiti-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:Process',
            jobPriority: '100'
          });

          done(err);
        });
      });


      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-activiti-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:ServiceTask',
            jobPriority: '100'
          });

          done(err);
        });
      });


      it('on Gateway', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/gateway-activiti-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ExclusiveGateway', function(err, gateway) {

          // then
          expect(gateway).to.jsonEqual({
            $type: 'bpmn:ExclusiveGateway',
            jobPriority: '${ some - expression }'
          });

          done(err);
        });
      });


      it('on Event', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/event-activiti-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:IntermediateCatchEvent', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:IntermediateCatchEvent',
            jobPriority: '100'
          });

          done(err);
        });
      });

    });


    describe('bpmn:Process', function() {

      it('extended with activiti:candidateStarterUsers, activiti:candidateStarterGroups, activiti:versionTag', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:Process',
            candidateStarterUsers: 'userInGroup2',
            candidateStarterGroups: 'group1, group2, group3',
            versionTag: '1.0.0'
          });

          done(err);
        });
      });

    });


    describe('bpmn:ScriptTask', function() {

      it('extended with activiti:resource, activiti:resultVariable', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/scriptTask.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ScriptTask', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ScriptTask',
            scriptFormat: 'python',
            resource: 'some-file.py',
            resultVariable: 'result'
          });

          done(err);
        });
      });

    });


    it('activiti:formData', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-formData.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:FormData', function(err, formData) {

        // then
        expect(formData).to.jsonEqual({
          $type: 'activiti:FormData',
          fields: [
            {
              $type: 'activiti:FormField',
              id: 'stringField',
              label: 'String Field',
              type: 'string',
              defaultValue: 'someString',
              properties: {
                $type: 'activiti:Properties',
                values: [
                  {
                    $type: 'activiti:Property',
                    id: 'p1',
                    value: 'property1'
                  },
                  {
                    $type: 'activiti:Property',
                    id: 'p2',
                    value: 'property2'
                  }
                ]
              },
              validation: {
                $type: 'activiti:Validation',
                constraints: [
                  {
                    $type: 'activiti:Constraint',
                    name: 'readonly'
                  },
                  {
                    $type: 'activiti:Constraint',
                    name: 'minlength',
                    config: '5'
                  }
                ]
              },
              values: [
                {
                  $type: 'activiti:Value',
                  id: 'a',
                  name: 'A'
                },
                {
                  $type: 'activiti:Value',
                  id: 'b',
                  name: 'B'
                }
              ]
            }
          ]
        });

        done(err);
      });

    });


    describe('activiti:formProperty', function() {

      it('attributes', function(done) {
        // given
        var xml = readFile('test/fixtures/xml/activiti-formProperty-attributes.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:FormProperty', function(err, formProperty) {

          // then
          expect(formProperty).to.jsonEqual({
            $type: 'activiti:FormProperty',
            id: 'longProperty',
            name: 'Property',
            type: 'long',
            required: 'true',
            readable: 'true',
            writable: 'true',
            variable: 'SpeakerName',
            expression: '#{address.street}',
            datePattern: 'dd-MM-yyyy hh:mm',
            default: '42'
          });

          done(err);
        });
      });


      it('with nested value', function(done) {
        // given
        var xml = readFile('test/fixtures/xml/activiti-formProperty-children.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:FormProperty', function(err, formProperty) {

          // then
          expect(formProperty).to.jsonEqual({
            $type: 'activiti:FormProperty',
            values: [
              {
                $type: 'activiti:Value',
                id: 'false',
                name: 'Yes'
              },
              {
                $type: 'activiti:Value',
                id: 'true',
                name: 'No'
              }
            ]
          });

          done(err);
        });
      });

    });

    describe('activiti:executionListener', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-executionListener.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'activiti:ExecutionListener',
            event: 'start',
            'class': 'my.company.Listener'
          });

          done(err);
        });

      });


      it('script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-executionListener-script.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'activiti:ExecutionListener',
            event: 'start',
            script: {
              $type: 'activiti:Script',
              scriptFormat: 'groovy',
              value: 'foo = bar;'
            }
          });

          done(err);
        });
      });


      it('fields', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-executionListener-fields.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'activiti:ExecutionListener',
            event: 'start',
            'class': 'my.company.Listener',
            fields : [
              {
                $type: 'activiti:Field',
                name: 'fieldOne',
                stringValue: 'myString'
              },
              {
                $type: 'activiti:Field',
                name: 'fieldTwo',
                expression: '${myExpression}'
              }
            ]
          });

          done(err);
        });

      });

    });


    it('activiti:taskListener', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/activiti-taskListener.part.bpmn');

      // when
      moddle.fromXML(xml, 'activiti:TaskListener', function(err, taskListener) {

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'activiti:TaskListener',
          event: 'create',
          class: 'org.activiti.bpm.engine.test.bpmn.usertask.UserTaskTestCreateTaskListener',
          delegateExpression: '${myTaskListener}',
          expression: '${myTaskListener.notify(task, task.eventName)}'
        });

        done(err);
      });
    });


    describe('activiti:field', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-field-attributes.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:Field', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'activiti:Field',
            name: 'html',
            expression: '<html><body>Hi!</body></html>',
            stringValue: '41 is not the answer!'
          });

          done(err);
        });
      });


      it('with nested expression and string', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-field-children.part.bpmn');

        // when
        moddle.fromXML(xml, 'activiti:Field', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'activiti:Field',
            name: 'html',
            expression: '<html><body>Hi!</body></html>',
            string: '42 is the answer!'
          });

          done(err);
        });
      });

    });


    describe('activiti:Collectable', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/activiti-multiInstance.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:MultiInstanceLoopCharacteristics', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'bpmn:MultiInstanceLoopCharacteristics',
            isSequential: true,
            collection: '5',
            elementVariable: '5'
          });

          done(err);
        });
      });
    });

    describe('activiti tenant id', function() {

      it('on BusinessRuleTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/businessRuleTask.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:BusinessRuleTask', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:BusinessRuleTask',
            decisionRef: 'myDecision',
            decisionRefBinding: 'version',
            decisionRefVersion: '1',
            decisionRefTenantId: 'tenant1'
          });

          done(err);
        });
      });


      it('on CallActivity', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/callActivity.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:CallActivity', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:CallActivity',
            calledElementBinding: 'version',
            calledElementVersion: '1',
            calledElementVersionTag: 'version1',
            calledElementTenantId: 'tenant1',
            caseRef: 'oneTaskCase',
            caseBinding: 'version',
            caseVersion: '2',
            caseTenantId: 'tenant1',
            variableMappingClass: 'org.activiti.bpm.test.Test',
            variableMappingDelegateExpression: '${test}'
          });

          done(err);
        });
      });
    });


    describe('activiti:errorMessageVariable', function() {

      it('on ErrorEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/errorEventDefinition-activiti-errorMessageVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ErrorEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ErrorEventDefinition',
            errorMessageVariable: 'errorMessage'
          });

          done(err);
        });

      });

    });

    describe('activiti:variableName', function() {

      it('on ConditionalEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/conditionalEventDefinition-activiti-variableName.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ConditionalEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ConditionalEventDefinition',
            variableName: 'myConditionVar'
          });

          done(err);
        });

      });

    });

    describe('activiti:variableEvent', function() {

      it('on ConditionalEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/conditionalEventDefinition-activiti-variableEvent.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ConditionalEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ConditionalEventDefinition',
            variableEvent: 'create, update'
          });

          done(err);
        });

      });

    });


  });

});
