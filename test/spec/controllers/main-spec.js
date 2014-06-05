'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('firePollsApp.controllers', {
        Category: jasmine.createSpyObj('Category', ['sync']),
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
            it("Should not call scope.questions.$add if there is no question defined on the scope", function () {
                scope.question = '';
                scope.onSubmit();
                expect(scope.questions.$add).not.toHaveBeenCalled();
            });

            it("Should call scope.questions.$add if there is no question defined on the scope", function () {
                scope.question = 'What is your favorite color?';
                scope.onSubmit();
                expect(scope.questions.$add).toHaveBeenCalledWith({question: scope.question, options: [
                    {value: true},
                    {value: false}
                ]});
            });

            it("Should call scope.questions.$add with multipleChoiceOptions if there is no question defined on the scope", function () {
                scope.question = 'What is your favorite color?';
                scope.selections.selectedQuestionType = 'Multiple Choice';
                scope.onSubmit();
                expect(scope.questions.$add).toHaveBeenCalledWith({question: scope.question, options: [
                    {value: ''},
                    {value: ''}
                ]
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
});
