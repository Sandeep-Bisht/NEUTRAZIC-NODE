
const mongoose =require('mongoose')
require('dotenv').config()
module.exports = function(){
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true,
         useFindAndModify: true,
        auth: {
            "user":"NeutrazicAdmin",
            "password":"SOSh3AWDPC4499GTbYhxY8",  
          },
    })
    mongoose.connection.on('connected',()=>{
        console.log("Database is connected ")
    })
}

// auth: {
//     "user":"NeutrazicAdmin",
//     "password":"SOSh3AWDPC4499GTbYhxY8",  
//   },


// const mongoose =require('mongoose')
// require('dotenv').config()
// module.exports = function(){
//     mongoose.connect(process.env.DB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: true,})
//     mongoose.connection.on('connected',()=>{
//         console.log("Database is connected ")
//     })
// } 
