var scotchApp = angular.module('scotchApp', ['ngRoute']);
scotchApp.config(function($routeProvider) {
    $routeProvider

        // route for the login page
        .when('/', {
            templateUrl : 'temp/loginPage.html'
        })

        // route for the signup page
        .when('/signupPage', {
            templateUrl : 'temp/signupPage.html'
        });
});