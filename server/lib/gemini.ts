export interface RecommendedDish {
  name: string;
  description: string;
}

export interface ItineraryLocation {
  id: string;
  name: string;
  type: "restaurant" | "attraction";
  category: string;
  description: string;
  duration: string;
  time: string;
  address: string;
  lat: number;
  lng: number;
  transport?: {
    method: string;
    duration: string;
  };
  recommendedDishes?: RecommendedDish[];
}

export interface DayItinerary {
  dayNumber: number;
  locations: ItineraryLocation[];
}

export interface GeneratedItinerary {
  destination: string;
  days: DayItinerary[];
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      role: string;
      parts: Array<{ text: string }>;
    };
  }>;
}

export async function generateItinerary(
  destination: string,
  duration: number
): Promise<GeneratedItinerary> {
  const prompt = `You are a travel planning expert. Create a detailed ${duration}-day travel itinerary for ${destination}.

For each day, provide 5 activities/places to visit including:
- Breakfast restaurant (around 8:00-9:00 AM)
- Morning attraction (around 10:00-11:00 AM)
- Lunch restaurant (around 12:30-1:30 PM)
- Afternoon attraction (around 3:00-4:00 PM)
- Dinner restaurant (around 7:00-8:00 PM)

For each location, provide:
- name: The actual name of the place
- type: Either "restaurant" or "attraction"
- category: Type of cuisine for restaurants (e.g., "French Bistro", "Italian", "Local Cuisine") or type of attraction (e.g., "Museum", "Landmark", "Park", "Historic Site")
- description: A 1-2 sentence description of what makes this place special
- duration: How long to spend there (e.g., "1 hour", "2-3 hours")
- time: The suggested time to visit in 24h format or AM/PM (e.g., "8:00 AM", "14:00")
- address: The street address
- lat: Latitude coordinate (must be accurate for the actual location)
- lng: Longitude coordinate (must be accurate for the actual location)
- transport: For all locations except the first of the day, include the transport method and duration from the previous location
- recommendedDishes: FOR RESTAURANTS ONLY, include exactly 3 recommended dishes with name and short description

Return ONLY valid JSON in this exact format, no markdown or other text:
{
  "destination": "${destination}",
  "days": [
    {
      "dayNumber": 1,
      "locations": [
        {
          "id": "day1-loc1",
          "name": "Example Restaurant",
          "type": "restaurant",
          "category": "French Café",
          "description": "A charming café known for fresh pastries.",
          "duration": "1 hour",
          "time": "8:00 AM",
          "address": "123 Main St",
          "lat": 48.8566,
          "lng": 2.3522,
          "recommendedDishes": [
            {"name": "Croissant aux Amandes", "description": "Flaky almond croissant with sweet filling"},
            {"name": "Pain au Chocolat", "description": "Classic chocolate-filled pastry"},
            {"name": "Café Crème", "description": "Rich espresso with steamed milk"}
          ]
        },
        {
          "id": "day1-loc2",
          "name": "Famous Museum",
          "type": "attraction",
          "category": "Museum",
          "description": "World-renowned art museum.",
          "duration": "3 hours",
          "time": "10:00 AM",
          "address": "456 Art Ave",
          "lat": 48.8606,
          "lng": 2.3376,
          "transport": {
            "method": "Walk",
            "duration": "15 min"
          }
        }
      ]
    }
  ]
}`;

  const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
  
  const response = await fetch(
    `${baseUrl}/models/gemini-2.5-flash:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = (await response.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  if (!text) {
    throw new Error("No response received from AI");
  }
  
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse itinerary response");
  }

  const itinerary = JSON.parse(jsonMatch[0]) as GeneratedItinerary;
  return itinerary;
}
