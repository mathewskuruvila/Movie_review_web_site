const mongoose = require("mongoose");
module.exports = {
 database : (req,res)=>{
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }  
    try{
        mongoose.connect("mongodb://localhost:27017/mymoveiapp").then((data)=>{
            connectionParams,
            console.log("Database connected");
        }).catch((error)=>{
            console.log("Database Failed");
        })
        
    }catch(err){
        console.log("Database Failed");
    }
}
}