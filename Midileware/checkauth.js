const jwt = require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        const token=req.headers.authorization.split(" ")[1]
       var verify=  jwt.verify(token,'this is my medzone key')
       if(verify){
        next()   
       }else{
        res.status(401).json({
            msg:"invalid token"
            })          
       }
    }catch{
    res.status(401).json({
    msg:"invalid token"
    })
    }

}