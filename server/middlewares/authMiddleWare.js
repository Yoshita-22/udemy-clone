import { clerkClient } from "@clerk/express";

//Middleware protect educator route

const protectEducator = async(req,res,next)=>{
   try{
    const userId = req.auth.userId;
    console.log(userId);
    const user  = await clerkClient.users.getUser(userId)
    if(user.publicMetadata.role!=='educator'){
        res.send({success:false,message:"Unauthorised"});
    }
    next()
   }catch(error){
    res.send({success:false,message:error.message});
   }
}

export default protectEducator;
