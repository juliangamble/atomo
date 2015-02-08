jest.dontMock("../index");

var atom = require('../index');

describe("atom", function(){
    describe("'deref'", function() {
        it("returns the current value of the atom", function(){
            var value = 42,
                at = atom.atom(value);

            expect(at.deref()).toBe(value, "The atom should have the value which it was created with");
        });
    });

    describe("'reset'", function() {
        it("changes the current value of the atom", function(){
            var oldValue = 42,
                newValue = 43,
                at = atom.atom(oldValue);

            expect(at.reset(newValue)).toBe(newValue, "The reset method should return the new value of the atom");
            expect(at.deref()).toBe(newValue, "The atom should have the value which was given when calling reset");
        });
    });

    describe("'swap'", function() {
        it("applies the function to the current value updating it", function(){
            var oldValue = 42,
                inc = function(x) { return x + 1; },
                expectedNewValue = 43,
                at = atom.atom(oldValue);

            expect(at.swap(inc)).toBe(expectedNewValue, "The swap method should return the new value of the atom");
            expect(at.deref()).toBe(expectedNewValue, "The atom should have the value resulting of applying the function given to swap");
        });
    });
});


//exports.testResetChangesTheCurrentValue = function(test){

//
//exports.testWatchersGetNotifiedOnValueChange = function(test){
//    var oldValue = 42,
//        inc = function(x) { return x + 1; },
//        expectedNewValue = 43,
//        at = atom.atom(oldValue);
//
//    at.addWatch(function(theAtom, theOldValue, theNewValue){
//        test.equal(theAtom, at);
//        test.equal(theOldValue, oldValue);
//        test.equal(theNewValue, expectedNewValue);
//        test.done();
//    });
//    at.swap(inc);
//};
//
//exports.testMultipleWatchersGetNotifiedOnValueChange = function(test){
//    var oldValue = 42,
//        inc = function(x) { return x + 1; },
//        expectedNewValue = 43,
//        at = atom.atom(oldValue);
//
//    at.addWatch(function(theAtom, theOldValue, theNewValue){
//        test.equal(theAtom, at);
//        test.equal(theOldValue, oldValue);
//        test.equal(theNewValue, expectedNewValue);
//    });
//
//    at.addWatch(function(theAtom, theOldValue, theNewValue){
//        test.equal(theAtom, at);
//        test.equal(theOldValue, oldValue);
//        test.equal(theNewValue, expectedNewValue);
//        test.done();
//    });
//
//    at.swap(inc);
//};
//
//exports.testWatchersCanBeRemoved = function(test){
//    var oldValue = 42,
//        inc = function(x) { return x + 1; },
//        expectedNewValue = 43,
//        at = atom.atom(oldValue);
//
//    var watch = function(theAtom, theOldValue, theNewValue){
//        test.ok(false);
//    };
//
//    at.addWatch(watch);
//    at.removeWatch(watch);
//    at.swap(inc);
//
//    test.done();
//};
//
//// TODO: options: validators
//
