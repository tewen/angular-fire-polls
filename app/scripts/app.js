'use strict';

angular.module('firePollsApp.controllers', []);
angular.module('firePollsApp.services', ['firebase', 'angularfire.firebase']);
angular.module('firePollsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularfire.login',
    'simpleLoginTools',
    'firePollsApp.controllers',
    'firePollsApp.services'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
//                authRequired: true,
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                authRequired: false, // if true, must log in before viewing this page
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
