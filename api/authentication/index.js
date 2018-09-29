var jwt = require('jsonwebtoken');
var secret="qwerty123456!@#$%^"; 

var auth = function(req, res, next){
      var token=req.headers["token"];
      var response = {
            'message': "Unauthorised Entry "
      };//console.log(req.headers);
      console.log("in auth ", token);
      
      jwt.verify(token, secret, function(err, decoded) {
            if(err){
                  console.log(err);
                  return res.status(401).send(response);
            }
            else{
                  //console.log("in");
                  console.log(decoded);
                  next();
            }
      });    
}
module.exports = auth;