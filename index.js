//
// proto.js - prototype & other core extensions
//
if (typeof(window) !== 'undefined') { GLOBAL = window }

// Get the string representation of an object's type.
// Based on Douglas Crockford's version, with the addition
// of a RegExp check.
Object.typeOf = function (value) {
    var s = typeof(value),
        types = [Object, String, RegExp, Number, Function, Boolean, Date];

    if (Array.isArray(value)) {
        return 'array';
    } else if (s === 'object' || s === 'function') {
        if (value) {
            types.forEach(function (t) {
                if (value instanceof t) { s = t.name.toLowerCase() }
            });
        } else { s = 'null' }
    }
    return s;
}


//
// Type equality functions
//
Object.isObject     = function (o) { return Object.typeOf(o) === 'object' };
String.isString     = function (o) { return Object.typeOf(o) === 'string' };
Function.isFunction = function (o) { return Object.typeOf(o) === 'function' };
RegExp.isRegExp     = function (o) { return Object.typeOf(o) === 'regexp' };
Boolean.isBoolean   = function (o) { return Object.typeOf(o) === 'boolean' };

//
// Object
//
Object.forEach = function (obj, fun) {
    Object.keys(obj).forEach(function (key) {
        return fun(key, obj[key]);
    });
    return obj;  
};
Object.isEmpty = function (obj) {
    return Object.keys(obj).length === 0;
};

Object.mixin = function (target) {
    var args = Array.prototype.slice.call(arguments, 1);
    
    args.forEach(function (a) {
        var keys = Object.keys(a);
        for (var i = 0; i < keys.length; i++) {
            target[keys[i]] = a[keys[i]];
        }
    });
    return target;
};

//
// Array
//
Array.prototype.first = function () { return this[0] };
Array.prototype.last = function () { return this[this.length - 1] };
Array.prototype.compact = function () {
    return this.filter(function (i) { return !! i });
};
Array.prototype.includes = function (needle) {
    return this.indexOf(needle) === -1 ? false : true;
};
Array.prototype.include = Array.prototype.includes;
Array.prototype.find = function (fun) {
    for (var i = 0; i < this.length; i++) { if (ret = fun(this[i])) return ret; }
    return false;
};
Array.prototype.flatten = function () {
    return this.reduce(function (memo, value) {
        if (value.is(Array)) return memo.concat(value.flatten());
        memo.push(value);
        return memo;
    }, []);
};
Array.prototype.uniq = function () {
    return this.reduce(function (memo, value) {
        if (! memo.includes(value)) memo.push(value);
        return memo;
    }, []);
};

//
// String
//

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

String.prototype.stylize = function (style) {
    var styles = {
        bold      : [1,  22],
        underline : [4,  24],
        inverse   : [7,  27],
        cyan      : [36, 39],
        magenta   : [35, 39],
        yellow    : [33, 39],
        green     : [32, 39],
        red       : [31, 39]
    };
    return '\033[' + styles[style][0] + 'm' + this +
           '\033[' + styles[style][1] + 'm';
};

