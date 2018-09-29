chatApp.controller('homeController', function($scope, $http, $location){
    var userstoken=localStorage.getItem("token");
    var userid=localStorage.getItem("userid");
    /**
    *@description taking token and userid from local storage
    */
    //console.log("in");
    //console.log(userid);
    var array=[];
    $http({
        method: 'GET',
        url: 'auth/users/'+userid+'/userlist',
        headers:{
            'token': userstoken
        }
    })
    .then(function(response){
        console.log(response.data.message);
        for(var i=0;i<(response.data.message).length;i++)       
        {
            array.push(response.data.message[i].useremail);
           /**
            *@description pushing the user list to an array
            */
        }
    })
    
    $scope.array= array;
    // console.log("token  "+userstoken);
    $scope.logout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        /**
        *@description after logout, it remove the token and userid from local storage and takes to login page
        */
        $location.path("/login"); 
    }
    
});