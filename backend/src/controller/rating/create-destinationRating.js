
import { DestinationModel } from "../../models/destination-schema.js";

export const createDestinationRating = async (req, res) => {

    try{
        const { userId, rating } = req.body;
        const destinationId = req.params.id;

        const destination = await DestinationModel.findById(destinationId);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }

      const existingRatingIndex = destination.ratings.findIndex(
        (r) => r.user.toString() === userId
      );
  
      if (existingRatingIndex !== -1) {
        destination.ratings[existingRatingIndex].rating = rating;
        destination.ratings[existingRatingIndex].ratedAt = Date.now();
      } else {
        
        destination.ratings.push({ user: userId, rating, ratedAt: Date.now() });
      }
  
      
      const totalRatings = destination.ratings.reduce((sum, r) => sum + r.rating, 0);
      destination.averageRating = (totalRatings / destination.ratings.length).toFixed(2);
  
      
      await destination.save();
  
      return res.status(200).json({
        message: "Destination rating created/updated successfully",
        destination,
      });
    }catch(error){
        console.error("Error creating destination rating:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};