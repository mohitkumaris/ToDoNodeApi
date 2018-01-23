const mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://192.168.108.181:27017/ToDoApp');

module.exports={
    mongoose
}