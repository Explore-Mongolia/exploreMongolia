import openai from "../../openAi.js";


export const generateTrip = async (req, res) => {
 const { origin, age, groupType, budget, preferences, days } = req.body;


 const prompt = `
You are a travel assistant. Generate  ${days} trip plan in Mongolia for a ${age}-year-old ${groupType}, traveling from ${origin}, with a budget of ${budget} USD. Preferences include: ${preferences}.
Make it realistic, culturally rich, and local-friendly. Highlight unique experiences, destinations, and tips.
`;


 try {
   const completion = await openai.chat.completions.create({
       model: "gpt-3.5-turbo",
       messages: [{ role: "user", content: prompt }],
       max_tokens: 800
     });
    


   const tripPlan = completion.choices[0].message.content;
   res.status(200).json({ tripPlan });
 } catch (error) {
   console.error("GPT Error:", error);
   res.status(500).json({ error: "Failed to generate trip plan" });
 }
}


