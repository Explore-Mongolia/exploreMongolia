import openai from "../../openAi.js";

export const generateTrip = async (req, res) => {
  const { origin, age, groupType, budget, preferences, days } = req.body;

  const prompt = `
You are a travel assistant. Generate a ${days}-day trip plan in Mongolia for a ${age}-year-old ${groupType}, traveling from ${origin}, with a budget of ${budget} USD. Preferences include: ${preferences}.

Return the plan in the following JSON format:
{
  "title": "Trip to Mongolia",
  "destinations": ["Ulaanbaatar", "Terelj National Park", "Kharkhorin"],
  "plan": [
    {
      "day": 1,
      "activities": ["Arrive in Ulaanbaatar", "Visit Sukhbaatar Square", "Dinner at local restaurant"]
    },
    {
      "day": 2,
      "activities": ["Drive to Terelj", "Visit Turtle Rock", "Stay in ger camp"]
    }
  ],
  "transportation": "Car rental",
  "accommodations": [{"name": "Terelj Hotel", "address": "Terelj, Mongolia"}],
  "notes": "Pack warm clothes. Cash preferred in rural areas."
}
Make sure the response is ONLY valid JSON.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
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
    console.error("GPT or DB Error:", error);
    res.status(500).json({ error: "Failed to generate or save trip plan" });
  }
};
