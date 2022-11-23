# Installation

## Install the package

```bash
npm install ${pkgName}
```

## Import the package

```js
let ${pkgName} = require('${pkgName}');
```

# Usage

## Example

```js
let {table, sort} = require('${pkgName}');

let user = new table('user', {});
user.insert({name: 'John', age: 20, rank:3});
user.insert({name: 'Jane', age: 21, rank:2});
user.insert({name: 'Jack', age: 21, rank:1});
console.log(user.select({age: 21}));
console.log(sort(user.select({age: 21}), {cheese: 1}));
```

# API

## table(name, schematic)
