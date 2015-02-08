jest.dontMock("../index");

var atom = require('../index');

describe("atom", function(){
    describe("'deref'", function(){
        it("returns the current value of the atom", function(){
            var value = 42,
                at = atom.atom(value);

            expect(at.deref()).toBe(value, "The atom should have the value which it was created with");
        });
    });

    describe("'reset'", function(){
        it("changes the current value of the atom", function(){
            var oldValue = 42,
                newValue = 43,
                at = atom.atom(oldValue);

            expect(at.reset(newValue)).toBe(newValue, "The reset method should return the new value of the atom");
            expect(at.deref()).toBe(newValue, "The atom should have the value which was given when calling reset");
        });
    });

    describe("'swap'", function(){
        it("applies the function to the current value updating it", function(){
            var oldValue = 42,
                inc = function(x) { return x + 1; },
                expectedNewValue = 43,
                at = atom.atom(oldValue);

            expect(at.swap(inc)).toBe(expectedNewValue, "The swap method should return the new value of the atom");
            expect(at.deref()).toBe(expectedNewValue, "The atom should have the value resulting of applying the function given to swap");
        });
    });

    describe("validation", function(){
        // TODO
    });

    describe("observers", function(){
        it("get notified on value change", function(){
            var oldValue = 42,
                inc = function(x) { return x + 1; },
                expectedNewValue = 43,
                at = atom.atom(oldValue);

            var watcher = jest.genMockFunction();
            at.addWatch(watcher);

            at.swap(inc);

            expect(watcher).toBeCalledWith(at, oldValue, expectedNewValue);
        });

        it("all get notified on value change", function(){
            var oldValue = 42,
                inc = function(x) { return x + 1; },
                expectedNewValue = 43,
                at = atom.atom(oldValue);

            var aWatcher = jest.genMockFunction(),
                anotherWatcher = jest.genMockFunction();
            at.addWatch(aWatcher);
            at.addWatch(anotherWatcher);

            at.swap(inc);

            expect(aWatcher).toBeCalledWith(at, oldValue, expectedNewValue);
            expect(anotherWatcher).toBeCalledWith(at, oldValue, expectedNewValue);
        });

        it("can be removed", function(){
            var oldValue = 42,
                inc = function(x) { return x + 1; },
                expectedNewValue = 43,
                at = atom.atom(oldValue);

            var watcher = jest.genMockFunction();
            at.addWatch(watcher);
            at.removeWatch(watcher);

            at.swap(inc);

            expect(watcher).not.toBeCalled();
        });
    });
});
