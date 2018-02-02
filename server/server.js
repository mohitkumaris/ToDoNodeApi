const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
const {_}=require('lodash');


const mongoose=require('./db/mongoose');
const {User}=require('./models/user');
const {ToDo}=require('./models/todo');
const {authenticate}=require('./middleware/authenticate');



var app=express();

app.use((req,res,next)=>{
    next();
});

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const port=process.env.PORT || 8989;



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

/*
User routes
 */


app.post('/users',(req,res)=>{

    var body=_.pick(req.body,['email','password']);

    var user= new User(body);
    user.generateAuthToken()
             .then((token)=>{
        res.header('x-auth',token).send(user);

    }).catch((err)=>{
        res.status(400).send(res);
    });
});


/*
Private routes
 */
app.get('/users/me',authenticate,(req,res)=>{

       res.send(req.user);
});

app.listen(port,()=>{
    console.log(`Server is connected at ${port}`);
});

/*
Login route
 */

app.post('/users/login',(req,res)=>{

    var body=_.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{

        user.generateAuthToken()
            .then((token)=>{
                res.header('x-auth',token).send(user);

            });
    }).catch((e)=>{

        res.status(400).send();
    });



});

app.delete('/users/me/logout',authenticate,(req,res)=>{

    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch(()=>{
        res.status(400).send();
    });

});

module.exports={
    app
};

