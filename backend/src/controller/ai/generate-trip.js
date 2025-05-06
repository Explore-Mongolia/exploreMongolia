import openai from "../../openAi.js";

export const generateTrip = async (req, res) => {
  const { groupType, budget, preferences } = req.body;

  const prompt = `
You are a travel assistant. Generate a 3-day trip plan in Mongolia for a ${groupType} with a budget of ${budget} USD. Their preferences include: ${preferences}.

Return only valid JSON in the following format:
{
  "title": "Trip to Mongolia",
  "destinations": ["Ulaanbaatar", "Terelj National Park"],
  "plan": [
    {
      "day": 1,
      "activities": ["Activity 1", "Activity 2"]
    }
  ],
  "transportation": "Transport type",
  "accommodations": [{"name": "Hotel Name", "address": "Hotel Address"}],
  "notes": "Important notes"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800, 
    });

    const tripJSON = completion.choices[0].message.content;

    let parsedTrip;
    try {
      parsedTrip = JSON.parse(tripJSON);
    } catch (parseError) {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    res.status(200).json({ tripPlan: parsedTrip });
  } catch (error) {
    console.error("GPT Error:", error);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
};
