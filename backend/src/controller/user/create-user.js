import { userModel } from "../../models/user-schema.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
