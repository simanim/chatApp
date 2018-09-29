chatApp.controller('homeController', function($scope, $http, $location, SocketService){
    var userstoken=localStorage.getItem("token");
    var userid=localStorage.getItem("userid");
    var array=[];
    /**
    *@description taking token and userid from local storage
    */
    
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
    // $scope.chatArray=chatArray;
    $scope.logout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        /**
        *@description after logout, it remove the token and userid from local storage and takes to login page
        */
        $location.path("/login"); 
    }
    $scope.changePass = function () {
        $location.path("/changePass"); 
    }

   /**
    *@description getting the chat
    */
    $scope.chatList = [];
    
    $scope.send = function () {
       
            SocketService.emit('tobackend', { 
                "userid": userid, "message": $scope.data, "date": new Date() 
            });
        
    }
    $http({
        method: 'GET',
        url: 'auth/getChat',
        
    }).then(function(response){
        console.log(response.data.message);
        $scope.chatList = response.data.message;
    })
    SocketService.on('toclient', function(message){
        console.log(message);
        $scope.chatList.push(message);
        $scope.user={
            'message' : '',
            'email' : '',
            'date' : ''
        }
    });
    
});