'use strict';

describe('Service: Question', function () {

    // load the controller's module
    beforeEach(function () {
        refInstance = jasmine.createSpyObj('refInstance', ['push', 'child']);
        refInstance.child.andReturn(jasmine.createSpyObj('refInstance.child', ['remove']));
        module('firePollsApp.services', {
            firebaseRef: jasmine.createSpy('firebaseRef').andReturn(refInstance),
            syncData: jasmine.createSpy('syncData')
        });
    });

    var service, firebaseRef, syncData, refInstance;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Question_, _firebaseRef_, _syncData_) {
        service = _Question_;
        firebaseRef = _firebaseRef_;
        syncData = _syncData_;
    }));

    describe("create", function () {
        it("Should call refInstance.push with the question passed in", function () {
            var question = {id: 718, value: 'What is your name?'};

            service.create(question);
            expect(refInstance.push).toHaveBeenCalledWith(question);
        });
    });

    describe("remove", function () {
        it("Should call refInstance.child with the id", function () {
            service.remove(187);
            expect(refInstance.child).toHaveBeenCalledWith(187);
        });
        
        it("Should call the remove spy after calling the child with the id", function () {
            var removeSpy = refInstance.child().remove;

            service.remove(187);
            expect(removeSpy).toHaveBeenCalledWith();
        });
    });

    describe("sync", function () {
        it("Should call the syncData method with the /questions url", function () {
            service.sync();
            expect(syncData).toHaveBeenCalledWith('/questions');
        });
    });
});
