angular.module('firePollsApp.services').factory('Questions',
    ['firebaseRef', 'syncData',
        function (firebaseRef, syncData) {
            var _url = '/questions', _ref = firebaseRef(_url);
            return {
                create: function (question) {
                    return _ref.push(question);
                },
                sync: function () {
                    return syncData(_url);
                }
            };
        }]);