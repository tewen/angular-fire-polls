angular.module('firePollsApp.services').factory('Category',
    ['firebaseRef', 'syncData',
        function (firebaseRef, syncData) {
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