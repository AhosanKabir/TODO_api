const mongoose = require('mongoose');

const dataScema = mongoose.Schema({
        UserName: {type:String},
        TodoSubject:{type:String},
        TodoDescription:{type:String},
        TodoStatus:{type:String},
        TodoCreateDate: {type:Date}
    },
    {versionKey:false}
);

let toDoListModel = mongoose.model( 'ToDolists',dataScema);

module.exports = toDoListModel;