angular.module('firePollsApp.constraints').value('unique', function (ref, handler, item, property) {
    if (ref && handler && item) {
        if (_.map(ref(), property || id).indexOf(item[property]) === -1) {
            handler(item)
        }
    } else {
        throw "You must pass a Firebase reference, a handler, and an item for a unique constraint.";
    }
});