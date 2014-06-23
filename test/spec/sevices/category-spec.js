'use strict';

describe('Service: Category', function () {

    // load the controller's module
    beforeEach(function () {
        refInstance = jasmine.createSpyObj('refInstance', ['push']);
        module('firePollsApp.services', {
            firebaseRef: jasmine.createSpy('firebaseRef').andReturn(refInstance),
            syncData: jasmine.createSpy('syncData')
        });
    });

    var service, firebaseRef, syncData, refInstance;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_Category_, _firebaseRef_, _syncData_) {
        service = _Category_;
        firebaseRef = _firebaseRef_;
        syncData = _syncData_;
    }));

    describe("create", function () {
        it("Should call the push method on the refInstance with the category passed in", function () {
            var category = {id: 189, name: 'Cheese'};

            service.create(category);
            expect(refInstance.push).toHaveBeenCalledWith(category);
        });
    });

    describe("sync", function () {
        it("Should call the syncData method with the url for categories", function () {
            service.sync();
            expect(syncData).toHaveBeenCalledWith('/categories');
        });
    });
});
