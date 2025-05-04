export const createCompanyRating = async (req, res) => {
    try {
      const { userId, rating } = req.body;
      const companyId = req.params.id;
  
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }
  
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
  
      const existingRatingIndex = company.ratings.findIndex(
        (r) => r.user.toString() === userId
      );
  
      if (existingRatingIndex !== -1) {
        company.ratings[existingRatingIndex].rating = rating;
        company.ratings[existingRatingIndex].ratedAt = Date.now();
      } else {
        
        company.ratings.push({ user: userId, rating, ratedAt: Date.now() });
      }
  
      
      const totalRatings = company.ratings.reduce((sum, r) => sum + r.rating, 0);
      company.averageRating = (totalRatings / company.ratings.length).toFixed(2);
  
      
      await company.save();
  
      return res.status(200).json({
        message: "Company rating created/updated successfully",
        company,
      });
    } catch (error) {
      console.error("Error creating company rating:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  