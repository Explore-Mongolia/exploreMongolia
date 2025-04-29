import { DestinationModel } from "../../models/destination-schema.js";

export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDestination = await DestinationModel.findByIdAndDelete(id);
    res.json({ message : "destination deleted succesfully" , destination : deleteDestination })
    if(!destination){
        res.json({message : "destination not found"})
    }
  } catch(err) {
    console.log(err);
    res.json({message : "error occured while deleting destination"})
     
  }
};
