'use strict';

describe('unique', function () {

  // load the controller's module
  beforeEach(module('firePollsApp.constraints'));

  var constraint;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_unique_) {
    constraint = _unique_;
  }));

    it("Should throw an error when not passed a ref", function () {
        expect(function () {
            constraint(null, function () {}, [1]);
        }).toThrow();
    });

    it("Should throw an error when not passed a function", function () {
        expect(function () {
            constraint({}, undefined, [1]);
        }).toThrow();
    });

    it("Should throw an error when not passed arguments", function () {
        expect(function () {
            constraint(null, function () {}, null);
        }).toThrow();
    });

    it("Should throw an error when not passed a single argument", function () {
        expect(function () {
            constraint(null, function () {}, []);
        }).toThrow();
    });

    it("Should use the id by default", function () {

    });


});
