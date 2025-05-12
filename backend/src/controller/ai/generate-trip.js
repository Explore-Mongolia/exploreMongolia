import openai from "../../openAi.js";

let isGenerating = false; 

export  async function generateTrip(req, res) {

  if (isGenerating) {
    return res
      .status(429)
      .json({ error: "Another trip is being generated. Please wait a moment." });
  }

  isGenerating = true;

  const timeout = setTimeout(() => {
    isGenerating = false; // Safety release in case of a crash
  }, 20000); // 20 seconds safety net


  const { budget, type } = req.body; 


  const prompt = `
  You are a travel assistant. Create a 3–7 day trip plan in Mongolia with a total budget of ${budget} USD focused on ${type}.
  
  Return only valid JSON in the format:
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
      model: "gpt-4",
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
  } finally {
    clearTimeout(timeout);
    isGenerating = false;
  }
}
