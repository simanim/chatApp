chatApp.controller('loginController', function($scope, $http){

    $scope.user={
        'email': '',
        'password': ''
    }
    $scope.login = function(){
        console.log("login credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.user
        })
        .then(function(response){
            if(response.data.error==false){
                $scope.message="regn Successful";
            }
        },function(err){
            
            console.log(err);
            $scope.message="regn Unsuccessful";
        })
    }
});
