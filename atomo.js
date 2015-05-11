// ================================================================================
//  Constructors

function Atom(value, options){
    this._validator = options && options.validator || isAlwaysValid;
    this._watches = [];
    this._validate(value);
    this._value = value;
};

function atom(value, options){
    return new Atom(value, options || {});
};

// ================================================================================
//  Type checking

function isAtom(maybeAtom){
    return maybeAtom instanceof Atom;
}

Atom.prototype.isAtom = isAtom;


// ================================================================================
// Validation

Atom.prototype._validate = function(value){
    if (!this._validator(value)){
        throw new Error("The value does not validate: " + value);
    }
};

// ================================================================================
// Watches

Atom.prototype.addWatch = function(wf){
    if (this._watches.indexOf(wf) === -1) {
        this._watches.push(wf);
    }
};

Atom.prototype.removeWatch = function(wf){
    var idx = this._watches.indexOf(wf);
    if (idx !== -1) {
        this._watches.splice(idx, 1);
    }
};

Atom.prototype._notifyWatchers = function(oldVal, newVal){
    var self = this;
    this._watches.forEach(function(wf){
        wf(self, oldVal, newVal);
    });
};

// ================================================================================
// Atomic operations

Atom.prototype.deref = function(){
    return this._value;
};

Atom.prototype.reset = function(value){
    var oldVal = this.deref();
    this._validate(value);
    this._value = value;

    this._notifyWatchers(oldVal, value);

    return value;
};

Atom.prototype.swap = function(f /*, args */){
    var args = [].slice.call(arguments, 1);
    args.splice(0, 0, this.deref());
    return this.reset(f.apply(null, args));
};

// ================================================================================
//  Helpers

function isAlwaysValid() { return true; };

// ================================================================================
//  Public API

module.exports = {
    atom: atom,
    Atom: Atom,
    isAtom: isAtom
};
