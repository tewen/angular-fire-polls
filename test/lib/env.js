/* Overwrites normal memoize behavior for testing */
var memoize = function (fn) {
    return fn;
};