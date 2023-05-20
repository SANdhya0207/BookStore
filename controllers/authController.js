const userModel = require("../model/userModel");

exports.registerController = async(req,res) =>{
      try {
          const {name,email,password,phone} = req.body;
          if(!name || !email ||!password || !phone)
          {
              return res.status(400).send({
                  success:false,
                  message:"Please enter all the fileds!!"
              })
          }
          // existing user
          const existingUser = await userModel.findOne({email});
          if(existingUser)
          {
              return res.status(200).send({
                  success:false,
                  message:"User is Existing Already!! Please Login"
              })
          }
  
            // save new user
          const user = new userModel({name,phone,email,password})
          await user.save();
          return res.status(201).send({
              success:true,
              message:" User Created",
              user
          })
          
      } catch (error) {
          console.log(error);
          return res.status(500).send({
              success:false,
              message:'Error in register callstack',
              error
          })
      }
  
  }

  exports.loginController=async(req,res)=>{
    try {
        const {name} = req.body;
    const {email}=req.body;
    const{password}=req.body;
    if(!name || !email||!password)
    {
        return  res.status(501).send(
              {
                 success:false,
                 message:'Please Enter Name, Email or Password',
              })
      }
    const user=await userModel.findOne({email});
    if(!user)
    {
        return res.status(400).send({
            success:false,
            message:"User not registered",
        })
    }
    if(name != user.name){
        return res.status(200).send(
            {
               success:false,
               message:'Invalid Name',
            })
    }
    if(password!=user.password)
    {
        return res.status(200).send(
            {
               success:false,
               message:'Invalid Password',
            })
    }

    res.status(200).send(
        {
           success:true,
           message:'Log In Successfully',
           user,
        })

        
    } catch (error) {
        console.log(error);
          return res.status(500).send({
              success:false,
              message:'Error in Login',
              error
    })
    
  }
}