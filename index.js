function Atom(value, options){
    this._validator = options && options.validator ?
                            options.validator :
                            function(){ return true; };

    this._historySize = options && (typeof(options.historySize) === 'number') ?
                            options.historySize :
                            100;

    this._history = [];
    this._watches = [];
    this._value = value;
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

Atom.prototype.notifyWatchers = function(oldVal, newVal){
    var self = this;
    this._watches.forEach(function(wf){
        wf(self, oldVal, newVal);
    });
};

Atom.prototype.deref = function(){
    return this._value;
};

Atom.prototype.reset = function(value){
    // validation
    if (!this._validator(value)){
        throw new Error("The value does not validate: " + value);
    }
    var oldVal = this.deref();
    // history
    this._history.push(oldVal);
    this._history = this._history.reverse()
                          .slice(0, this._historySize)
                          .reverse();
    this._value = value;
    // watchers
    this.notifyWatchers(oldVal, value);
};

Atom.prototype.swap = function(f){
    this.reset(f(this.deref()));
};

Atom.prototype.getHistory = function(){
    return this._history.slice();
};

function atom(value, options){
    return new Atom(value, options ? options : {});
};

module.exports = {
    atom: atom,
    Atom: Atom
};
