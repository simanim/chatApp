chatApp.controller('signupController', function($scope, $http){
    $scope.user={
        'firstname' : '',
        'lastname' : '',
        'email': '',
        'password': '',
        'confPassword': ''
    }
    $scope.register = function(){
        console.log("register credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/register',
            data: $scope.user
        })
        .then(function(response){
            if(response.data.error==false){
                 console.log("successfull");
                 $scope.message="regn Successful";
             } 
        },function(err){
            
            console.log(err);
            $scope.message="regn Unsuccessful";
        })
    }
}); 