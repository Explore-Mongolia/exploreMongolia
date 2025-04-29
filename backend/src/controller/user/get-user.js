import { userModel } from "../../models/user-schema.js"

export const getUser = async (req , res) => {
    const {id} = req.params;
    try{
     const users = await userModel.findById(id);
     if(!users){
        return res.status(404).json({ message : "user not found" })
     }
     res.json({ message : "got user succesfully", users ,});
    }
     catch (err){
    console.log(err);
    return res.status(404).json({ message : "an error occured while getting user" })
    
    }
}
