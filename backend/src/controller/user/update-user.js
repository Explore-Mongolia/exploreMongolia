import { userModel } from "../../models/user-schema.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updateUser = await userModel.findByIdAndUpdate(id, {
      name,
      email,
    });
    res.json({message : "user updated succesfully",user: updateUser })
  } catch(err) {
    console.log(err);
    
    res.json({message : "error occured while updating user"})
    
  }
};
