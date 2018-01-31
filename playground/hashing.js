const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password="abc123";

bcrypt.genSalt(10,(err,salt)=>{

    bcrypt.hash(password,salt,(err,hash)=>{

        console.log(hash);
    });


});
/*
bcrypt.genSalt(10,(err,salt)=>{

    if(err){

        return res.status(500).send(err);
    }
    bcrypt.hash(body.password,salt,(err,hash)=>{

        body.password=hash;
    });

});

var data={
    id:10
}

var token=jwt.sign(data,'abc123');
console.log(token);

var decoded=jwt.verify(token,'abc123');
console.log('Decoded', decoded);



var message='this is simple message';
var hash=SHA256(message).toString();;

console.log(message);
console.log(hash);

var data={
    id:4
};

var token={
    data,
    hash:SHA256(JSON.stringify(data)+'somesecret').toString()
};

data.id=5;

var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString();




if(resultHash === token.hash){
    console.log('Token is same')
}
else{
    console.log('Token is manipulated');
}
*/