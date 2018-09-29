chatApp.controller('changepassController', function($scope, $http, $location){
    console.log("in")
    $scope.user={
        'email': '',
        'password' : '',
        'confPassword' : ''
    }
    
    $scope.changePass = function(){
        console.log("in")
        console.log("changePass credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/changePass',
            data: $scope.user
        })
        .then(function(response){
            if(response.data.error==false){
                $scope.message="successful";
                //$location.path("/dashBoard"); 
            }
        },function(err){
        
            console.log(err);
            console.log($scope.user);
            $scope.message="Unsuccessful! check your details";
        })
    }
});