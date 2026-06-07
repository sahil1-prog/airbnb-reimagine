"use client";

import { useState, useRef, useEffect } from "react";
import ListingCard from "./ListingCard";
import {
  X,
  Sparkles,
  Send,
  Star,
  RefreshCw,
  MapPin,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  Loader2,
  Circle,
  AlertCircle,
  Settings,
} from "lucide-react";

interface Listing {
  name: string;
  location: string;
  price: string;
  rating: number;
  highlights: string;
  badge: string;
}

interface Activity {
  time: string;
  description: string;
}

interface ItineraryDay {
  day: string;
  activities: Activity[];
}

interface Budget {
  accommodation: string;
  activities: string;
  food: string;
  transport: string;
  total: string;
  perPerson: string;
}

interface PlanResult {
  title?: string;
  message?: string;
  listings: Listing[];
  stays?: Listing[];
  experiences?: Listing[];
  services?: Listing[];
  itinerary: ItineraryDay[];
  budget: Budget;
  modelUsed?: string;
  tavilyUsed?: boolean;
  questions?: string[];
}

interface ThinkingStep {
  label: string;
  status: "pending" | "loading" | "done" | "error";
}

interface AnywhereDoorProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: string;
  country?: string;
  city?: string;
  activeTrip: any | null;
  onPlanGenerated?: (plan: PlanResult, history: any[]) => void;
}

const THINKING_STEPS = [
  "Understanding your travel vibe...",
  "Scanning 4M+ listings worldwide...",
  "Curating top 3 perfect matches...",
  "Building your day-by-day itinerary...",
  "Calculating group cost split...",
];

function getSuggestions(country: string, city: string): string[] {
  if (country === "India") {
    return [
      `🏝️ 3 days in Goa for 2`,
      `🏔️ Weekend in Manali, group of 4`,
      `🌴 Houseboat in Alleppey, Kerala`,
      `🏰 Heritage stay in Jaipur, 3 nights`,
      `🌊 Beach villa in Varkala, solo`,
      `🗺️ Things to do near ${city}`,
    ];
  }
  if (country === "United States") {
    return [
      `🏖️ Beach house in Miami for 4`,
      `🏔️ Cabin in Aspen for a week`,
      `🌆 NYC penthouse, weekend`,
      `🌴 Malibu villa, group of 6`,
      `🏕️ Glamping in Yellowstone`,
    ];
  }
  return [
    `🏝️ 3-day beach getaway for 2`,
    `🌿 Mountain cabin retreat`,
    `🏙️ City break, budget ₹10,000/night`,
    `🌊 Coastal villa, group of 6`,
    `🏔️ Adventure trip, solo traveller`,
  ];
}

/** Localised mock data fallback in case network API fails */
function getMockResponse(prompt: string, currencySymbol: string): PlanResult {
  const isInr = currencySymbol === "₹";
  const p = prompt.toLowerCase();

  // 1. GOA
  if (p.includes("goa")) {
    return {
      title: "Goa Beachfront Escape",
      message: "Here is your custom tropical getaway to Goa. We curated beachside stays, water sports, and sunset cruises.",
      listings: [
        {
          name: "Coconut Grove Beach Villa",
          location: "Goa, North Goa",
          price: isInr ? "₹9,500" : "$110",
          rating: 4.97,
          highlights: "Stunning beach views, private pool, and local chef services included.",
          badge: "Guest Favourite",
        },
        {
          name: "Heritage Anjuna Portuguese Villa",
          location: "Anjuna, Goa",
          price: isInr ? "₹7,800" : "$90",
          rating: 4.91,
          highlights: "Beautifully restored Portuguese home with lush gardens and shared pool.",
          badge: "Superhost",
        },
        {
          name: "Sunset Sea-View Penthouse",
          location: "Candolim, Goa",
          price: isInr ? "₹4,200" : "$50",
          rating: 4.85,
          highlights: "Cosy apartment overlooking the Arabian Sea, walking distance to beach.",
          badge: "Top Rated",
        },
      ],
      experiences: [
        {
          name: "Mandovi River Sunset Cruise",
          location: "Panaji, Goa",
          price: isInr ? "₹1,500" : "$18",
          rating: 4.92,
          highlights: "Beautiful cruise along Mandovi river with traditional Goan folk performances.",
          badge: "Top Rated",
        },
        {
          name: "Anjuna Parasailing & Water Sports",
          location: "Anjuna Beach, Goa",
          price: isInr ? "₹2,500" : "$30",
          rating: 4.88,
          highlights: "Thrilling parasailing and jet skiing with trained local safety guides.",
          badge: "Guest Favourite",
        }
      ],
      services: [
        {
          name: "Goan Beach Candid Portrait Photography",
          location: "Calangute, Goa",
          price: isInr ? "₹4,500" : "$55",
          rating: 4.95,
          highlights: "Professional photographer capturing sunset portraits on the beach.",
          badge: "Superhost",
        }
      ],
      itinerary: [
        {
          day: "Day 1 - Arrival & Beach Sunset",
          activities: [
            { time: "Afternoon", description: "Check in at your beach property and freshen up." },
            { time: "Evening", description: "Sunset walk on Candolim beach followed by beachside shacks dinner." },
            { time: "Night", description: "Enjoy live music and local fenny cocktails in Panaji." },
          ],
        },
        {
          day: "Day 2 - Heritage Tour & Spice Plantation",
          activities: [
            { time: "Morning", description: "Visit Basilica of Bom Jesus and Old Goa churches." },
            { time: "Afternoon", description: "Traditional buffet lunch at Sahakari Spice Farm." },
            { time: "Evening", description: "Scenic Mandovi River sunset cruise with Goan folk dance." },
          ],
        },
        {
          day: "Day 3 - Water Sports & Departure",
          activities: [
            { time: "Morning", description: "Parasailing and jet skiing at Baga Beach." },
            { time: "Afternoon", description: "Local fish curry thali lunch." },
            { time: "Evening", description: "Final souvenir shopping before departure." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹28,500" : "$330",
        activities: isInr ? "₹6,000" : "$70",
        food: isInr ? "₹9,000" : "$100",
        transport: isInr ? "₹3,500" : "$40",
        total: isInr ? "₹47,000" : "$540",
        perPerson: isInr ? "₹23,500 / person" : "$270 / person",
      },
      questions: ["Would you prefer a stay in South Goa instead?", "Can we adjust the dining choices to be vegetarian-only?"]
    };
  }

  // 2. MANALI
  if (p.includes("manali") || p.includes("jibhi") || p.includes("himachal") || p.includes("cabin") || p.includes("chalet")) {
    return {
      title: "Himalayan Cozy Cabin Retreat",
      message: "Escape to the mountain valleys of Himachal. We picked top glass A-frames, adventure treks, and local photo shoots.",
      listings: [
        {
          name: "Snow Peak Forest Chalet",
          location: "Manali, Himachal Pradesh",
          price: isInr ? "₹6,800" : "$80",
          rating: 4.93,
          highlights: "Cosy pine-wood cabin with fireplace and panoramic Himalayan views.",
          badge: "Top Rated",
        },
        {
          name: "Riverside A-Frame Cabin",
          location: "Jibhi, Himachal Pradesh",
          price: isInr ? "₹5,200" : "$60",
          rating: 4.94,
          highlights: "Riverside wooden cottage, wooden deck, bonfire area under pine trees.",
          badge: "Rare Find",
        },
        {
          name: "Solang Valley Ski Resort Room",
          location: "Solang, Manali",
          price: isInr ? "₹4,500" : "$55",
          rating: 4.78,
          highlights: "Perfect ski chalet room, close to slopes, beautiful valley views.",
          badge: "Superhost",
        },
      ],
      experiences: [
        {
          name: "Jogini Waterfalls Forest Trek",
          location: "Vashisht, Manali",
          price: isInr ? "₹1,200" : "$15",
          rating: 4.96,
          highlights: "Guided hike through pine woods to the gorgeous Jogini waterfalls.",
          badge: "Superhost",
        },
        {
          name: "Solang Valley Paragliding Session",
          location: "Solang Valley, Manali",
          price: isInr ? "₹3,000" : "$36",
          rating: 4.91,
          highlights: "Tandem paragliding with panoramic views of snowcapped Himalayan peaks.",
          badge: "Guest Favourite",
        }
      ],
      services: [
        {
          name: "Solang Valley Snowy Portrait Session",
          location: "Solang Valley, Manali",
          price: isInr ? "₹5,000" : "$60",
          rating: 4.98,
          highlights: "Couples and solo winter photoshoot in the snow with high-res edits.",
          badge: "New",
        }
      ],
      itinerary: [
        {
          day: "Day 1 - Arrival & Solang Valley Views",
          activities: [
            { time: "Afternoon", description: "Arrive in Manali, check in to your chalet and enjoy hot chai." },
            { time: "Evening", description: "Stroll along Mall Road and buy local woollens." },
            { time: "Night", description: "Cosy dinner by the fireplace." },
          ],
        },
        {
          day: "Day 2 - Paragliding & Jogini Waterfall Trek",
          activities: [
            { time: "Morning", description: "Paragliding in Solang Valley." },
            { time: "Afternoon", description: "Scenic trek to Jogini Waterfalls near Vashisht village." },
            { time: "Evening", description: "Dip in Vashisht hot springs to relax." },
          ],
        },
        {
          day: "Day 3 - Solang Valley Skiing & Departure",
          activities: [
            { time: "Morning", description: "Skiing session or cable car ride." },
            { time: "Afternoon", description: "Café hopping in Old Manali." },
            { time: "Evening", description: "Depart back to Delhi." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹27,200" : "$320",
        activities: isInr ? "₹12,000" : "$140",
        food: isInr ? "₹10,000" : "$120",
        transport: isInr ? "₹8,000" : "$95",
        total: isInr ? "₹57,200" : "$675",
        perPerson: isInr ? "₹14,300 / person" : "$168.75 / person",
      },
      questions: ["Would you like to include an overnight camp stay?", "Should we budget for dynamic transit options?"]
    };
  }

  // DEFAULT FALLBACK
  return {
    title: "Custom Heritage Holiday",
    message: "Here is your tailored holiday plan. We have curated gorgeous local stays and immersive activities for you.",
    listings: [
      {
        name: isInr ? "Clifftop Heritage Mansion" : "Clifftop Villa with Infinity Pool",
        location: isInr ? "Udaipur, India" : "Santorini, Greece",
        price: isInr ? "₹12,500" : "$220",
        rating: 4.97,
        highlights: "Breathtaking views, private infinity pool, and custom local cuisines.",
        badge: "Guest Favourite",
      },
      {
        name: isInr ? "Backwater Houseboat Suite" : "Designer Cave Suite",
        location: isInr ? "Alleppey, India" : "Oia, Greece",
        price: isInr ? "₹8,200" : "$180",
        rating: 4.93,
        highlights: "Luxury traditional suite with local chef services included.",
        badge: "Superhost",
      },
      {
        name: isInr ? "Snow Peak Forest Chalet" : "Luxury Seaview Penthouse",
        location: isInr ? "Manali, India" : "Fira, Greece",
        price: isInr ? "₹6,800" : "$150",
        rating: 4.89,
        highlights: "Cosy fireplace, panoramic mountain/ocean view terrace deck.",
        badge: "Top Rated",
      },
    ],
    experiences: [
      {
        name: "Historical Heritage Tour",
        location: isInr ? "Udaipur, India" : "Fira, Greece",
        price: isInr ? "₹2,500" : "$35",
        rating: 4.96,
        highlights: "Guided walk with a local archaeologist around historical landmarks.",
        badge: "Superhost",
      }
    ],
    services: [
      {
        name: "Candid Vacation Portrait Shoot",
        location: isInr ? "Udaipur, India" : "Santorini, Greece",
        price: isInr ? "₹5,500" : "$70",
        rating: 4.92,
        highlights: "Professional photographer session with next-day digital gallery.",
        badge: "New",
      }
    ],
    itinerary: [
      {
        day: "Day 1 - Arrival & Sunset View",
        activities: [
          { time: "Afternoon", description: "Arrive at your property and check in." },
          { time: "Evening", description: "Scenic sunset stroll followed by dinner." },
        ],
      },
      {
        day: "Day 2 - Sightseeing & Local Experiences",
        activities: [
          { time: "Morning", description: "Enjoy a guided tour of regional highlights." },
          { time: "Afternoon", description: "Taste authentic cuisines at a local bazaar." },
        ],
      },
      {
        day: "Day 3 - Farewell & Departure",
        activities: [
          { time: "Morning", description: "Last souvenir shopping and coffee." },
          { time: "Afternoon", description: "Depart for the airport." },
        ],
      },
    ],
    budget: {
      accommodation: isInr ? "₹37,500" : "$550",
      activities: isInr ? "₹8,000" : "$100",
      food: isInr ? "₹12,000" : "$150",
      transport: isInr ? "₹5,500" : "$70",
      total: isInr ? "₹63,000" : "$870",
      perPerson: isInr ? "₹15,750 / person" : "$217.50 / person",
    },
    questions: ["Would you like to extend your trip?", "Should we change the accommodation styles?"]
  };
}

export default function AnywhereDoor({
  isOpen,
  onClose,
  currency = "₹",
  country = "India",
  city = "New Delhi",
  activeTrip,
  onPlanGenerated,
}: AnywhereDoorProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState<ThinkingStep[]>([]);
  const [result, setResult] = useState<PlanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // Settings Panel State
  const [showSettings, setShowSettings] = useState(false);
  const [tavilyApiKey, setTavilyApiKey] = useState("");
  const [useTavily, setUseTavily] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const suggestions = getSuggestions(country, city);

  // Load settings on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTavilyApiKey(localStorage.getItem("tavily-api-key") || "");
      setUseTavily(localStorage.getItem("use-tavily") === "true");
    }
  }, []);

  // Adjust textarea height on typing
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 100)}px`;
    }
  }, [prompt]);

  // Scroll to bottom when results or chat updates
  useEffect(() => {
    if (bodyRef.current) {
      setTimeout(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
      }, 300);
    }
  }, [result, messages, isLoading]);

  // Preload history and plan when activeTrip updates
  useEffect(() => {
    if (isOpen) {
      if (activeTrip) {
        setMessages(activeTrip.history || []);
        setResult(activeTrip.plan);
      } else {
        setMessages([]);
        setResult(null);
      }
      setError(null);
      setShowSettings(false);
    }
  }, [isOpen, activeTrip]);

  // Handle focus when drawer opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus({ preventScroll: true });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      textareaRef.current?.blur();
    }
  }, [isOpen]);

  const runStepsAnimation = async () => {
    setSteps(THINKING_STEPS.map((label) => ({ label, status: "pending" })));
    for (let i = 0; i < THINKING_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, i === 0 ? 100 : 600));
      setSteps((prev) =>
        prev.map((s, idx) => ({
          ...s,
          status: idx === i ? "loading" : idx < i ? "done" : "pending",
        }))
      );
    }
  };

  const handleSubmit = async (overridePrompt?: string) => {
    const finalPrompt = overridePrompt ?? prompt;
    if (!finalPrompt.trim() || isLoading) return;

    // Construct user message turn
    const userMsg = { role: "user", parts: [{ text: finalPrompt }] };
    const updatedHistory = [...messages, userMsg];

    setIsLoading(true);
    setResult(null);
    setError(null);
    setMessages(updatedHistory);
    setPrompt("");

    runStepsAnimation();

    try {
      const fetchPromise = fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          currency,
          country,
          city,
          history: messages, // send history before this turn
          useTavily,
          tavilyApiKey,
        }),
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out after 60 seconds. Falling back to offline generation...")), 60000)
      );

      const res = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || `HTTP error! Status: ${res.status}`);
      }

      setSteps(THINKING_STEPS.map((label) => ({ label, status: "done" })));
      await new Promise((r) => setTimeout(r, 400));

      const assistantMsg = { role: "model", parts: [{ text: JSON.stringify(data) }] };
      const finalHistory = [...updatedHistory, assistantMsg];

      setMessages(finalHistory);
      setResult(data);
      if (onPlanGenerated) {
        onPlanGenerated(data, finalHistory);
      }
    } catch (err: any) {
      console.warn("API call failed or timed out. Falling back to mock generator:", err?.message || err);
      // Fall back to mock response *only after* a failure occurs
      const mock = getMockResponse(finalPrompt, currency);

      setSteps(THINKING_STEPS.map((label) => ({ label, status: "done" })));
      await new Promise((r) => setTimeout(r, 400));

      const assistantMsg = { role: "model", parts: [{ text: JSON.stringify(mock) }] };
      const finalHistory = [...updatedHistory, assistantMsg];

      setMessages(finalHistory);
      setResult(mock);
      if (onPlanGenerated) {
        onPlanGenerated(mock, finalHistory);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const handleSuggestion = (s: string) => {
    const clean = s.replace(/^[\p{Emoji}\s]+/u, "").trim();
    setPrompt(clean);
    setTimeout(() => handleSubmit(clean), 50);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setSteps([]);
    setPrompt("");
    setMessages([]);
    if (onPlanGenerated) {
      onPlanGenerated(null as any, []);
    }
  };

  return (
    <>
      <div className={`drawer-overlay${isOpen ? " open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div className={`drawer${isOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Airbnb Odyssey AI Travel Planner">

        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <div className="drawer-title-icon" style={{ background: "var(--airbnb-coral-glow)", color: "var(--airbnb-coral)" }}>
              <Sparkles size={18} fill="currentColor" />
            </div>
            <div className="drawer-title-text">
              <h2>Airbnb Odyssey</h2>
              <p>AI Travel Companion · {country} · {currency}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                background: "transparent",
                border: "none",
                color: showSettings ? "var(--airbnb-coral)" : "var(--text-muted)",
                cursor: "pointer",
                padding: 6,
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s ease"
              }}
              aria-label="Grounding Settings"
            >
              <Settings size={18} />
            </button>
            <button className="drawer-close" onClick={onClose} aria-label="Close drawer">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="drawer-settings-panel">
            <div className="setting-row">
              <div>
                <span className="setting-label">Enable Web Grounding (Tavily)</span>
                <p className="setting-description">Runs a web search to fetch real prices and transit routes.</p>
              </div>
              <input
                type="checkbox"
                checked={useTavily}
                onChange={(e) => {
                  setUseTavily(e.target.checked);
                  localStorage.setItem("use-tavily", e.target.checked ? "true" : "false");
                }}
                style={{ width: 18, height: 18, accentColor: "var(--airbnb-coral)", cursor: "pointer" }}
              />
            </div>

            {useTavily && (
              <div className="setting-input-wrapper">
                <span className="setting-label">Tavily API Key</span>
                <input
                  type="password"
                  className="setting-input"
                  placeholder="Enter tvly-..."
                  value={tavilyApiKey}
                  onChange={(e) => {
                    setTavilyApiKey(e.target.value);
                    localStorage.setItem("tavily-api-key", e.target.value);
                  }}
                />
                {!tavilyApiKey && (
                  <span style={{ fontSize: 10, color: "#f87171", fontWeight: 600 }}>
                    ⚠️ Server key will be used as fallback.
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Body */}
        <div className="drawer-body" ref={bodyRef}>
          {/* Chat Logs */}
          {messages.length > 0 && (
            <div className="chat-log" style={{ display: "flex", flexDirection: "column", gap: 12, padding: "16px 0" }}>
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                let textContent = "";
                try {
                  const parsed = JSON.parse(msg.parts[0].text);
                  textContent = parsed.message || `Here is your customized travel plan: "${parsed.title || "Trip Plan"}"`;
                } catch {
                  textContent = msg.parts[0].text;
                }

                return (
                  <div
                    key={idx}
                    className={`chat-bubble ${isUser ? "user" : "assistant"}`}
                  >
                    {textContent}
                  </div>
                );
              })}
            </div>
          )}

          {/* Suggestions */}
          {messages.length === 0 && !isLoading && !result && (
            <div className="suggestions-row">
              {suggestions.map((s) => (
                <button key={s} className="suggestion-pill" onClick={() => handleSuggestion(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Thinking Steps */}
          {isLoading && steps.length > 0 && (
            <div className="thinking-container">
              {steps.map((step, i) => (
                <div className="thinking-step" key={step.label} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`step-indicator ${step.status}`}>
                    {step.status === "done" ? (
                      <CheckCircle2 size={16} style={{ color: "#34d399" }} />
                    ) : step.status === "loading" ? (
                      <Loader2 size={14} className="animate-spin" style={{ color: "var(--airbnb-coral)" }} />
                    ) : step.status === "error" ? (
                      <AlertCircle size={16} style={{ color: "#ef4444" }} />
                    ) : (
                      <Circle size={8} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                    )}
                  </div>
                  <span
                    className={`step-text${step.status === "loading" ? " active" : step.status === "done" ? " done" : ""}`}
                    style={step.status === "error" ? { color: "#ef4444" } : {}}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-container" style={{
              margin: "16px 0",
              padding: 16,
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid #ef4444",
              borderRadius: "var(--radius-md)",
              color: "#ef4444",
              fontSize: 13,
              lineHeight: "1.5"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, marginBottom: 8 }}>
                <AlertCircle size={16} />
                <span>API Connection Failed</span>
              </div>
              <p style={{ color: "var(--text-primary)" }}>{error}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  onClick={() => { setError(null); handleSubmit(); }}
                  style={{
                    padding: "6px 14px",
                    background: "var(--airbnb-coral)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-display)"
                  }}
                >
                  Retry Request
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    padding: "6px 14px",
                    background: "transparent",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    fontFamily: "var(--font-display)"
                  }}
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}

          {/* Plan Result */}
          {result && (
            <div className="results-container">
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 12 }}>
                <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-full)", padding: "6px 14px", fontSize: 12, color: "var(--text-muted)", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  <RefreshCw size={12} />
                  ↩ New Search
                </button>
              </div>

              {/* Stays */}
              {((result.stays && result.stays.length > 0) || (result.listings && result.listings.length > 0)) && (
                <>
                  <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={16} style={{ color: "var(--airbnb-coral)" }} />
                    <span>Top Stays</span>
                  </div>
                  <div className="listings-grid" style={{ padding: 0, gap: 16, marginBottom: 20 }}>
                    {(result.stays || result.listings || []).map((listing, i) => (
                      <ListingCard
                        key={listing.name}
                        id={`ai-stay-${i}`}
                        name={listing.name}
                        location={listing.location}
                        price={listing.price}
                        rating={listing.rating}
                        tags={listing.highlights ? [listing.highlights] : []}
                        badge={listing.badge}
                        index={i}
                        priceUnit=""
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Experiences */}
              {result.experiences && result.experiences.length > 0 && (
                <>
                  <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={16} style={{ color: "var(--airbnb-coral)" }} />
                    <span>Recommended Experiences</span>
                  </div>
                  <div className="listings-grid" style={{ padding: 0, gap: 16, marginBottom: 20 }}>
                    {result.experiences.map((listing, i) => (
                      <ListingCard
                        key={listing.name}
                        id={`ai-exp-${i}`}
                        name={listing.name}
                        location={listing.location}
                        price={listing.price}
                        rating={listing.rating}
                        tags={listing.highlights ? [listing.highlights] : []}
                        badge={listing.badge}
                        index={i}
                        priceUnit=""
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Services */}
              {result.services && result.services.length > 0 && (
                <>
                  <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={16} style={{ color: "var(--airbnb-coral)" }} />
                    <span>Local Services</span>
                  </div>
                  <div className="listings-grid" style={{ padding: 0, gap: 16, marginBottom: 20 }}>
                    {result.services.map((listing, i) => (
                      <ListingCard
                        key={listing.name}
                        id={`ai-service-${i}`}
                        name={listing.name}
                        location={listing.location}
                        price={listing.price}
                        rating={listing.rating}
                        tags={listing.highlights ? [listing.highlights] : []}
                        badge={listing.badge}
                        index={i}
                        priceUnit=""
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Itinerary */}
              <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CalendarDays size={16} style={{ color: "var(--airbnb-coral)" }} />
                <span>Your Itinerary</span>
              </div>
              {result.itinerary.map((day, i) => (
                <div key={day.day} className="itinerary-card" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="itinerary-day-header">{day.day}</div>
                  <div className="itinerary-activities">
                    {day.activities.map((act, j) => (
                      <div className="itinerary-activity" key={j}>
                        <span className="activity-time">{act.time}</span>
                        <div className="activity-dot" />
                        <span className="activity-text">{act.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Budget Breakdown */}
              <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CreditCard size={16} style={{ color: "var(--airbnb-coral)" }} />
                <span>Cost Breakdown</span>
              </div>
              <div className="budget-card" style={{ animationDelay: "0.4s" }}>
                <div className="budget-title">💳 Group Budget Split</div>
                {[
                  { label: "Accommodation", value: result.budget.accommodation },
                  { label: "Activities", value: result.budget.activities },
                  { label: "Food & Dining", value: result.budget.food },
                  { label: "Transport", value: result.budget.transport },
                  { label: "Total Trip Cost", value: result.budget.total },
                ].map((row) => (
                  <div className="budget-row" key={row.label}>
                    <span className="budget-label">{row.label === "Total Trip Cost" ? "✨ " : "• "}{row.label}</span>
                    <span className={`budget-value${row.label === "Total Trip Cost" ? " total" : ""}`}>{row.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "var(--radius-md)", fontSize: 13, color: "#34d399", fontWeight: 600, textAlign: "center", fontFamily: "var(--font-display)" }}>
                  👥 {result.budget.perPerson}
                </div>
              </div>

              {/* Follow-up Questions */}
              {result.questions && result.questions.length > 0 && (
                <div style={{ marginTop: 20, paddingBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Refine your plan</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {result.questions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSubmit(q)}
                        style={{
                          textAlign: "left",
                          background: "var(--bg-glass)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "var(--radius-md)",
                          padding: "10px 14px",
                          fontSize: 12,
                          color: "var(--text-secondary)",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          lineHeight: "1.4",
                          transition: "border-color 0.15s ease, color 0.15s ease",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--airbnb-coral)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--airbnb-coral)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; }}
                      >
                        ↩ {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="drawer-footer">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="drawer-input"
              placeholder={result ? "Ask a follow-up or try a new destination..." : `Describe your dream trip in ${country}...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              id="anywhere-door-input"
            />
            <button className="send-btn" onClick={() => handleSubmit()} disabled={!prompt.trim() || isLoading} aria-label="Generate travel plan">
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
          <p className="drawer-footer-text">
            Powered by {result?.modelUsed ? `Gemini ${result.modelUsed.replace("gemini-", "").replace("-", " ").toUpperCase()}` : "Gemini 2.5 / 3.5 Flash"} · Press Enter to generate
            {useTavily && result && !result.tavilyUsed && (
              <span style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 700, letterSpacing: "0.04em" }}>Live data off</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
