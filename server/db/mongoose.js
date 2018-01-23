const mongoose=require('mongoose');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.Promise=global.Promise;
//mongodb://192.168.108.181:27017/ToDoApp
mongoose.connect('mongodb://mohitkumaris:fun974dose366@ds111638.mlab.com:11638/todos',options);

module.exports={
    mongoose
}