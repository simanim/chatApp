var chatApp = angular.module('chatApp', ['ngRoute']);
chatApp.config(function($routeProvider) {
    $routeProvider

       /**
        *@description route for the login page
        */
        .when('/', {
            templateUrl : './temp/loginPage.html',
            controller  : 'loginController'
        })

       /**
        *@description route for the signup page
        */
        .when('/signupPage', {
            templateUrl : './temp/signupPage.html',
            controller  : 'signupController'
        })
        
       /**
        *@description route for the forgot password page
        */
        .when('/forgotPass', {
            templateUrl : './temp/forgotPass.html'
        })

       /**
        *@description route for the dashboard page
        */
        .when('/dashBoard', {
            templateUrl : './temp/dashBoard.html',
            controller  : 'homeController'
        })
        
        /**
        *@description route for the default page
        */
        .otherwise({redirectTo:'/'});
}); 