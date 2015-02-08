function isValid() { return true; };

function Atom(value, options){
    this._validator = options && options.validator ?
                            options.validator :
                            isValid;
    this._watches = [];

    this._validate(value);
    this._value = value;
};

function atom(value, options){
    return new Atom(value, options ? options : {});
};

// Validation

Atom.prototype._validate = function(value){
    if (!this._validator(value)){
        throw new Error("The value does not validate: " + value);
    }
};

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

Atom.prototype.swap = function(f){
    return this.reset(f(this.deref()));
};

module.exports = {
    atom: atom,
    Atom: Atom
};
