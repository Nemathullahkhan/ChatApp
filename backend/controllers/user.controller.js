import User from "../models/user.model.js";

export const getUsersForSidebar =async(req,res)=>{
    try{
        const loggedInUserID = req.user._id;

        const filteredUsers = await User.find({_id:{$ne:loggedInUserID}}).select("-password");

        res.status(200).json(filteredUsers);

    }catch(error){
        console.error("Error in getUsersForSidebar",error.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}