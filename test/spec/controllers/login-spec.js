'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('firePollsApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('LoginCtrl', {
            $scope: scope
        });
    }));

});