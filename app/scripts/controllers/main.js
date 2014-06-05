'use strict';

angular.module('firePollsApp.controllers', [])
    .controller('MainCtrl', ['$scope', 'Questions', function ($scope, Questions) {
        /* Initialization */
        Questions.sync().$bind($scope, 'questions');
        $scope.questionTypes = ['True/False', 'Multiple Choice'];
        $scope.selections = {selectedQuestionType: $scope.questionTypes[0]};


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
