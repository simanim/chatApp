chatApp.controller('forgotPassController', function($scope, $http){
    console.log("in");
    $scope.user={
        'email': ''
    }
    $scope.forgotPass = function(){
        console.log("forgotPass credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/forgotPass',
            data: $scope.user
        })
        .then(function(response){
            if(response.data.error==false){
                $scope.message="success";
            }
        },function(err){
        
            console.log(err);
            $scope.message="Unsuccessful! check your details";
        })
    }
});