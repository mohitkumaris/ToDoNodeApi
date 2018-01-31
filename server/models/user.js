const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
/*
 It's automatically called when we respond to
 the express request with res.send.
 That converts our object to a string by calling JSON.stringify.
 JSON.stringify is what calls toJSON. Here's an isolated example:
 It Overrides built in toJSON.
 */

/*
methods convert methods into model methods
 */
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};


/*
statics convert method into instance method

 "Static methods are meant to be relevant to all the instances of a class rather than
 to any specific instance." You use them pretty often,
 for example Date.now()  gives you the date without creating
 an instance of Date  like const date = new Date() .

So with this knowledge, we can conclude that "methods" are working
on the instance of a model. Example: generateAuthToken ;
 you want to generate the token for this specific user.
  Hence, user  is an instance of your model.
  But findByToken  cannot run on a specific user
  (because you only have one instance of user available
  and you cannot find another by token from there).
  You need to query for all Users , meaning you need
  to query all entries in your model,
not just a specific instance. Therefore, it is a static method.
 */

UserSchema.statics.findByToken=function (token) {
// ooz query is going to run over whole object
    //instead of instance
    var User=this;
    var decoded;
    try{
        decoded=jwt.verify(token,'abc123');
    }
    catch(e){

        return Promise.reject('Invalid Token');
    }

   return User.findOne({
        '_id':decoded._id,
        'tokens.access':'auth',
        'tokens.token':token
    });


}

var User = mongoose.model('User', UserSchema);

module.exports = {User}
