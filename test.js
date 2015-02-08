var atom = require('./index');

exports.testDerefReturnsTheCurrentValue = function(test){
    var value = 42,
        at = atom.atom(value);

    test.equal(at.deref(), value, "The atom should have the value which it was created with");

    test.done();
};

exports.testResetChangesTheCurrentValue = function(test){
    var oldValue = 42,
        newValue = 43,
        at = atom.atom(oldValue);

    at.reset(newValue);
    test.equal(at.deref(), newValue, "The atom should have the value which was given when calling reset");

    test.done();
};

exports.testSwapAppliestheFunctionToTheCurrentValueUpdatingIt = function(test){
    var oldValue = 42,
        inc = function(x) { return x + 1; },
        expectedNewValue = 43,
        at = atom.atom(oldValue);

    at.swap(inc);
    test.equal(at.deref(), expectedNewValue, "The atom should have the value resulting of applying the function given to swap");

    test.done();
};

exports.testWatchersGetNotifiedOnValueChange = function(test){
    var oldValue = 42,
        inc = function(x) { return x + 1; },
        expectedNewValue = 43,
        at = atom.atom(oldValue);

    at.addWatch(function(theAtom, theOldValue, theNewValue){
        test.equal(theAtom, at);
        test.equal(theOldValue, oldValue);
        test.equal(theNewValue, expectedNewValue);
        test.done();
    });
    at.swap(inc);
};

exports.testMultipleWatchersGetNotifiedOnValueChange = function(test){
    var oldValue = 42,
        inc = function(x) { return x + 1; },
        expectedNewValue = 43,
        at = atom.atom(oldValue);

    at.addWatch(function(theAtom, theOldValue, theNewValue){
        test.equal(theAtom, at);
        test.equal(theOldValue, oldValue);
        test.equal(theNewValue, expectedNewValue);
    });

    at.addWatch(function(theAtom, theOldValue, theNewValue){
        test.equal(theAtom, at);
        test.equal(theOldValue, oldValue);
        test.equal(theNewValue, expectedNewValue);
        test.done();
    });

    at.swap(inc);
};

exports.testWatchersCanBeRemoved = function(test){
    var oldValue = 42,
        inc = function(x) { return x + 1; },
        expectedNewValue = 43,
        at = atom.atom(oldValue);

    var watch = function(theAtom, theOldValue, theNewValue){
        test.ok(false);
    };

    at.addWatch(watch);
    at.removeWatch(watch);
    at.swap(inc);

    test.done();
};

// TODO: options: validators
