# Instructions


## Files

All the javascript files should be in lowerCamelCase except for `models` folder files should be in UpperCamelCase
```text
├───models
│   └───ExampleModel.js
├───services
│   └───exampleService.js
```

## Folders

All the folders should be self explanatory and lowerCamelCase `exampleFolder`

## Classes

All the classes should be UpperCamelCase e.g:

```javascript
class ExampleClass extends AnotherExampleClass
```

## Exporting

Every element inside `index.js` of any folder should be UpperCamelCase e.g:

```javascript
    module.exports={
        ExampleExport = require('./exampleExport')
    }
```

## Importing Classes & Models

Every Imported class into the code should be in UpperCamelCase e.g:

```javascript
    const SomeClass = require('./someClassFolder').SomeClass;
    const SomeModel = require('./models/someModelFile')
```

## Importing modules

Every imported module should be in lowerCamelCase e.g:

```javascript
const someModule = require('someModuleName');
```

## Instanitiating Objects from Classes

Every instantiated object should be lowerCamelCase e.g:

```javascript
const someObjectOfClass = new SomeClass();
```

## SemiColon

after each expression you need to put a semicolon `;`
