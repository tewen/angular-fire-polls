(function (angular) {

    var uniqueToCollection = function (value, collection, propertyForComparison, caseSensitive) {
        if (caseSensitive === undefined) {
            caseSensitive = false;
        }
        var _hpGet = Neosavvy.Core.Utils.MapUtils.highPerformanceGet;
        if (collection) {
            if (value !== undefined && value !== null) {
                if (typeof value !== 'object') {
                    value = caseSensitive ? String(value) : String(value).toLowerCase();
                }
                if (propertyForComparison) {
                    for (var i = 0; i < collection.length; i++) {
                        var val = _hpGet(collection[i], propertyForComparison);
                        if (val && !caseSensitive) {
                            val = val.toLowerCase();
                        }
                        if (val === value) {
                            return false
                        }
                    }
                } else {
                    return JSON.stringify(collection).indexOf(JSON.stringify(value)) === -1;
                }
            } else {
                return false;
            }
        }
        return true;
    };

    angular.module('firePollsApp.constraints').value('uniqueToCollection', uniqueToCollection);
    angular.module('firePollsApp.constraints').value('uniqueToCollectionCached', memoize(uniqueToCollection));
})(angular);

