'use strict';

angular.module('firePollsApp.controllers', [])
    .controller('MainCtrl', ['$scope', 'Questions', function ($scope, Questions) {
        /* Initialization */
        Questions.sync().$bind($scope, 'questions');
        $scope.questionTypes = ['True/False', 'Multiple Choice'];
        $scope.selections = {selectedQuestionType: $scope.questionTypes[0], multipleChoiceOptions: [{value: ''}, {value: ''}]};

        /* Action Handlers */
        $scope.onSubmit = function () {
            if ($scope.question) {
                var options;
                if ($scope.selections.selectedQuestionType === 'True/False') {
                    options = [{value: true}, {value: false}];
                } else {
                    options = $scope.multipleChoiceOptions;
                }
                return Questions.create({question: $scope.question, options: options});
            }
        };

        $scope.onDelete = function (e, id) {
            e.stopPropagation();
            $scope.questions.$remove(id);
        };
    }]);
