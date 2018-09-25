/**
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
 *@param {*} name
 *@description checking the given name is valid or not.
 *             name contains only Alphabets and 3-20 characters.
 */
function validateName(name){
    var regex = /^[a-z]{3,20}$/;
    return regex.test(name);
}
/**
 *@param {*} email
 *@description checking the given email is valid or not
 */
function validateEmail(email) 
{
    //var regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var regex=/^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/;
    //var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}
/**
 *@param {*} password
 *@description checking the given password is valid or not
 *             password contains alphabets,numbers and special characters and 6-16 characters.
 */
function validatePassword(password) 
{
    var regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regex.test(password);
}
var usermod = require('../models/userSchema');
var jwt = require('jsonwebtoken');

/**
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
        db.confPassword = req.body.confPassword;
        
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
        if(db.password != db.confPassword){
            response = {"error" : true,"message" : "passwords are not matching"};
            return res.status(400).send(response);
        }
        db.password = encrypt(req.body.password);
        db.confPassword = encrypt(req.body.confPassword);
       /**
        *@description it encrypt the password
        */

        usermod.find({"email":email1},function(err,data){
            if(err){
                response = {"error" : true,"message" : "error", "err":err};
                return res.status(404).send(response);
            }
            else{
                if(data.length > 0){
                   /**
                    *@description it checks the given email is already registered or not
                    */
                    response = {"error" : true,"message" : "email id already exist", "err":err};
                    return res.status(404).send(response);
                }
                else{
                    db.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error adding data", "err":err};
                            return res.status(404).send(response);
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
           console.log(e);
            return res.json({
                "error":true,
                "message":"something bad happened"
            });
        }
        else{
            return res.json({
                "error":true,
                "message":e.message
            });
        }
    }
}

/**
 *@param {*} req
 *@param {*} res
 */
exports.login=function(req,res)
{
    try{
        var secret="qweasdzxc123";
        if(typeof req.body.email == "undefined"){
            throw new Error("email is Required");
        }
        if(typeof req.body.password == "undefined"){
            throw new Error("password is Required");
        }
        var email1=req.body.email;
        var password1=encrypt(req.body.password);
    
        if(validateEmail(email1) == false){
            response = {"error" : true,"message" : "invalid email id"};
            return res.status(400).send(response);
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
                response = {"error" : false,"token":token,"message" : "successfully loged in", "err":err};
                return res.status(202).send(response);
                /**
                *@description logged in
                */
            }
            else{
                response = {"error" : true,"message" : "email id does not exist.you can create a new account", "err":err};
                return res.status(400).send(response);
                /**
                *@description email id is not stored in the data base
                */
            }
        })
    }
    catch(e){
        if(e instanceof ReferenceError || e instanceof TypeError || e instanceof SyntaxError || e instanceof RangeError){
            response = {"error" : true,"message" : "something bad happened", "err":err};
            return res.status(400).send(response);
        }
        else{
            return res.json({
                "error":true,
                "message":e.message
            });
        }
    }
}