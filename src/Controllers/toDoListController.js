const e = require('cors');
const toDoListModel = require('../Models/toDoListModel');

exports.CreateToDo = (req,res)=>{
    let reqBody = req.body;
    let UserName = req.headers['UserName'];
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let TodoStatus = "New";
    let TodoCreateDate = Date.now();

    let postBody ={
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
    }

    toDoListModel.create(postBody, (err,data)=>{
        if(err){
            res.status(404).json({status:'Failed' , data: err});
        } else{
            res.status(201).json({status: 'Success', data: data});
        }
    });
};




exports.SelectToDo= (req,res)=>{
    let UserName = req.headers['UserName'];

    toDoListModel.find({UserName: UserName}, (err,data)=>{
        if(err){
            res.status(404).json({status: "failed", data:err})
        } else{
            res.status(201).json({status: "success", data: data})
        }
    })
}



exports.UpdateTodo = (req,res)=>{
    let TodoSubject = req.body["TodoSubject"] ;
    let TodoDescription =req.body[ "TodoDescription" ];
    let _id = req.body["_id"] ;

    let postBody = {
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription
    }

    toDoListModel.updateOne({_id:_id}, {$set:postBody} ,{upsert:true}, (err,data)=>{
        if(err){
            res.status(404).json({status: "failed", data:err})
        } else{
            res.status(201).json({status: "success", data: data})
        }
    })
};


exports.UpdateStatusTodo = (req,res)=>{
    let TodoStatus = req.body['TodoStatus'];
    let _id = req.body['_id'];
    let TodoUpdateDate = Date.now();

    let postBody= {
        TodoStatus : TodoStatus,
        TodoUpdateDate: TodoUpdateDate
    }

    toDoListModel.updateOne({_id: _id},{$set: postBody}, {upsert:true},(err,data)=>{
        if(err){
            res.status(404).json({status:"failed", data: err}) ;
        } else{
            res.status(201).json({status: "success", data: data}) ;
        }
    })
}

exports.RemoveTodo = (req,res)=>{
    let _id = req.body['_id'];

    toDoListModel.remove({_id: _id},(err,data)=>{
        if(err){
            res.status(404).json({status:"failed", data: err}) ;
        } else{
            res.status(201).json({status: "success", data: data}) ;
        }
    })
}

exports.SelectTodoByStatus=(req,res)=>{
    let UserName = req.headers['UserName'];
    let TodoStatus = req.body['TodoStatus'];

    toDoListModel.find({UserName: UserName, TodoStatus: TodoStatus},(err, data)=>{
        if (err){
            res.status(404).json({status: "Failed" , data: err})
        } else{
            res.status(201).json({status: "Success", data: data})
        }
    })
}

exports.SelectToDoByDate= (req,res)=>{
    let UserName = req.headers['UserName'];
    let fromDate = req.body['fromDate'];
    let toDate = req.body['toDate'];


    toDoListModel.find({UserName: UserName, TodoCreateDate:{$gte:new Date(fromDate), $lte:new Date(toDate)}},(err,data)=>{
        if(err){
            res.status(404).json({status: "failed", data: err})
        } else {
            res.status(201).json({status: "success", data : data})
        }
    })
}