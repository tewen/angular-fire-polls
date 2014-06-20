angular.module('firePollsApp.services').factory('Category',
    ['firebaseRef', 'syncData', 'unique',
        function (firebaseRef, syncData, unique) {
            var _url = '/categories', _ref = firebaseRef(_url);
            return {
                create: function (category) {
                    return _ref.push(category);
                },
                sync: function () {
                    return syncData(_url);
                }
            };
        }]);