/**
 * 
 *@param {*} password
 *@description encrypting the given password
 */
function encrypt(password){
    var password_1 =  require('crypto')
    .createHash('sha1')
    .update(password)
    .digest('base64');
    return password_1;
}
/**
 * 
 *@param {*} name
 *@description checking the given name is valid or not.
 *             name contains only Alphabets and 3-20 characters.
 */
function validateName(name){
    var regex = /^[a-z ]{3,40}$/;
    return regex.test(name);
}
/**
 * 
 *@param {*} email
 *@description checking the given email is valid or not
 */
function validateEmail(email) {
    var regex=/^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/;
    return regex.test(email);
}
/**
 * 
 *@param {*} password
 *@description checking the given password is valid or not
 *             password contains alphabets,numbers and special characters and 6-16 characters.
 */
function validatePassword(password) {
    var regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regex.test(password);
}
var usermod = require('../models/userSchema');
var chatmod = require('../models/chatSchema');
var jwt = require('jsonwebtoken');

/**
 * 
 *@param {*} req
 *@param {*} res
 */
exports.registration = function(req,res)
{ 
    try{
        
        if(typeof req.body.firstname == "undefined" || typeof req.body.lastname == "undefined"){
            throw new Error("Name is Required");
        }
        if(typeof req.body.email == "undefined"){
            throw new Error("email is Required");
        }
        if(typeof req.body.password == "undefined"){
            throw new Error("password is Required");
        }
        if(typeof req.body.confPassword == "undefined"){
            throw new Error("confPassword is Required");
        }
        
        var db = new usermod();
        var response = {}; 
        var email1 = req.body.email;

        db.firstname = req.body.firstname;
        db.lastname = req.body.lastname;
        db.email = req.body.email; 
        db.password = req.body.password;
        
        if(validateEmail(email1) == false){
            response = {"error" : true,"message" : "invalid email"};
            return res.status(400).send(response);
        }
        if(validateName(db.firstname) == false || validateName(db.lastname) == false){
            response = {"error" : true,"message" : "invalid name"};
            return res.status(400).send(response);
        }
        if(validatePassword(db.password) == false){
            response = {"error" : true,"message" : "invalid password"};
            return res.status(400).send(response);
        }
        if(db.password != req.body.confPassword){
            response = {"error" : true,"message" : "passwords are not matching"};
            return res.status(400).send(response);
        }
        db.password = encrypt(req.body.password);
       /**
        *@description it encrypt the password
        */

        usermod.find({"email":email1},function(err,data){
            if(err){
                response = {"error" : true,"message" : "error", "err":err};
                return res.status(400).send(response);
            }
            else{
                if(data.length > 0){ 
                   /**
                    *@description it checks the given email is already registered or not
                    */
                    response = {"error" : true,"message" : "email id already exist", "err":err};
                    return res.status(400).send(response);
                }
                else{
                    db.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error adding data", "err":err};
                            return res.status(400).send(response);
                        } 
                        else {
                            response = {"error" : false,"message" : "Data added"};
                            return res.status(201).send(response);
                            /**
                            *@description it saves the data to the database
                            */
                        }
                    });
                }
            }
        })
    }
    catch(e){
        if(e instanceof ReferenceError || e instanceof TypeError || e instanceof SyntaxError || e instanceof RangeError){
            response={"error":true,"message":"something bad happened"}
            res.status(400).send(response);
        }
        else{
            response={"error":true,"message":e.message}
            return res.status(400).send(response);
        }
    }
}

/**
 * 
 *@param {*} req
 *@param {*} res
 */
exports.login=function(req,res)
{ 
    try{

        var secret="qwerty123456!@#$%^"; 
        if(typeof req.body.email == ""){
            throw new Error("email is Required");
        }
        if(typeof req.body.password == ""){
            throw new Error("password is Required");
        }

        var email1=req.body.email;       
        var password1=encrypt(req.body.password);
       
        if(validateEmail(email1) == false){
            response = {"error" : true,"message" : "invalid email id"};
            return res.status(404).send(response);
            /**
            *@description it checks the given email is valid or not
            */
        }

        usermod.find({"email":email1,"password":password1},function(err,data){
            if(err){
                response = {"error" : true,"message" : "error", "err":err};
                return res.status(400).send(response);
            }
            else if(data.length > 0){
                var token=jwt.sign({email:req.body.email,password:req.body.password},secret,{expiresIn:86400});
                response = {"error" : false,"token":token,"message" : "successfully loged in", "userid" : data[0].id, "err":err};
                return res.status(202).send(response);
                /**
                *@description logged in
                */
            }
            else{
                response = {"error" : true,"message" : "incorrect email or password", "err":err}; 
                return res.status(404).send(response);
                /**
                *@description email id is not stored in the data base
                */
            }
        })
    }
    catch(e){
        if(e instanceof ReferenceError || e instanceof TypeError || e instanceof SyntaxError || e instanceof RangeError){
            response = {"error" : true,"message" : "something bad happened", "err":e.message};
            return res.status(400).send(response);
        }
        else{
            response={"error":true,"message":e.message}
            return res.status(400).send(response);
        }
    }
}
/**
 * 
 *@param {*} req
 *@param {*} res
 */
exports.listOfUsers = function(req,res)
{
    try{
        var response={};
        var dataArray=[];
        var userid=req.params.id;
       /**
        *@description extracting the user id of the user who has logged in
        */
        usermod.find({"_id":{$ne:userid}},function(err,data){
           /**
            *@description finding all the users except the user who is logged in using $ne 
            */
            for(key in data){
                dataArray.push(response={useremail:data[key].email,userid:data[key]._id});
               /**
                *@description pushing all the user email and id to an array except the loggedin user
                */
            }
            if(err){
                response={"error":true,"message":"error retrieving data"}
            }
            else{
                response={"error":false,"message":dataArray}
            }
            return res.status(200).send(response);
        }) 
    }
    catch(e){
        if(e instanceof ReferenceError || e instanceof TypeError || e instanceof SyntaxError || e instanceof RangeError){
            response = {"error" : true,"message" : "something bad happened", "err":err};
            return res.status(400).send(response);
        }
        else{
            response={"error":true,"message":e.message}
            return res.status(401).send(response);
        }
    }
}

exports.forgotPass = function(req,res)
{
    var response={};
    var email1=req.body.email;
    if(validateEmail(email1) == false){
        response = {"error" : true,"message" : "invalid email"};
        return res.status(400).send(response);
    }   
    usermod.find({"email":email1},function(err,data){
        if(err){
            response = {"error" : true,"message" : "error", "err":err};
            return res.status(400).send(response);
        }
        else if(data.length > 0){
            response = {"error" : false,"message" : "successful", "userid" : data[0].id, "err":err};
            return res.status(202).send(response);
        }
        else{
            response = {"error" : true,"message" : "incorrect email or password", "err":err}; 
            return res.status(404).send(response);
            /**
            *@description email id is not stored in the data base
            */
        }
    });
}

exports.changePass = function(req,res)
{
    var db = new usermod();
    var response={};
    var email1=req.body.email;
    db.password = req.body.password;
    db.confPassword = req.body.confPassword;
    if(validateEmail(email1) == false){
        response = {"error" : true,"message" : "invalid email"};
        return res.status(400).send(response);
    }
    if(validatePassword(db.password) == false){
        response = {"error" : true,"message" : "invalid password"};
        return res.status(400).send(response);
    }
    if(db.password != db.confPassword){
        response = {"error" : true,"message" : "passwords are not matching"};
        return res.status(400).send(response);
    }
    db.password = encrypt(req.body.password);
    db.confPassword = encrypt(req.body.confPassword);
    
    usermod.find({"email":email1},function(err,data){
        if(err){
            response = {"error" : true,"message" : "error", "err":err};
            return res.status(400).send(response);
        }
        else if(data.length > 0){
            data[0].password=db.password;
            data[0].confPassword=db.confPassword;
            data[0].save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error adding data", "err":err};
                    return res.status(400).send(response);
                } 
                else {
                    response = {"error" : false,"message" : "password changed"};
                    return res.status(201).send(response);
                    /**
                    *@description it saves the data to the database
                    */
                }
            });
        }
        else{
            response = {"error" : true,"message" : "incorrect email or password", "err":err}; 
            return res.status(404).send(response);
            /**
            *@description email id is not stored in the data base
            */
        }
    });
}

exports.chatList = function(userid,message,date)
{
    var db = new chatmod();
    var response={};
    db.message = message;
    db.userid = userid;
    db.date = date;
    db.save(function(err){
        if(err) {
            response = {"error" : true,"message" : "unsuccess", "err":err};
        } 
        else{
            response = {"error" : false,"message" : "success"};
        }
        console.log(response)
    });
}

exports.getChat = function(req,res)
{
    var response={};

    chatmod.find({},function(err,data){
        if(err) {
            response = {"error" : true,"message" : "unsuccess", "err":err};
            return res.status(200).send(response);
        } 
        else{
            console.log(data);
            response = {"error" : false,"message" : data};
            return res.status(401).send(response);
        }
    });
}
