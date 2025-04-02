
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAtIJNuqJsnifU3Ez3CNEtjUrhQWbB1N7o";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function fetchCombination(element1: string, element2: string) {
  try {
    const prompt = `I'm playing a game called Infinite Craft where I combine two elements to discover a new element.
    If I combine "${element1}" and "${element2}", what new element would I get?
    
    Rules:
    - Be creative but logical in your combinations
    - The result should be a single noun or simple concept
    - Include a suitable emoji that represents the new element
    - If the combination doesn't make sense, return null
    
    Return ONLY a JSON object with this exact format:
    {
      "result": "New Element Name",
      "emoji": "Single Emoji",
      "description": "A brief one-sentence description of this element"
    }
    
    If there's no logical combination, return {"result": null, "emoji": null, "description": null}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON part from the response
    const jsonRegex = /{[\s\S]*}/;
    const match = text.match(jsonRegex);
    
    if (match) {
      try {
        const jsonData = JSON.parse(match[0]);
        return jsonData;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Try to extract the result manually
        const nameMatch = text.match(/"result"\s*:\s*"([^"]+)"/);
        const emojiMatch = text.match(/"emoji"\s*:\s*"([^"]+)"/);
        const descMatch = text.match(/"description"\s*:\s*"([^"]+)"/);
        
        if (nameMatch) {
          return {
            result: nameMatch[1],
            emoji: emojiMatch ? emojiMatch[1] : "✨",
            description: descMatch ? descMatch[1] : `A combination of ${element1} and ${element2}`,
          };
        }
      }
    }
    
    return { result: null, emoji: null, description: null };
  } catch (error) {
    console.error("Error fetching combination:", error);
    throw error;
  }
}
