const mongoose=require("mongoose")

const main=async()=>{
    try {
        return mongoose.connect("mongodb+srv://adminEdverse:adminEdverse@cluster0.dhuqdjt.mongodb.net/?retryWrites=true&w=majority")
        
    .then(()=>console.log('connected to database'))
    .catch((e)=>console.log(e))
    ///conn.disconnect()

    } catch (error) {
        console.log(error);
    }
    
   // console.log("conneted")
   // conn.disconnect()
}

module.exports=main