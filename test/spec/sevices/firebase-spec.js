'use strict';

describe('Service: firebaseRef & syncData', function () {

    // load the controller's module
    beforeEach(module('angularfire.firebase', {
        $firebase: jasmine.createSpy('$firebase'),
        Firebase: jasmine.createSpy('Firebase'),
        FBURL: 'http://some/fake/path'
    }));

    var firebaseRef, syncData, $firebase, Firebase, firebaseReturn;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_firebaseRef_, _syncData_, _$firebase_, _Firebase_) {
        firebaseRef = _firebaseRef_;
        syncData = _syncData_;
        $firebase = _$firebase_;
        Firebase = _Firebase_;

        firebaseReturn = jasmine.createSpyObj('firebaseReturn', ['limit']);
        Firebase.andReturn(firebaseReturn)
    }));

    describe("firebaseRef", function () {

        it("Should play nice with a path connected to the FBURL", function () {
            firebaseRef('my/special/path');
            expect(Firebase).toHaveBeenCalledWith('http://some/fake/path/my/special/path');
        });

        it("Should play nice with an array of options connected to the FBURL", function () {
            firebaseRef('this', 'is', 7, 'path');
            expect(Firebase).toHaveBeenCalledWith('http://some/fake/path/this/is/7/path');
        });

    });

    describe("syncData", function () {

        it("Should create a ref with the path and call the $firebase service with it", function () {
            syncData('my/old/path');
            expect($firebase).toHaveBeenCalledWith(firebaseReturn);
        });

        it("Should not call limit if it is undefined", function () {
            syncData('my/old/path');
            expect(firebaseReturn.limit).not.toHaveBeenCalled();
        });

        it("Should call limit if it defined", function () {
            syncData('my/old/path', 29);
            expect(firebaseReturn.limit).toHaveBeenCalledWith(29);
        });

    });
});
