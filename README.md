# atomo

Clojure's Atom implementation in JavaScript.

From the [Clojure docs](http://clojure.org/atoms):

> Atoms provide a way to manage shared, synchronous, independent state.

On top of the above, atoms provide also validation and observation capabilities.

## Installation

```
$ npm install atomo
```

## Usage

Atoms are references to values that may change over time. The
most basic operation on an atom is querying its current value:

```javascript
var a = require("atomo");

var anAtom = a.atom(42);
anAtom.deref() === 42
// true
```

An atom's value can be set to another value:

```javascript
anAtom.reset("foo");

anAtom.deref() === "foo"
// true
```

Alternatively, an atom's value can be transitioned to another
value providing a function:

```javascript
function increment(x) { return x + 1; }

var anAtom = a.atom(41);
anAtom.swap(increment);
anAtom.deref() === 42
// true
```

### Validation

Atoms support validation through a validation function, and they will
throw an exception whenever we try to set the atom's value to an illegal
value.

```javascript
function is42(x) { return x === 42 };

var anAtom = a.atom(42, {validator: is42});

anAtom.reset(43); // Error!
anAtom.swap(increment); // Error!
```

### Observation

Atoms support adding and removing watches for listening to value changes.
Watches are called with three arguments: the atom, the old value and the
new value.


```javascript
var anAtom = a.atom(42);

var watcher = function(theAtom, oldValue, newValue){
    console.log("Atom changed from", oldValue, "to", newValue);
};

anAtom.addWatch(watcher);

anAtom.swap(increment);
// Atom changed from 42 to 43

anAtom.reset(42);
// Atom changed from 43 to 42

anAtom.removeWatch(watcher);

anAtom.swap(increment);
anAtom.reset(42);
```

## License

BSD 2-clause license, Copyright 2014 - 2015 Alejandro Gómez.
