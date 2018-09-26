var chatApp = angular.module('chatApp', ['ngRoute']);
chatApp.config(function($routeProvider) {
    $routeProvider

        //route for the login page
        .when('/', {
            templateUrl : './temp/loginPage.html',
            controller  : 'loginController'
        })

        // route for the signup page
        .when('/signupPage', {
            templateUrl : './temp/signupPage.html',
            controller  : 'signupController'
        })
        
        .when('/forgotPass', {
                templateUrl : './temp/forgotPass.html'
            });

});