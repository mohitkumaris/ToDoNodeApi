const mongoose=require('mongoose')

var Schema=mongoose.Schema;

var ToDoSchema= new Schema({
    text:{

        type:String,
        required:true
    }

});

var ToDo=mongoose.model('ToDo',ToDoSchema);

module.exports={
    ToDo
};

