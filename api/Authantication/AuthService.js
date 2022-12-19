const AuthModal =require('./AuthModal');
module.exports={
create:(data)=>{
    return AuthModal.create(data)
},
isuser:(data)=>{
    return AuthModal.find(data)
},
find_all:(data)=>{
    return AuthModal.find(data)
}
}