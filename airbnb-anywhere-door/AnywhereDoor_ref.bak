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
          tavilyApiKey
        }),
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out after 15 seconds. Please check your internet connection or Tavily Key.")), 15000)
      );

      const res = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || `HTTP error! Status: ${res.status}`);
      }

      setSteps(THINKING_STEPS.map((label) => ({ label, status: "done" })));
      await new Promise((r) => setTimeout(r, 400));
      
      // Construct AI response message
      const assistantMsg = { role: "model", parts: [{ text: JSON.stringify(data) }] };
      const finalHistory = [...updatedHistory, assistantMsg];
      
      setMessages(finalHistory);
      setResult(data);
      if (onPlanGenerated) {
        onPlanGenerated(data, finalHistory);
      }
    } catch (err: any) {
      console.warn("API call failed or timed out:", err?.message || err);
      setError(err?.message || "Failed to compile your travel plan. Please check your network connection.");
      setSteps(THINKING_STEPS.map((label) => ({ label, status: "error" })));
      
      // Rollback user input on failure
      setMessages(messages);
      setPrompt(finalPrompt);
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
      <div className={`drawer${isOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Anywhere Door AI Travel Planner">
        
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <div className="drawer-title-icon" style={{ background: "var(--airbnb-coral-glow)", color: "var(--airbnb-coral)" }}>
              <Sparkles size={18} fill="currentColor" />
            </div>
            <div className="drawer-title-text">
              <h2>Anywhere Door</h2>
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
                  <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 600 }}>
                    ⚠️ Provide your key. Defaults to server key if configured.
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

                if (isUser) {
                  return (
                    <div key={idx} className="chat-bubble user" style={{
                      alignSelf: "flex-end",
                      background: "var(--airbnb-coral)",
                      color: "#fff",
                      padding: "10px 16px",
                      borderRadius: "18px 18px 2px 18px",
                      fontSize: 13,
                      maxWidth: "80%",
                      lineHeight: "1.4",
                      fontFamily: "var(--font-body)"
                    }}>
                      {textContent}
                    </div>
                  );
                } else {
                  return (
                    <div key={idx} className="chat-bubble assistant" style={{
                      alignSelf: "flex-start",
                      background: "var(--bg-glass)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                      padding: "10px 16px",
                      borderRadius: "18px 18px 18px 2px",
                      fontSize: 13,
                      maxWidth: "85%",
                      lineHeight: "1.4",
                      fontFamily: "var(--font-body)"
                    }}>
                      {textContent}
                    </div>
                  );
                }
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
