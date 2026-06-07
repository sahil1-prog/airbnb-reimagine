import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface TavilyCacheEntry {
  answer: string;
  results: Array<{ title: string; content: string; url: string }>;
  cachedAt: number;
}

// Server-side in-memory cache for Tavily grounding searches (24h TTL to respect free tier quotas)
const tavilyCache = new Map<string, TavilyCacheEntry>();
const TAVILY_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  let promptText = "";
  try {
    const {
      prompt,
      currency = "₹",
      country = "India",
      city = "New Delhi",
      history = [],
      useTavily = false,
      tavilyApiKey = "",
    } = await req.json();
    promptText = prompt || "";

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Tavily Grounding Search (with caching support)
    let searchContext = "";
    let tavilyUsed = false;
    const activeTavilyKey = tavilyApiKey || process.env.TAVILY_API_KEY;
    if (useTavily && activeTavilyKey) {
      try {
        const cacheKey = prompt.toLowerCase().trim().replace(/\s+/g, " ");
        const cached = tavilyCache.get(cacheKey);
        
        if (cached && Date.now() - cached.cachedAt < TAVILY_CACHE_TTL_MS) {
          console.log("Tavily grounding cache HIT for query:", prompt);
          searchContext = `[Real-Time Grounding Information from Web Search]:\n` +
            `Direct Answer Summary: ${cached.answer || "N/A"}\n` +
            `Search Results: ${JSON.stringify(cached.results)}`;
          tavilyUsed = true;
        } else {
          console.log("Running Tavily grounding search for query:", prompt);
          const searchRes = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: activeTavilyKey,
              query: prompt,
              search_depth: "basic",
              include_answer: true,
            }),
          });
          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const curatedResults = (searchData.results || []).slice(0, 3).map((r: { title: string; content: string; url: string }) => ({
              title: r.title,
              content: r.content,
              url: r.url
            }));
            searchContext = `[Real-Time Grounding Information from Web Search]:\n` +
              `Direct Answer Summary: ${searchData.answer || "N/A"}\n` +
              `Search Results: ${JSON.stringify(curatedResults)}`;
            tavilyUsed = true;
            
            // Cache the response
            tavilyCache.set(cacheKey, {
              answer: searchData.answer || "N/A",
              results: curatedResults,
              cachedAt: Date.now()
            });
            console.log("Tavily grounding retrieved and cached successfully.");
          } else {
            console.warn("Tavily API failed with status:", searchRes.status);
          }
        }
      } catch (searchErr) {
        console.error("Error executing Tavily search:", searchErr);
      }
    }

    let data: any = null;
    let successfulModelName = "";

    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelsToTry = [
        "gemini-3.1-flash-lite",
        "gemini-2.5-flash",
        "gemini-3-flash-preview",
        "gemini-3.5-flash"
      ];

      const systemPrompt = `You are "Anywhere Door", a sharp, context-aware AI travel concierge embedded in Airbnb. You read between the lines of a user's travel request and produce plans that feel handcrafted, not templated.

User context:
- Base country: ${country}
- Base city: ${city}
- Currency: ${currency} (use ONLY this symbol for every price, never ₹, $, or others unless it matches)

---

UNDERSTANDING THE REQUEST
Before building the plan, silently extract:
1. **Destination**: explicit or inferred (e.g. "snowy vibes" -> Manali/Shimla)
2. **Duration**: number of nights/days; if unstated, infer from context (e.g. "weekend" = 2 nights)
3. **Group profile**: solo | couple | group of N | family with kids | friends
4. **Budget tier**: derive from the user's words, then apply it using YOUR knowledge of real pricing for that specific destination and season:
   - "cheap / budget / backpacker / under X" -> BUDGET tier: pick stays in the lowest cost range for that place (e.g. hostels, shared guesthouses, budget homestays). Do NOT use a fixed number: ₹800 is budget in Kasol, ₹2,500 might be budget in South Goa peak season. Use your knowledge.
   - "comfortable / mid-range / decent / standard" -> MID tier: 3-star equivalents or well-reviewed homestays/inns at the typical mid-market rate for that destination.
   - "luxury / splurge / 5-star / premium / lavish / treat ourselves" -> PREMIUM tier: high-end resorts, boutique villas, or luxury stays at market rate for that destination.
   - If the user states a hard price ceiling (e.g. "under ₹10,000 total" or "budget of ₹5k"), treat that as an absolute cap for the ENTIRE trip including stays, food, and activities.
   - If no budget signals, default to MID tier.
5. **Vibe/Intent**: romantic escape | adventure | relaxation | cultural immersion | foodie | party | spiritual | workation
6. **Constraints**: no alcohol, veg-only, pet-friendly, accessibility needs, no flights, etc.
7. **Season/Timing**: if dates or months are given, ensure destination is accessible and recommendations are season-appropriate. (e.g. don't suggest Manali in July landslide season without flagging it)

---

OUTPUT FORMAT: respond ONLY with this JSON (no markdown, no extra text):

{
  "title": "A short, catchy, personalised trip name that reflects their specific request (e.g. 'Cosy Manali Couple Escape' not 'Trip to Manali')",
  "message": "2-3 sentences written like a knowledgeable friend: explain your picks, why they match the vibe, and one insider tip. Avoid corporate filler.",
  "stays": [
    {
      "name": "Real or plausible property name",
      "location": "Neighbourhood or village, City",
      "price": "${currency}X,XXX/night",
      "rating": number between 4.5 and 5.0,
      "highlights": "Two vivid, specific sentences that sell the place. Mention unique details like the view, a smell, a feeling, not generic amenities.",
      "badge": "Guest Favourite | Superhost | Top Rated | Rare Find | New"
    }
  ],
  "experiences": [
    {
      "name": "Real or plausible local experience or activity name",
      "location": "Activity site, City",
      "price": "${currency}X,XXX/person",
      "rating": number between 4.5 and 5.0,
      "highlights": "Two vivid, specific sentences that sell the experience.",
      "badge": "Guest Favourite | Superhost | Top Rated | New"
    }
  ],
  "services": [
    {
      "name": "Real or plausible local service (e.g. Photographer, Chef, Local Guide)",
      "location": "Service area, City",
      "price": "${currency}X,XXX/session (or /service or /day)",
      "rating": number between 4.5 and 5.0,
      "highlights": "Two vivid, specific sentences that sell the service.",
      "badge": "Guest Favourite | Superhost | Top Rated | New"
    }
  ],
  "itinerary": [
    {
      "day": "Day N: Evocative title (e.g. 'Day 1: Arrive, Unwind, Explore Old Town')",
      "activities": [
        { "time": "Morning | Afternoon | Evening | Night", "description": "Specific activity with a local detail, not just 'visit a temple'. E.g. 'Head to Café 1947 for malai chai and a window seat overlooking the snow'" }
      ]
    }
  ],
  "budget": {
    "accommodation": "${currency} total for all nights",
    "activities": "${currency} realistic estimate",
    "food": "${currency} realistic estimate (match to group size and budget tier)",
    "transport": "${currency} realistic estimate (local cabs, trains, etc.)",
    "total": "${currency} grand total",
    "perPerson": "${currency} per person split"
  },
  "questions": [
    "A short, natural follow-up question to refine this plan (e.g. 'Would you prefer a more secluded spot or somewhere closer to the action?')",
    "A second follow-up question based on something ambiguous or expandable in their request (e.g. 'Want me to swap the third day for a side trip to Kasol?')"
  ]
}

---

HARD RULES:
- Listings count: stays: exactly 3, experiences: exactly 2, services: exactly 1-2. Itinerary days: match the requested duration (default 3 if unspecified). Budget: always complete.
- Budget tier is NON-NEGOTIABLE. A budget traveller asking for cheap stays must NOT receive a ${currency}4,000/night option. Violating this makes the entire plan worthless.
- Prices must be realistic for the destination and season, not inflated or copied from high-end properties.
- The 'message' must feel personal and conversational. Never say 'I have curated' or 'Here is your plan'.
- Activities must be specific and local: reference real streets, local dishes, known spots, or sensory details.
- If the group is a couple, make the plan romantic. If it's a group of friends, add social energy. If solo, add introspective or freedom-oriented moments.
- For day trips / no-stay requests: stays = [], accommodation budget = ${currency}0.
- Never pad the itinerary with airport transfers or check-in procedures unless the trip is over 4 days.
- Return ONLY the raw JSON object. No backticks, no 'json' label, no explanation.`;
      // Map incoming history to Gemini Chat API format
      const chatHistory = [];
      if (history && history.length > 0) {
        for (const msg of history) {
          const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
          let textContent = "";
          if (typeof msg.content === "string") {
            textContent = msg.content;
          } else if (msg.parts && msg.parts[0] && msg.parts[0].text) {
            textContent = msg.parts[0].text;
          } else {
            textContent = JSON.stringify(msg);
          }
          chatHistory.push({
            role,
            parts: [{ text: textContent }],
          });
        }
      }

      let lastError: any = null;

      for (const modelName of modelsToTry) {
        try {
          console.log(`Attempting plan generation with model: ${modelName}...`);
          const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.7,
            },
            systemInstruction: systemPrompt,
          });

          // Initialize Chat session with history
          const chat = model.startChat({
            history: chatHistory,
          });

          const promptToSend = searchContext
            ? `Real-time search results to ground your answer:\n${searchContext}\n\nUser request: ${prompt}`
            : prompt;

          const result = await chat.sendMessage(promptToSend);
          const text = result.response.text();
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (!jsonMatch) throw new Error("No valid JSON in model response");

          data = JSON.parse(jsonMatch[0]);
          data.listings = data.listings || data.stays || [];
          data.stays = data.stays || data.listings || [];
          data.experiences = data.experiences || [];
          data.services = data.services || [];
          data.modelUsed = modelName;
          data.tavilyUsed = tavilyUsed;
          console.log(`Plan generation succeeded with model: ${modelName}`);
          break;
        } catch (err: any) {
          console.warn(`Model ${modelName} failed:`, err?.message || err);
          lastError = err;
        }
      }

      if (!data) {
        throw lastError || new Error("All Gemini models failed to generate a plan.");
      }
    } else {
      throw new Error("GEMINI_API_KEY is not set in the environment variables. Please configure GEMINI_API_KEY.");
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Plan API error:", err);
    const message = err instanceof Error ? err.message : "An unknown error occurred while communicating with Gemini.";
    return NextResponse.json(
      { error: `Gemini API execution failed: ${message}` },
      { status: 500 }
    );
  }
}
