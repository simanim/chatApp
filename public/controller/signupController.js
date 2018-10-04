chatApp.controller('signupController', function($scope, $http, $location){
    console.log('register')
    $scope.user={
        'firstname' : '',
        'lastname' : '',
        'email': '',
        'password': '',
        'confPassword': ''
    }
    console.log($scope.user)
    $scope.register = function(){
        if($scope.user.firstname=="" || $scope.user.lastname=="" || $scope.user.email=="" || $scope.user.password=="" || $scope.user.confPassword==""){  
            return;
            }
        console.log("register credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/register',
            data: $scope.user
        })
        .then(function(response){
            console.log(response.data)

            if(response.data.error==false){
                console.log("successfull");
                $scope.message="regn Successful";
                $location.path("/login");
               /**
                *@description if the user resistration is success, it will take to login page
                */
             } 
             else if(response.status==400)
             $scope.message="unsuccessful"
        },function(err){
            
            console.log(err);
            $scope.message="unsuccessful";
        })
    }
    $scope.check = function () {
        if ($scope.user.password != undefined && $scope.confPassword != undefined) {
            if ($scope.user.password != $scope.confPassword) {
                /**
                *@description checking the password and confirm password is matching or not
                */
                return true;
            }
            else {
                return false;
            }
        }
    }
});   