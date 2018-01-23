
const MongoClient=require('mongodb').MongoClient;


var user={name:'mohit',age:33}
var {name}=user;
console.log(name);


MongoClient.connect('mongodb://192.168.108.181:27017/ToDoApp',(err,db)=>{

    if(err){

        return console.log(err);
    }

    console.log('Connected to MongoDb Server');

   /* db.collection('Todos').insertOne({

        text:'Something to do',
        completed:false
    },(err,results)=>{
       if(err){
           return console.log('Some error during insert',err)
       }

       console.log(JSON.stringify(results.ops,undefined,2));

    });*/

    db.collection('Users').insertOne({

        name:'mohit',
        age:33
    },(err,results)=>{
        if(err){
            return console.log('Some error during insert',err)
        }

        console.log(JSON.stringify(results.ops[0]._id.getTimestamp(),undefined,2));

    });

    db.close();

});