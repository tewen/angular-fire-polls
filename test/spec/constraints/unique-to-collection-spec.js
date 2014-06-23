'use strict';

describe('uniqueToCollection', function () {

    beforeEach(module('firePollsApp.constraints'));

    var constraint;

    beforeEach(inject(function (_uniqueToCollection_) {
        constraint = _uniqueToCollection_;
    }));

    it("Should return true for an undefined collection", function () {
        expect(constraint({id: 18}, undefined)).toBeTruthy();
    });

    it("Should return true for a null collection", function () {
        expect(constraint({id: 19}, null)).toBeTruthy();
    });

    it("Should return false for an undefined value", function () {
        expect(constraint(undefined, [])).toBeFalsy();
    });

    it("Should return false for a null value", function () {
        expect(constraint(null, [])).toBeFalsy();
    });

    it("Should be able to play nice with 0", function () {
        expect(constraint(0, [])).toBeTruthy();
    });

    it("Should just compare the object if a property is not specified in the true case", function () {
        expect(constraint({id: 197}, [
            {id: 198},
            {id: 209}
        ])).toBeTruthy();
    });

    it("Should just compare the object if the property is not specified in the false case", function () {
        expect(constraint({id: 198}, [
            {id: 198},
            {id: 209}
        ])).toBeFalsy();
    });

    it("Should compare the property if specified in the true case", function () {
        expect(constraint({id: 197, name: 'Tom'}, [
            {id: 198, name: 'Mike'},
            {id: 209}
        ], 'name')).toBeTruthy();
    });

    it("Should compare the property if specified in the false case", function () {
        expect(constraint('Tom', [
            {id: 198, name: 'Mike'},
            {id: 209, name: 'Tom'}
        ], 'name')).toBeFalsy();
    });

    it("Should support dot properties in the true case", function () {
        expect(constraint('Tom', [
            {id: 198, name: {first: 'Mike'}},
            {id: 209}
        ], 'name.first')).toBeTruthy();
    });

    it("Should support dot properties in the false case", function () {
        expect(constraint('Tom', [
            {id: 198, name: {first: 'Mike'}},
            {id: 209, name: {first: 'Tom'}}
        ], 'name.first')).toBeFalsy();
    });

    it("Should be case insensitive by default", function () {
        expect(constraint('tom', [
            {id: 198, name: {first: 'Mike'}},
            {id: 209, name: {first: 'Tom'}}
        ], 'name.first')).toBeFalsy();
    });

    it("Should be able to flip on case sensitivity", function () {
        expect(constraint('tom', [
            {id: 198, name: {first: 'Mike'}},
            {id: 209, name: {first: 'Tom'}}
        ], 'name.first', true)).toBeTruthy();
    });
});
