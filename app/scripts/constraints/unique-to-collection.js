angular.module('firePollsApp.constraints').value('uniqueToCollection',
    function (value, collection, propertyForComparison, caseSensitive) {
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
                    collection = _.map(collection, function (item) {
                        var val = _hpGet(item, propertyForComparison);
                        if (val && !caseSensitive) {
                            val = val.toLowerCase();
                        }
                        return val;
                    });
                }
                return collection.indexOf(value) === -1;
            }
            return false;
        }
        return true;
    });