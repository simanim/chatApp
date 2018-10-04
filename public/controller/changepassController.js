chatApp.controller('changepassController', function($scope, $http){
    $scope.user={
        'password' : '',
        'confPassword' : ''
    }
    var username=localStorage.getItem("email");
    $scope.changePass = function(){
        if($scope.user.password=="" || $scope.user.confPassword==""){  
            return;
        }

        $scope.user.email=username;
        console.log("changePass credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/changePass',
            data: $scope.user
        })
        .then(function(response){
            if(response.data.error==false){
                $scope.message="successful";
            }
        },function(err){
            console.log(err);
            console.log($scope.user);
            $scope.message="Unsuccessful! check your details"; 
           /**
            *@description wrong details
            */
        })
    }
});