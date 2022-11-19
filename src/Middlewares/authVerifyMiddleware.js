var jwt = require('jsonwebtoken');

module.exports= (req,res,next)=>{
    let token = req.headers['token'];

    jwt.verify(token, "SecretKey1234", (err, decoded)=>{
        if(err){
            res.status(404).json({status: "Unauthorized Value"})
        } else{

            //get user from decoded token and add with Req header
            let UserName = decoded['data']['UserName'];
            req.headers.UserName = UserName;

            next();
        }
    })
}