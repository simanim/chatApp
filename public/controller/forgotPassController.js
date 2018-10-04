chatApp.controller('forgotPassController', function($scope, $http){
    $scope.user={
        'email': ''
    }
    $scope.forgotPass = function(){
        if($scope.user.email==""){  
            return;
        }
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
            /**
            *@description wrong details
            */
        })
    }
});