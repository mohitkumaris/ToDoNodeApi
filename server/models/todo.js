const mongoose=require('mongoose')

var Schema=mongoose.Schema;

var ToDoSchema= new Schema({
    text:{

        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:1234
    }

});

var ToDo=mongoose.model('ToDo',ToDoSchema);

module.exports={
    ToDo
};

