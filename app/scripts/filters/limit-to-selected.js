angular.module('firePollsApp.filters').filter('limitToSelected', function () {
    return function (collection, selectedItem, property) {
        if (collection && collection.length && selectedItem) {
            return _.filter(collection, function (item) {
                return item[property] === selectedItem;
            });
        }
        return collection;
    };
});