'use strict';

angular.module('firePollsApp.controllers')
    .controller('MainCtrl', ['$scope', 'Category', 'Question', 'uniqueToCollectionCached',
        function ($scope, Category, Question, uniqueToCollection) {
            /* Data Syncs */
            Category.sync().$bind($scope, 'categories');
            Question.sync().$bind($scope, 'questions');

            /* Initialization */
            $scope.questionTypes = ['True/False', 'Multiple Choice'];
            $scope.selections = {
                selectedCategoryFilter: null,
                selectedQuestionType: $scope.questionTypes[0], multipleChoiceOptions: [
                    {value: ''},
                    {value: ''}
                ]
            };

            /* Action Handlers */
            $scope.onSubmit = function () {
                if ($scope.question) {
                    if ($scope.answer !== undefined) {
                        var options = ($scope.selections.selectedQuestionType === 'True/False' ? [
                            {value: true},
                            {value: false}
                        ] : $scope.selections.multipleChoiceOptions);

                        if ($scope.category && uniqueToCollection($scope.category, $scope.getCategories(), 'name')) {
                            Category.create({name: $scope.category});
                        }

                        return $scope.questions.$add({
                            question: $scope.question,
                            answer: $scope.selections.selectedQuestionType === 'True/False' ? $scope.answer : options[$scope.answer],
                            options: options,
                            category: $scope.category
                        });
                    } else {
                        $scope.error = 'Please choose an answer for the question.';
                    }
                } else {
                    $scope.error = 'Please enter a question.';
                }
            };

            $scope.onDelete = function (e, id) {
                e.stopPropagation();
                $scope.questions.$remove(id);
            };

            /* Getters */
            $scope.getCategories = function () {
                if ($scope.categories) {
                    return _($scope.categories)
                        .reject(function (val) {
                            return typeof val == 'function';
                        }).map(function (val) {
                            if (typeof val !== 'object') {
                                val = {name: val};
                            }
                            return val
                        }).valueOf();
                } else {
                    return [];
                }
            };
        }]);
