import { ExperiencesModel } from "../../models/experience-schema.js";

export const reactToExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { userId, emoji } = req.body;

    console.log("Received Experience ID:", experienceId);

    if (!emoji) {
      return res.status(400).json({ message: "Emoji is required." });
    }

    const experience = await ExperiencesModel.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const existingReactionIndex = experience.reactions.findIndex(
      (r) => r.user.toString() === userId.toString()
    );

    if (existingReactionIndex !== -1) {
      experience.reactions[existingReactionIndex].emoji = emoji;
      experience.reactions[existingReactionIndex].reactedAt = Date.now();
    } else {
      experience.reactions.push({ user: userId, emoji, reactedAt: Date.now() });
    }

    await experience.save();

    const emojiCounts = experience.reactions.reduce((acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    }, {});

    return res.status(200).json({
      message: "Reaction saved",
      reactions: emojiCounts,
    });
  } catch (error) {
    console.error("Error saving experience reaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

};
