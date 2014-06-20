'use strict';

angular.module('firePollsApp.controllers')
    .controller('MainCtrl', ['$scope', 'Category', 'Question', function ($scope, Category, Question) {
        /* Data Syncs */
        Category.sync().$bind($scope, 'categories');
        Question.sync().$bind($scope, 'questions');

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
                if ($scope.category && _.map($scope.getCategories(), function (cat) {
                    return cat.name.toLowerCase();
                }).indexOf($scope.category.toLowerCase()) === -1) {
                    Category.create({name: $scope.category});
                }
                return $scope.questions.$add({question: $scope.question, options: options});
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
                    .reject(function (val, key) {
                        return typeof val == 'function';
                    }).map(function (val, key) {
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
