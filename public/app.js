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
        
        // // route for the signup page
        // .when('/loginPage', {
        //     templateUrl : './temp/login.html',
        //     controller  :'loginController'
        // })

        .when('/forgotPass', {
                templateUrl : './temp/forgotPass.html'
            });

});