chatApp.controller('homeController', function($scope, $http, $location, SocketService){
    var userstoken=localStorage.getItem("token");
    var userid=localStorage.getItem("userid");
    var email=localStorage.getItem("email");
    $scope.loginuser=email;

    /**
    *@description getting the list of users
    */
   var array=[];
    $http({
        method: 'GET',
        url: 'auth/users/'+userid+'/userlist',
        headers:{
            'token': userstoken
        }
    })
    .then(function(response){
        for(var i=0;i<(response.data.message).length;i++)       
        {
            array.push(response.data.message[i]);
           /**
            *@description pushing the user list to an array
            */
        }
    })
    $scope.array= array;

    /**
    *@description for logout from the account
    */
    $scope.logout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        localStorage.removeItem("email");
        /**
        *@description after logout, it remove the token and userid from local storage and takes to login page
        */
        $location.path("/login"); 
    }

    /**
    *@description for changing the password
    */
    $scope.changePass = function () {
        $location.path("/changePass"); 
    }

   /**
    *@description getting the chathistory from db
    */
    var chatList=[];
    $scope.send = function () {
        if($scope.message==undefined){  
            return;
        }
        SocketService.emit('tobackend', { 
            "userid": userid,"email": email, "message": $scope.message, "date": new Date() 
        });
        $scope.message=null;
    }
    $http({
        method: 'GET',
        url: '/auth/users/getChat',
        headers:{
            'token': userstoken
        }
    }).then(function(response){
        for(var i=0;i<response.data.message.length;i++){
        chatList.push(response.data.message[i]);
        }
        $scope.chatList=chatList;
        
    })
    SocketService.on("tofrontend", function(data){
        $scope.chatList.push(data);
    })

   /**
    *@description group chat to peer to peer chat
    */
    $scope.receiver=function(recId,recEmail)
    {
        localStorage.removeItem("recId");
        localStorage.removeItem("recEmail");
        localStorage.setItem("recId",recId);
        localStorage.setItem("recEmail",recEmail);
        $location.path("/peerDashBoard"); 
    }
});