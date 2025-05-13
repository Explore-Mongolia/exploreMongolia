import { TripPlanModel } from "../../models/tripPlan-schema.js";

export default async function updateTrip(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing trip ID" });
    }

    const updatedTrip = await TripPlanModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ error: "Trip plan not found" });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error("Update trip failed:", error);
    res.status(500).json({ error: "Failed to update trip" });
  }
}
