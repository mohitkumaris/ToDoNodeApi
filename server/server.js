const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var mongoose=require('./db/mongoose');
var {User}=require('./models/user');
var {ToDo}=require('./models/todo');

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const port=process.env.port || 8989;



app.post('/todos',(req,res)=>{

    var todo= new ToDo({

       text:req.body.text
    });

    todo.save().then((doc)=>{

        res.send(doc);

    },(err)=>{

        res.status(400).send(err);
    });
});


app.get('/todos',(req,res)=>{

    ToDo.find().then((todos)=>{

        res.send({todos});

    },(err)=>{

        res.status(400).send(err);
    });
});


app.get('/todos/:id',(req,res)=>{

    let id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400);
    }
    ToDo.findById(id).then((todos)=>{

        res.status(200).send({todos});

    },(err)=>{

        res.status(400).send(err);
    });
});

app.listen(port,()=>{
    console.log('Server is connected');
});

module.exports={
    app
}

