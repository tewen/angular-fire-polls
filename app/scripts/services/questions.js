angular.module('firePollsApp.services').factory('Questions',
    ['firebaseRef', 'syncData',
        function (firebaseRef, syncData) {
            var _url = '/questions', _ref = firebaseRef(_url);
            return {
                create: function (question) {
                    return _ref.push(question);
                },
                remove: function (id) {
                    return _ref.child(id).remove(function (error) {
                        console.log(error)
                    });
                },
                sync: function () {
                    return syncData(_url);
                }
            };
        }]);