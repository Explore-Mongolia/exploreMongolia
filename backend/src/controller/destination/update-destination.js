import { DestinationModel } from "../../models/destination-schema.js";

export const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, destination, cost , image, company ,vibesAvailable } = req.body;

        const updatedDestination = await DestinationModel.findByIdAndUpdate(
            id,
            { name, description, destination, image, company ,cost , vibesAvailable },
        );

        if (!updatedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json({
            message: "Destination updated successfully",
            destination: updatedDestination,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update destination", error });
    }
}