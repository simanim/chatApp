var chatApp = angular.module('chatApp', ['ngRoute' ,'btford.socket-io']);
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
            templateUrl : './temp/forgotPass.html',
            controller  : 'forgotPassController'
        })

       /**
        *@description route for the dashboard page
        */
        .when('/dashBoard', {
            templateUrl : './temp/dashBoard.html',
            controller  : 'homeController'
        })
       /**
        *@description route for the peer to peer dashboard page
        */
        .when('/peerDashBoard', {
            templateUrl : './temp/peerDashBoard.html',
            controller  : 'peerController'
        })

       /**
        *@description route for the change password page
        */
        .when('/changePass', {
            templateUrl : './temp/changePass.html',
            controller  : 'changepassController'
        })
        
        /**
        *@description route for the default page
        */
        .otherwise({redirectTo:'/'});
}); 

chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory){
    return socketFactory({
        ioSocket : io.connect('http://localhost:4200')
    });
}]);