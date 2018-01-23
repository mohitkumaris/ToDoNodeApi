var express=require('express');
var bodyParser=require('body-parser')

var mongoose=require('./db/mongoose');
var {User}=require('./models/user');
var {ToDo}=require('./models/todo');

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const port=process.env.port || 8989;

app.listen(port,()=>{
    console.log('Server is connected');
});

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


module.exports={
    app
}

