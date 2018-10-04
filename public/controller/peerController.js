chatApp.controller('peerController', function($scope, $http, $location, SocketService){
    console.log("enter to peer controller");
    var userstoken=localStorage.getItem("token");
    var userid=localStorage.getItem("userid");
    var email=localStorage.getItem("email");
    var recId = localStorage.getItem("recId");
    var recEmail = localStorage.getItem("recEmail");
    $scope.loginuser=email;
    $scope.receiver=recEmail;

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
        localStorage.removeItem("recId");
        localStorage.removeItem("recEmail");
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
    *@description back to group chat from peer to peer chat
    */
    $scope.back=function(){
        $location.path("/dashBoard"); 

    }

   /**
    *@description getting the chathistory from db
    */
    $scope.peersend = function () {
        if($scope.peermessage==undefined){  
            return;
        }
        var senId=userid;
        var senEmail=email;
        SocketService.emit('peertobackend', { 
            "senId": senId, "recId": recId,"senEmail": senEmail, "recEmail": recEmail, "message": $scope.peermessage, "date": new Date() 
        });
        $scope.peerchatList.push({"senId": senId, "recId": recId,"senEmail": senEmail, "recEmail": recEmail, "message": $scope.peermessage, "date": new Date()})
        $scope.peermessage=null;
    }
    $http({
        method: 'GET',
        url: 'auth/users/'+userid+'/peergetChat/'+recId,
        headers:{
            'token': userstoken
        }
    }).then(function(response){
        $scope.peerchatList=response.data.message;
    })
    SocketService.on("peertofrontend", function(data){
        $scope.peerchatList.push(data);
    }) 

    /**
    *@description jumping from one receiver to another in peer to peer chatting
    */
    $scope.peerreceiver = function(recId,recEmail){
        $scope.receiver=recEmail;
        localStorage.setItem("recId",recId);
        localStorage.setItem("recEmail",recEmail);

        $scope.peersend = function () {
            if($scope.peermessage==undefined){  
                return;
            }
            var senId=userid;
            var senEmail=email;
            SocketService.emit('peertobackend', { 
                "senId": senId, "recId": recId,"senEmail": senEmail, "recEmail": recEmail, "message": $scope.peermessage, "date": new Date() 
            });
            $scope.peerchatList.push({"senId": senId, "recId": recId,"senEmail": senEmail, "recEmail": recEmail, "message": $scope.peermessage, "date": new Date()})
            $scope.peermessage=null;
        }
        $http({
            method: 'GET',
            url: 'auth/users/'+userid+'/peergetChat/'+recId,
            headers:{
                'token': userstoken
            }
        }).then(function(response){
            $scope.peerchatList=response.data.message;
        })
        SocketService.on("peertofrontend", function(data){
            $scope.peerchatList.push(data);
        }) 
    }

});