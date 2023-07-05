const express=require("express");
const { db } = require("./user.model");
const User=require("./user.model");

const app=express.Router()


app.use(express.urlencoded({extended:true}))


const jwt=require("jsonwebtoken")
const blacklist=[]


app.post("/details",async(req,res)=>{
    const {EmpID,name,DOB,DOJ,official_email,personal_email,address,contact,position,salary}=req.body
// const token=req.headers["token"]
//     try{
//         if(token){
//         const decoded=jwt.decode(token)
//         if(decoded){
//             if(decoded.role=="admin"){
//                 let user=new User({name,email,password,age,role:"writer"})
//                 console.log('user1',user)
//                 await user.save()
//               return  res.send('writer created sucessfully')

//             }else{
//                 res.status(403).send("you are not allowed to create writer")
//             }
//         }

//     }

//     }catch(e){
//         res.send("Non admin side is try to create writer")
//     }
    
   // let user=new User({name,email,password,age})
   // console.log('user2',user)
   // await user.save()
   try {
    let user=await User.create({EmpID,name,DOB,DOJ,official_email,personal_email,address,contact,position,salary})
    console.log("user",user)
      return  res.status(201).send(user)
   } catch (error) {
    return res.send(error.message)
   }
   
})


app.get("/getall",async(req,res)=>{
    //console.log("token",token)
    //const id=req.headers.id
    //console.log(id);
  
    const {limit=10,page=1,category, q}=req.query
    
   
      try{
          let user=await User.find()
  console.log(user);
          if(user){
      //let blogs=await Blog.find(query).limit(limit).skip((page-1)*limit)

  res.send(user)
          }
          else{
              res.send("please signup")
          }
      
  }catch(e){
      res.send(e.message)
  }
  })


























// app.use((req,res,next)=>{
//     const token=req.headers.token
//     //const{email,password}=req.body
//       ///console.log("email",email,password)
//       if(!token){
//         res.send("missung token")
//       }
//       //const verification=jwt.verify(token,"Secreate123")

//       try{
//         const verification=jwt.verify(token,"Secreate123")
// console.log(verification);
//         if(verification.exp>new Date().getTime()){
//            // let user=await User.findById({"_id":id})

//             res.send('token is expired')

//         }
//         if(blacklist.includes(token)){
//             return res.send('token already used')
//                }
//                next()

//   }catch(e){
//       res.send(e.message)
//   }
  
//   })
  //app.use(authMiddleware)





  













    app.patch("/:id", async(req,res)=>{
        let id=req.params.id
        //const id=req.headers.id

  
  
        try{
            let user=await User.findOne({"EmpID":id})


            //let user=await User.updateOne({"EmpID":id},{...req.body},{new:true})

            if(user){
                try {
                let employee=await User.updateOne({"EmpID":id},{...req.body},{new:true})
                if (employee) {
                    res.send('employee updated')
                } else {
                    res.send('employee is not updated')

                }

                } catch (error) {
                    res.send(error.message)

                }
        }else{
            res.send("employee is not found to update")
        }  

 }catch(e){
            res.send(e.message)
        }
  
      })


      app.delete("/:id", async(req,res)=>{
        let id=req.params.id
       console.log("id",id);
  
       // const token=req.headers["token"]
  
        try{
            

    
            // if(decoded.role ==="user" || decoded.role==="admin" ){
                let user=await User.findOne({"EmpID":id})
                //console.log("blog",blog1)
                if(user){
                  let emplyoee=await User.deleteOne({"EmpID":id});
  
                    if(emplyoee){
                    res.send('employee deleted sucessfully')
                }else{
                    res.send("employee is not found to delete")
                }  
              }else{
                  res.send('employee is not found ')
              }
    
            // }
    // else{
    //   return  res.status(403).send('not allowed to delete blog')
           
    //   //res.send(blog)
    
    // }        
    
        }catch(e){
            res.send('can not find blog by this id ')
        }
  
      })




app.get("/user/:id", async(req,res)=>{
    let {id}=req.params
   const token=req.headers['token']
   if(!token){
    console.log('hiiii')
    return res.send('Unauthrized')
   }
//    if(blacklist.includes(token)){
// return res.send('token already expired')
//    }
    //console.log(req.method,req.url)
    //let product=db.products.find((products)=> products.id===num)
// if(verification){
//     return res.send("verify")
// }
    try{
        const verification=jwt.verify(token,"Secreate123")

        if(verification){
            let user=await User.findOne({_id:id})

            res.send({user})
        }else{
            res.send("user not found")
        }
    }catch(e){
        console.log(e.message);

        if(e.message=="jwt expired"){
            console.log('jklhguiop');

blacklist.push(token)
        }
       return res.send(blacklist)

    }
  
    })





    module.exports=app


    
      //app.use(authMiddleware)












