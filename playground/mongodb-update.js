
const {MongoClient,ObjectID}=require('mongodb');

/* fetch properties using ES6  */
//var user={name:'mohit',age:33}
//var {name}=user;
//console.log(name);


MongoClient.connect('mongodb://192.168.108.181:27017/ToDoApp',(err,db)=>{

    if(err){

        return console.log(err);
    }

    console.log('Connected to MongoDb Server');

    db.collection('Todos').findOneAndUpdate(
        {_id:new ObjectID('5a66e6eca3bbd03b98d5fc6b')},
        {$set:{
            text:'walk the pet'
            }},
        {
            returnOriginal:false
        }
        ).then((doc)=>{

        console.log(doc)
    },(err)=>{

        console.log(err);
    });

    // db.close();

});