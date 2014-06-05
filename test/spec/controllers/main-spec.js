'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('firePollsApp.controllers', {
        Questions: jasmine.createSpyObj('Questions', ['sync'])
    }));

    var MainCtrl,
        scope,
        Questions,
        $bindSpy;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _Questions_) {
        scope = $rootScope.$new();
        $bindSpy = jasmine.createSpy('$bindSpy');
        Questions = _Questions_;
        Questions.sync.andReturn({$bind: $bindSpy});
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));


    describe("Initialization", function () {

        it("Should call Questions.sync", function () {
            expect(Questions.sync).toHaveBeenCalledWith();
        });

        it("Should call the $bind on sync with $scope and questions", function () {
            expect($bindSpy).toHaveBeenCalledWith(scope, 'questions');
        });

        it("Should throw questionTypes on the $scope", function () {
            expect(scope.questionTypes).toEqual(['True/False', 'Multiple Choice']);
        });

        it("Should set scope.selectedQuestionType to the first of the question types", function () {
            expect(scope.selectedQuestionType).toEqual(scope.questionTypes[0]);
        });
    });

    describe("Action Handlers", function () {
        describe("onSubmit", function () {

        });

        describe("onDelete", function () {
            it("Should call the event.stopPropagation method", function () {

            });

            it("Should call the $remove method with the id on $scope.questions", function () {

            });
        });
    });
});
