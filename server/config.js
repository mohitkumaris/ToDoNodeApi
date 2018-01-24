var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 8989;
    process.env.MONGODB_URI = 'mongodb://mohitkumaris:fun974dose366@ds213118.mlab.com:13118/todoapplication';
} else if (env === 'test') {
    process.env.PORT = 8989;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
