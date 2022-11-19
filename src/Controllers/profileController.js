const jwt = require('jsonwebtoken');
const ProfileModel = require('../Models/profileModel');

exports.CreateProfile = (req,res)=>{
    let reqBody = req.body;
    ProfileModel.create(reqBody, (err,data)=>{
        if(err){
            res.status(404).json({status:'Failed' , data: err});
        } else{
            res.status(201).json({status: 'Success', data: data});
        }
    });
};

exports.UserLogin = (req,res)=>{
    let UserName = req.body['UserName'];
    let password = req.body['password'];

    ProfileModel.find({UserName: UserName, password: password}, (err,data)=>{
        if(err){
            res.status(404).json({status: "Failed", data: err})
        } else{
            if(data.length > 0){
                //create auth token:

                let Payload={
                    exp: Math.floor(Date.now()/1000) + 24*60*60,
                    data: data[0]
                }

                let Token = jwt.sign(Payload,"SecretKey1234")

                res.status(200).json({status:"success" ,Token:Token, data: data[0]})
            }else{
                res.status(401).json({status: "Unauthorized"})
            }
        }
    })
}


exports.SelectProfile= (req,res)=>{
    let UserName = req.headers['UserName'];

    ProfileModel.find({UserName: UserName}, (err,data)=>{
        if(err){
            res.status(404).json({status: "failed", data:err})
        } else{
            res.status(201).json({status: "success", data: data})
        }
    })
}


exports.UpdateProfile=(req,res)=>{
    let UserName = req.headers['UserName'];
    let reqBody = req.body;

    ProfileModel.updateOne({UserName: UserName}, {$set: reqBody}, {upsert: true}, (err,data)=>{
        if(err){
            res.status(404).json({status: 'failed', data: err})
        } else{
            res.status(201).json({status: 'success', data: data})
        }
    })
}