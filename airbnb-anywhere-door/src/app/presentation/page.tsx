"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DeckPage() {
  const { theme, toggleTheme } = useTheme();

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="deck-page">
      {/* Navigation */}
      <nav className="deck-nav">
        <div className="deck-logo-container">
          <Link href="/" className="deck-back-link">
            <ArrowLeft className="deck-back-icon" size={15} />
            <span>App</span>
          </Link>
          <div className="deck-logo">airbnb odyssey ✕ AI Strategy</div>
        </div>
        <div className="deck-controls">
          <span className="deck-counter">9 Slides</span>

          <button onClick={toggleTheme} className="deck-btn deck-theme-btn" title="Toggle Theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={handlePrint}
            className="deck-btn"
            id="deck-print-btn"
          >
            <Printer size={15} style={{ marginRight: 6 }} />
            Export PDF
          </button>
        </div>
      </nav>

      <div className="slides-wrapper" id="slides-container">
        {/* ── SLIDE 1: VISION ── */}
        <section className="slide" id="slide-1">
          <div
            className="slide-bg-orb"
            style={{ width: 600, height: 600, background: "linear-gradient(135deg, var(--airbnb-coral), #ff6b35)", top: -250, right: -250 }}
          />
          <div className="slide-content">
            <div className="slide-tag">01 / Vision</div>
            <h1>
              Introducing <span className="highlight">Airbnb Odyssey.</span>
            </h1>
            <p>
              Reimagining the search-to-booking journey through localized GenAI integration, client-side IndexedDB persistence, and custom trust verification mechanics. A premium strategy outlining the integration of Doraemon&apos;s Anywhere Door.
            </p>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-value">Gemini</div>
                <div className="stat-label">Fast, structured parsing</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Local DB</div>
                <div className="stat-label">Offline-ready context</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Passport</div>
                <div className="stat-label">Frictionless trust</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0-Friction</div>
                <div className="stat-label">No search forms required</div>
              </div>
            </div>
          </div>
          <div className="slide-number">01 / 09</div>
        </section>

        {/* ── SLIDE 2: PROBLEM ── */}
        <section className="slide" id="slide-2">
          <div
            className="slide-bg-orb"
            style={{ width: 500, height: 500, background: "linear-gradient(135deg, var(--airbnb-coral), #ff385c)", top: -200, left: -200 }}
          />
          <div className="slide-content">
            <div className="slide-tag">02 / Problem</div>
            <h2>
              Travel planning is <span className="highlight">broken.</span>
            </h2>
            <p>
              The average Airbnb user spends <strong style={{ color: "var(--text-primary)" }}>4.2 hours</strong> across multiple sessions comparing listings, reading hundreds of reviews, cross-referencing dates, and coordinating budgets - before making a single booking.
            </p>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-value">4.2h</div>
                <div className="stat-label">Avg. time to book</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">68%</div>
                <div className="stat-label">Users abandon mid-search</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">$9.6B</div>
                <div className="stat-label">Lost revenue from drop-offs</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">23+</div>
                <div className="stat-label">Filter options overwhelm users</div>
              </div>
            </div>
          </div>
          <div className="slide-number">02 / 09</div>
        </section>

        {/* ── SLIDE 3: WHY GENAI ── */}
        <section className="slide" id="slide-3">
          <div
            className="slide-bg-orb"
            style={{ width: 400, height: 400, background: "linear-gradient(135deg, #6366f1, #a855f7)", bottom: -150, left: -100 }}
          />
          <div className="slide-content">
            <div className="slide-tag">03 / Why GenAI</div>
            <h2>The Doraemon Principle</h2>
            <p>
              Doraemon&apos;s gadgets don&apos;t ask you to fill out forms - they understand your desire and deliver the outcome instantly. Generative AI enables the same magic: context-aware understanding that removes all friction between intent and outcome.
            </p>
            <div className="slide-grid">
              <div className="slide-card">
                <div className="slide-card-icon">🧠</div>
                <div className="slide-card-title">Context Understanding</div>
                <div className="slide-card-text">
                  LLMs parse natural language intent, group dynamics, budget constraints, and travel style in a single prompt.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">⚡</div>
                <div className="slide-card-title">Instant Synthesis</div>
                <div className="slide-card-text">
                  Simultaneously curate listings, generate itineraries, and calculate cost splits - in under 3 seconds.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🎯</div>
                <div className="slide-card-title">Zero Friction</div>
                <div className="slide-card-text">
                  No filters, no sorting, no comparison paralysis. One input → perfect result. Traditional ML cannot do this.
                </div>
              </div>
            </div>
          </div>
          <div className="slide-number">03 / 09</div>
        </section>

        {/* ── SLIDE 4: USER SEGMENTS ── */}
        <section className="slide" id="slide-4">
          <div
            className="slide-bg-orb"
            style={{ width: 350, height: 350, background: "linear-gradient(135deg, #f59e0b, #eab308)", top: -100, left: -100 }}
          />
          <div className="slide-content">
            <div className="slide-tag">04 / User Segments</div>
            <h2>Who benefits <span className="highlight">most?</span></h2>
            <p>
              Three high-value segments with acute pain points that the Airbnb Odyssey directly resolves - driving both booking conversion and revenue per trip.
            </p>
            <div className="slide-grid">
              <div className="slide-card">
                <div className="slide-card-icon">👨‍👩‍👧‍👦</div>
                <div className="slide-card-title">Group Travelers</div>
                <div className="slide-card-text">
                  Coordinating 4–10 people across preferences, budgets, and schedules. AI generates consensus-optimized plans instantly.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">💼</div>
                <div className="slide-card-title">Business Nomads</div>
                <div className="slide-card-text">
                  Professionals needing fast, reliable bookings with workspace requirements. AI pre-qualifies listings against their non-negotiables.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🌍</div>
                <div className="slide-card-title">First-Time Internationals</div>
                <div className="slide-card-text">
                  Unfamiliar with local areas, visa requirements, and safety. AI acts as a local expert, guiding every decision.
                </div>
              </div>
            </div>
          </div>
          <div className="slide-number">04 / 09</div>
        </section>

        {/* ── SLIDE 5: THE EXPERIENCE ── */}
        <section className="slide" id="slide-5">
          <div
            className="slide-bg-orb"
            style={{ width: 600, height: 300, background: "linear-gradient(135deg, var(--airbnb-coral), #ff7e40)", bottom: -100, right: -200 }}
          />
          <div className="slide-content">
            <div className="slide-tag">05 / The Experience</div>
            <h2>Doraemon&apos;s Anywhere Door</h2>
            <p>
              A floating AI companion embedded directly in the Airbnb app. One prompt replaces the entire search-filter-compare-book journey. Powered by Gemini 2.5 Flash for speed, multimodal understanding, and structured output generation.
            </p>
            <div className="slide-grid" style={{ marginTop: 28 }}>
              <div className="slide-card">
                <div className="slide-card-icon">🗣️</div>
                <div className="slide-card-title">Natural Language Input</div>
                <div className="slide-card-text">&quot;Beach house in Goa for 6 people, July, ~$200/night, needs a pool.&quot;</div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🏡</div>
                <div className="slide-card-title">Curated Listings</div>
                <div className="slide-card-text">Top 3 AI-ranked properties with condensed review synthesis and key highlights.</div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🗓️</div>
                <div className="slide-card-title">Auto Itinerary</div>
                <div className="slide-card-text">Day-by-day activity plan tailored to group size, interests, and local events.</div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🧾</div>
                <div className="slide-card-title">Cost Splitting</div>
                <div className="slide-card-text">Full trip budget breakdown with per-person split calculated automatically.</div>
              </div>
            </div>
          </div>
          <div className="slide-number">05 / 09</div>
        </section>

        {/* ── SLIDE 6: LOCAL-FIRST ARCHITECTURE ── */}
        <section className="slide" id="slide-6">
          <div
            className="slide-bg-orb"
            style={{ width: 450, height: 450, background: "linear-gradient(135deg, #10b981, #3b82f6)", top: -150, left: -150 }}
          />
          <div className="slide-content">
            <div className="slide-tag">06 / Engineering</div>
            <h2>Local-First &amp; Privacy-Centric</h2>
            <p>
              We prioritize user context retention and privacy. Airbnb Odyssey persists critical user states locally using browser-native databases, bypassing expensive server syncs and offline outages.
            </p>
            <div className="slide-grid">
              <div className="slide-card">
                <div className="slide-card-icon">📦</div>
                <div className="slide-card-title">IndexedDB Engine</div>
                <div className="slide-card-text">
                  Provides a relational-like transactional storage layer inside the browser for profile details, wishlists, and travel itineraries.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🔄</div>
                <div className="slide-card-title">Zero Session Losses</div>
                <div className="slide-card-text">
                  Generated AI plans are preserved across hard-refreshes, keeping the user in their active planning state.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🛡️</div>
                <div className="slide-card-title">Privacy Sandbox</div>
                <div className="slide-card-text">
                  Sensitive travel notes and itinerary updates remain stored in the user&apos;s sandbox until booking conversion.
                </div>
              </div>
            </div>
          </div>
          <div className="slide-number">06 / 09</div>
        </section>

        {/* ── SLIDE 7: VERIFICATION & PASSPORT UI ── */}
        <section className="slide" id="slide-7">
          <div
            className="slide-bg-orb"
            style={{ width: 400, height: 400, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", bottom: -150, right: -100 }}
          />
          <div className="slide-content">
            <div className="slide-tag">07 / Trust &amp; UX</div>
            <h2>Verified Passport &amp; Personalization</h2>
            <p>
              Trust is the foundation of Airbnb. We introduce a Verified Guest Passport component integrated with localized preferences and adaptive theme customizers.
            </p>
            <div className="slide-grid">
              <div className="slide-card">
                <div className="slide-card-icon">🪪</div>
                <div className="slide-card-title">Verified Passport UI</div>
                <div className="slide-card-text">
                  A premium, custom-styled card displaying verification badges, member history, and editable traveler metadata.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🎨</div>
                <div className="slide-card-title">Theme-Aware Aesthetics</div>
                <div className="slide-card-text">
                  Fluid, hardware-accelerated transitions supporting Light, Dark, and System modes seamlessly.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🇮🇳</div>
                <div className="slide-card-title">Localised Customization</div>
                <div className="slide-card-text">
                  Configured defaults targeting major Indian regions (e.g. Roorkee) with multi-currency splits.
                </div>
              </div>
            </div>
          </div>
          <div className="slide-number">07 / 09</div>
        </section>

        {/* ── SLIDE 8: SUCCESS METRICS ── */}
        <section className="slide" id="slide-8">
          <div
            className="slide-bg-orb"
            style={{ width: 400, height: 400, background: "linear-gradient(135deg, #10b981, #059669)", top: -150, right: -100 }}
          />
          <div className="slide-content">
            <div className="slide-tag">08 / Success Metrics</div>
            <h2>Measuring <span className="highlight">impact</span></h2>
            <p>
              We define success through measurable outcomes tied directly to Airbnb&apos;s core revenue drivers and user satisfaction scores.
            </p>
            <div className="slide-grid">
              <div className="slide-card">
                <div className="slide-card-icon">📈</div>
                <div className="slide-card-title">Booking Conversion Rate</div>
                <div className="slide-card-text">
                  <strong style={{ color: "#10b981" }}>Target: +22%</strong> for sessions using Airbnb Odyssey vs. standard search. Measured via A/B test over 90 days.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">💳</div>
                <div className="slide-card-title">Average Booking Value</div>
                <div className="slide-card-text">
                  <strong style={{ color: "#10b981" }}>Target: +18%</strong> increase in nightly rate booked. AI recommendations skew premium.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">⭐</div>
                <div className="slide-card-title">Net Promoter Score</div>
                <div className="slide-card-text">
                  <strong style={{ color: "#10b981" }}>Target: +15 NPS points</strong> from users who complete a trip planned via Airbnb Odyssey.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">⏱️</div>
                <div className="slide-card-title">Time-to-Book</div>
                <div className="slide-card-text">
                  <strong style={{ color: "#10b981" }}>Target: &lt;8 minutes</strong> from app open to confirmed booking for Airbnb Odyssey users.
                </div>
              </div>
            </div>
          </div>
          <div className="slide-number">08 / 09</div>
        </section>

        {/* ── SLIDE 9: PITFALLS ── */}
        <section className="slide" id="slide-9">
          <div
            className="slide-bg-orb"
            style={{ width: 450, height: 450, background: "linear-gradient(135deg, #ef4444, #f97316)", bottom: -200, left: -150 }}
          />
          <div className="slide-content">
            <div className="slide-tag">09 / Pitfalls &amp; Mitigations</div>
            <h2>
              What could go <span className="highlight">wrong?</span>
            </h2>
            <p>
              Proactive risk management is essential for a production-ready AI feature. We have identified the four critical failure modes and their mitigations.
            </p>
            <div className="slide-grid" style={{ marginTop: 28 }}>
              <div className="slide-card">
                <div className="slide-card-icon">🌀</div>
                <div className="slide-card-title">Hallucinated Listings</div>
                <div className="slide-card-text">
                  AI invents properties. <strong style={{ color: "var(--airbnb-coral)" }}>Fix:</strong> All listings are validated against live Airbnb inventory before display.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">🔒</div>
                <div className="slide-card-title">User Privacy</div>
                <div className="slide-card-text">
                  Travel prompts contain personal preference data. <strong style={{ color: "var(--airbnb-coral)" }}>Fix:</strong> Secure local storage via IndexedDB; server-side APIs do not train on customer prompts.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">⚡</div>
                <div className="slide-card-title">Latency</div>
                <div className="slide-card-text">
                  LLM calls can be slow. <strong style={{ color: "var(--airbnb-coral)" }}>Fix:</strong> Gemini Flash + streaming progressive UI rendering under 2 seconds.
                </div>
              </div>
              <div className="slide-card">
                <div className="slide-card-icon">💸</div>
                <div className="slide-card-title">API Cost at Scale</div>
                <div className="slide-card-text">
                  High-volume calls are expensive. <strong style={{ color: "var(--airbnb-coral)" }}>Fix:</strong> Flash models + semantic query caching + rate limits.
                </div>
              </div>
            </div>
          </div>
          <div className="slide-number">09 / 09</div>
        </section>
      </div>

    </div>
  );
}
