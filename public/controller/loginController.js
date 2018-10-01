chatApp.controller('loginController', function($scope, $http, $location){

    var id=localStorage.getItem("userid");
    if(id!=null){
        $location.path("/dashBoard"); 
    }
   /**
    * 
    *@description it checks whether the local storage has already id value or not.
    *             if it has id value previously then it will directly take to dashboard 
    *             otherwise it takes to login page
    */
    else{
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
                    $scope.message="login Successful";
                    var token=response.data.token;
                    var userid=response.data.userid;
                   
                    console.log("login")
                   /**
                    *@description if the user email and password is correct, it will take to dashboard
                    *             and store the token and userid to local storage
                    */
                    localStorage.setItem("token",token);
                    localStorage.setItem("userid",userid);
                    localStorage.setItem("email",$scope.user.email);
                    
                    $location.path("/dashBoard"); 
                }
            },function(err){
            
                console.log(err);
                $scope.message="login Unsuccessful! check your details";
            })
        }
    }
});

