# activiti-bpmn-moddle

[![Build Status](https://travis-ci.org/igdianov/activiti-bpmn-moddle.svg?branch=master)](https://travis-ci.org/igdianov/activiti-bpmn-moddle)

This project defines the [Activiti](https://activiti.org) namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.


## Usage

Use it together with [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) to validate Activiti BPMN 2.0 extensions.

```javascript
var BpmnModdle = require('bpmn-moddle');

var activitiModdle = require('activiti-bpmn-moddle/resources/activiti');

var moddle = new BpmnModdle({ activiti: activitiModdle });

var serviceTask = moddle.create('bpmn:ServiceTask', {
  'javaDelegate': 'my.company.SomeDelegate'
});
```


## Building the Project

To run the test suite that includes XSD schema validation you must have a Java JDK installed and properly exposed through the `JAVA_HOME` variable.

Execute the test via

```
npm test
```

Perform a complete build of the application via

```
npm run all
```

## Extension

We include an extension that provides the necessary validation to clone certain properties, when making use of a library like `bpmn-js`. This allows to easily plug with out modeler solution, which works like the following example:

```js
var BpmnJS = require('bpmn-js/lib/Modeler'),
    activitiExtensionModule = require('activiti-bpmn-moddle/lib'),
    activitiModdle = require('activiti-bpmn-moddle/resources/activiti');

var modeler = new BpmnJS({
    additionalModules: [
      activitiExtensionModule
    ],
    moddleExtensions: {
      activiti: activitiModdle
    }
  });
```

This extension makes use of dependency injection via [didi](https://github.com/nikku/didi) and expects an events interface such as [`eventBus`](https://github.com/bpmn-io/diagram-js/blob/master/lib/core/EventBus.js), where we plugin and listen to the `property.clone` event.


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).
