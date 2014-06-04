'use strict';

angular.module('firePollsApp.controllers', [])
    .controller('MainCtrl', ['$scope', 'Questions', function ($scope, Questions) {
        Questions.sync().$bind($scope, 'questions');

        /* Action Handlers */
        $scope.onSubmit = function (e) {
            if ($scope.question) {
                return Questions.create({question: $scope.question});
            }
        };

        $scope.onDelete = function (e, id) {
            e.stopPropagation();
            $scope.questions.$remove(id);
        };
    }]);
