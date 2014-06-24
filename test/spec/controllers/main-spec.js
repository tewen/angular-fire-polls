'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('firePollsApp.controllers', 'firePollsApp.constraints', {
        Category: jasmine.createSpyObj('Category', ['sync', 'create']),
        Question: jasmine.createSpyObj('Question', ['sync', 'create'])
    }));

    var MainCtrl,
        scope,
        Question,
        Category,
        categoryBindSpy,
        questionBindSpy;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _Question_, _Category_) {
        scope = $rootScope.$new();
        scope.categories = jasmine.createSpyObj('scope.categories', ['$add', '$remove']);
        scope.questions = jasmine.createSpyObj('scope.questions', ['$add', '$remove']);
        categoryBindSpy = jasmine.createSpy('categoryBindSpy');
        questionBindSpy = jasmine.createSpy('questionBindSpy');
        Category = _Category_;
        Category.sync.andReturn({$bind: categoryBindSpy});
        Question = _Question_;
        Question.sync.andReturn({$bind: questionBindSpy});
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));


    describe("Initialization", function () {

        it("Should call Category.sync", function () {
            expect(Category.sync).toHaveBeenCalledWith();
        });

        it("Should call Question.sync", function () {
            expect(Question.sync).toHaveBeenCalledWith();
        });

        it("Should call the $bind on sync with $scope and categories", function () {
            expect(categoryBindSpy).toHaveBeenCalledWith(scope, 'categories');
        });

        it("Should call the $bind on sync with $scope and questions", function () {
            expect(questionBindSpy).toHaveBeenCalledWith(scope, 'questions');
        });

        it("Should throw questionTypes on the $scope", function () {
            expect(scope.questionTypes).toEqual(['True/False', 'Multiple Choice']);
        });

        it("Should set the scope.selections.selectedCategoryFilter to null", function () {
            expect(scope.selections.selectedCategoryFilter).toBeNull();
        });

        it("Should set scope.selectedQuestionType to the first of the question types", function () {
            expect(scope.selections.selectedQuestionType).toEqual(scope.questionTypes[0]);
        });

        it("Should set the scope.selections.multipleChoiceOptions to two blank values", function () {
            expect(scope.selections.multipleChoiceOptions).toEqual([
                {value: ''},
                {value: ''}
            ]);
        });
    });

    describe("Action Handlers", function () {
        describe("onSubmit", function () {
            beforeEach(function () {
                scope.question = 'What is your favorite cheese?';
                scope.answer = 'true';
                scope.category = 'Burger';
            });

            it("Should not call scope.questions.$add if there is no question defined on the scope", function () {
                scope.question = '';
                scope.onSubmit();
                expect(scope.questions.$add).not.toHaveBeenCalled();
            });

            it("Should not call scope.questions.$add if the answer is undefined", function () {
                scope.answer = undefined;
                scope.onSubmit();
                expect(scope.questions.$add).not.toHaveBeenCalled();
            });

            it("Should call scope.questions.$add when the answer is 0 (index for question)", function () {
                scope.answer = 1;
                scope.selections.selectedQuestionType = 'Multiple Choice';
                scope.selections.multipleChoiceOptions = ['Bread', 'Salami'];
                scope.onSubmit();
                expect(scope.questions.$add).toHaveBeenCalledWith({
                    question: scope.question,
                    options: scope.selections.multipleChoiceOptions,
                    answer: scope.selections.multipleChoiceOptions[scope.answer],
                    category: scope.category
                });
            });

            it("Should call scope.questions.$add if there is no question defined on the scope", function () {
                scope.onSubmit();
                expect(scope.questions.$add).toHaveBeenCalledWith({
                    question: scope.question, options: [
                        {value: true},
                        {value: false}
                    ], answer: 'true', category: scope.category});
            });

            describe("category", function () {
                beforeEach(function () {
                    /* Reset spy which is called above */
                    Category.create.reset();
                    
                    scope.category = 'Philly Cheese';
                    scope.getCategories = jasmine.createSpy('scope.getCategories').andReturn([
                        {name: 'Cheese'},
                        {name: 'Toast'}
                    ]);
                });

                it("Should not call Category.create with the scope.category as the name if the $scope.question, category, and uniqueForCollection returns false", function () {
                    scope.category = 'Cheese';
                    scope.onSubmit();
                    expect(Category.create).not.toHaveBeenCalled();
                });

                it("Should not call Category.create when there is non category", function () {
                    scope.category = null;
                    scope.onSubmit();
                    expect(Category.create).not.toHaveBeenCalled();
                });

                it("Should call Category.create with the scope.category as the name if the $scope.question, category, and uniqueForCollection returns true", function () {
                    scope.onSubmit();
                    expect(Category.create).toHaveBeenCalledWith({name: scope.category});
                });

                it("Should call scope.questions.$add with the category as the last argument", function () {
                    scope.onSubmit();
                    expect(scope.questions.$add).toHaveBeenCalledWith({
                        question: scope.question,
                        options: [
                            {value: true},
                            {value: false}
                        ],
                        category: scope.category,
                        answer: 'true'
                    });
                });
            });

        });

        describe("onDelete", function () {
            var event;

            beforeEach(function () {
                event = jasmine.createSpyObj('event', ['stopPropagation']);
            });

            it("Should call the event.stopPropagation method", function () {
                scope.onDelete(event, '25OR624');
                expect(event.stopPropagation).toHaveBeenCalledWith();
            });

            it("Should call the $remove method with the id on $scope.questions", function () {
                scope.onDelete(event, '25OR624');
                expect(scope.questions.$remove).toHaveBeenCalledWith('25OR624');
            });
        });
    });

    describe("Getters", function () {
        describe("getCategories", function () {

            it("Should return an empty array if there are no categories on the scope", function () {
                scope.categories = null;
                expect(scope.getCategories()).toEqual([]);
            });

            it("Should reject any functions defined within the categories on the scope", function () {
                scope.categories = [function () {
                }, {id: 89, name: 'Tacos'}];
                expect(scope.getCategories()).toEqual([
                    {id: 89, name: 'Tacos'}
                ]);
            });

            it("Should make primitives into objects where the val is the name key", function () {
                scope.categories = ["Cheddar", {id: 89, name: 'Tacos'}];
                expect(scope.getCategories()).toEqual([
                    {name: "Cheddar"},
                    {id: 89, name: 'Tacos'}
                ]);
            });

            it("Should do nothing to category of object type in the list", function () {
                scope.categories = [
                    {id: 90},
                    {id: 89, name: 'Tacos'}
                ];

                var copy = angular.copy(scope.categories);
                expect(scope.getCategories()).toEqual(copy);
            });

        });
    });
});
