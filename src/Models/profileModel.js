const mongoose = require('mongoose');

const dataScema = mongoose.Schema({
        FirstName:{type:String},
        LastName: {type: String},
        EmailAdress:{type: String},
        MobileNumber: {type: String, unique:true},
        city:{type:String},
        UserName:{type:String},
        password:{type: String}
    },
    {versionKey:false}
);

let ProfileModel = mongoose.model( 'profiles',dataScema);

module.exports = ProfileModel;