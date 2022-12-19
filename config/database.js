
// const mongoose =require('mongoose')
// require('dotenv').config()
// module.exports = function(){
//     mongoose.connect(process.env.DB_URL,{
//         useNewUrlParser:true,
//         useUnifiedTopology: true,
//         auth: {
//             "user":"nutraZicadmin",
//             "password":"T3st$3m0123",  
//           },
//     })
//     mongoose.connection.on('connected',()=>{
//         console.log("Database is connected ")
//     })
// }


const mongoose =require('mongoose')
require('dotenv').config()
module.exports = function(){
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,})
    mongoose.connection.on('connected',()=>{
        console.log("Database is connected ")
    })
}
