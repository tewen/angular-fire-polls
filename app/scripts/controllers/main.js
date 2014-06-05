'use strict';

angular.module('firePollsApp.controllers', [])
    .controller('MainCtrl', ['$scope', 'Questions', function ($scope, Questions) {
        /* Data Syncs */
        Questions.sync().$bind($scope, 'questions');

        /* Initialization */
        $scope.questionTypes = ['True/False', 'Multiple Choice'];
        $scope.selections = {selectedQuestionType: $scope.questionTypes[0], multipleChoiceOptions: [
            {value: ''},
            {value: ''}
        ]};

        /* Action Handlers */
        $scope.onSubmit = function () {
            if ($scope.question) {
                var options;
                if ($scope.selections.selectedQuestionType === 'True/False') {
                    options = [
                        {value: true},
                        {value: false}
                    ];
                } else {
                    options = $scope.selections.multipleChoiceOptions;
                }
                return $scope.questions.$add({question: $scope.question, options: options});
            }
        };

        $scope.onDelete = function (e, id) {
            e.stopPropagation();
            $scope.questions.$remove(id);
        };
    }]);
