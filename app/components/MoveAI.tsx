"use client";
import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#050814",
  bgCard: "rgba(255,255,255,0.04)",
  bgCardHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  borderGlow: "rgba(99,179,237,0.4)",
  accent: "#63B3ED",
  accentAlt: "#9F7AEA",
  accentGreen: "#68D391",
  text: "#F7FAFC",
  textMuted: "#718096",
  textSub: "#A0AEC0",
};

const CITIES_DATA = [
  { city: "Berlin", country: "Germany", flag: "🇩🇪", score: 94, salary: 72000, rent: 1100, col: 2200, jobDemand: "Very High", savings: 2800, reloDifficulty: 3, reason: "Thriving tech ecosystem with booming demand for your profile. Low bureaucracy for EU candidates and an English-friendly startup scene make integration seamless." },
  { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", score: 91, salary: 78000, rent: 1600, col: 2600, jobDemand: "High", savings: 2500, reloDifficulty: 3, reason: "Top-tier international hub with exceptional English proficiency and world-class quality of life. Strong job market with many global HQs nearby." },
  { city: "Lisbon", country: "Portugal", flag: "🇵🇹", score: 88, salary: 42000, rent: 900, col: 1600, jobDemand: "High", savings: 1900, reloDifficulty: 2, reason: "Europe's fastest-growing startup ecosystem. Low cost of living, warm weather, and a massive expat-friendly community. NHR tax regime is highly favorable." },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", score: 85, salary: 92000, rent: 1900, col: 3100, jobDemand: "Very High", savings: 3200, reloDifficulty: 4, reason: "North America's tech corridor outside SV. Extremely open immigration policy and a deeply multicultural society make settling in feel immediate." },
  { city: "Barcelona", country: "Spain", flag: "🇪🇸", score: 83, salary: 48000, rent: 1200, col: 1900, jobDemand: "Medium", savings: 1400, reloDifficulty: 3, reason: "Exceptional lifestyle paired with a growing tech scene. Moderate job competition but outstanding work-life balance and climate." },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", score: 80, salary: 98000, rent: 2400, col: 3800, jobDemand: "High", savings: 2900, reloDifficulty: 4, reason: "Asia's financial and tech gateway. Tax-efficient jurisdiction, world-class infrastructure, and strategic access to Southeast Asian markets." },
];

const DEMAND_COLOR: Record<string, string> = {
  "Very High": "#68D391",
  "High": "#63B3ED",
  "Medium": "#F6AD55",
  "Low": "#FC8181",
};

function GlowOrb({ x, y, color, size = 400 }: { x: string; y: string; color: string; size?: number }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      borderRadius: "50%", background: color, filter: "blur(120px)",
      opacity: 0.15, pointerEvents: "none", zIndex: 0,
    }} />
  );
}

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size / 2) - 5;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 90 ? "#68D391" : score >= 80 ? "#63B3ED" : "#F6AD55";
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
        style={{ transform: "rotate(90deg)", transformOrigin: `${size / 2}px ${size / 2}px`, fill: color, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
        {score}
      </text>
    </svg>
  );
}

function Navbar({ setPage }: { setPage: (p: string) => void }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: `1px solid ${COLORS.border}`,
      background: "rgba(5,8,20,0.8)", backdropFilter: "blur(20px)",
      padding: "0 2rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("landing")}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #63B3ED, #9F7AEA)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>✦</div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.text, letterSpacing: "-0.5px" }}>
          Move<span style={{ color: COLORS.accent }}>AI</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {["Features", "Pricing", "Blog"].map(item => (
          <button key={item} style={{
            background: "none", border: "none", color: COLORS.textSub,
            fontSize: 14, padding: "6px 14px", cursor: "pointer", borderRadius: 6,
            transition: "color 0.2s",
          }}
            onMouseOver={e => (e.target as HTMLButtonElement).style.color = COLORS.text}
            onMouseOut={e => (e.target as HTMLButtonElement).style.color = COLORS.textSub}>
            {item}
          </button>
        ))}
        <button onClick={() => setPage("onboarding")} style={{
          background: "linear-gradient(135deg, #63B3ED, #9F7AEA)",
          border: "none", color: "#fff", fontSize: 14, fontWeight: 600,
          padding: "8px 20px", borderRadius: 8, cursor: "pointer",
          boxShadow: "0 0 20px rgba(99,179,237,0.3)",
        }}>Get Started</button>
      </div>
    </nav>
  );
}

function Landing({ setPage }: { setPage: (p: string) => void }) {
  const words = ["anywhere.", "smarter.", "fearlessly.", "with AI."];
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setFade(true); }, 300);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 2rem 4rem", textAlign: "center", overflow: "hidden" }}>
        <GlowOrb x="-100px" y="100px" color="#63B3ED" size={600} />
        <GlowOrb x="60%" y="0px" color="#9F7AEA" size={500} />
        <GlowOrb x="20%" y="60%" color="#68D391" size={400} />

        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(99,179,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            background: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.3)",
            borderRadius: 100, fontSize: 13, color: COLORS.accent, marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accentGreen, display: "inline-block", animation: "pulse 2s infinite" }} />
            AI-Powered Relocation Intelligence
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 8 }}>
            Relocate & grow your career
          </h1>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 32,
            background: "linear-gradient(135deg, #63B3ED, #9F7AEA, #68D391)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            opacity: fade ? 1 : 0, transition: "opacity 0.3s",
          }}>
            {words[wordIdx]}
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: COLORS.textSub, maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7 }}>
            MoveAI analyzes thousands of data points — salaries, rent, job markets, visa complexity — to find your perfect city to live and work.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("onboarding")} style={{
              background: "linear-gradient(135deg, #63B3ED, #9F7AEA)",
              border: "none", color: "#fff", fontSize: 16, fontWeight: 600,
              padding: "14px 36px", borderRadius: 10, cursor: "pointer",
              boxShadow: "0 0 40px rgba(99,179,237,0.4)", transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}>
              Find My City →
            </button>
            <button style={{
              background: "transparent", border: `1px solid ${COLORS.border}`,
              color: COLORS.text, fontSize: 16, padding: "14px 36px", borderRadius: 10, cursor: "pointer",
            }}>
              Watch Demo
            </button>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, marginTop: 80, display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {[["200+", "Cities Analyzed"], ["50K+", "Successful Relocations"], ["94%", "Match Accuracy"], ["3min", "Average Analysis"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, color: COLORS.text }}>{num}</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, textAlign: "center", marginBottom: 64, letterSpacing: "-1px" }}>
          Intelligence built for <span style={{ background: "linear-gradient(90deg, #63B3ED, #9F7AEA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>modern movers</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { icon: "🧠", title: "AI City Matching", desc: "Our model weighs 60+ signals — salary bands, visa ease, housing, social fit — to surface only your top matches." },
            { icon: "💼", title: "Job Market Radar", desc: "Live job demand data across industries. Know before you go whether your profession is booming or competitive." },
            { icon: "💰", title: "Financial Forecasting", desc: "Projected monthly savings after rent, taxes, and living costs. Compare cities on real purchasing power." },
            { icon: "🗺️", title: "Visa Intelligence", desc: "Relocation difficulty scores accounting for your passport, profession, and target country's immigration policies." },
            { icon: "💬", title: "AI Relocation Chat", desc: "Ask anything. Our AI assistant has deep knowledge of neighbourhoods, communities, and transition tips." },
            { icon: "📊", title: "Real-time Data", desc: "Rent indexes, salary surveys, and cost-of-living data refreshed monthly from verified global sources." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: "28px 24px", transition: "border-color 0.3s, background 0.3s, transform 0.2s",
              cursor: "default",
            }}
              onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,179,237,0.3)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.borderColor = COLORS.border; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, color: COLORS.textSub, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "6rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <GlowOrb x="30%" y="0" color="#9F7AEA" size={500} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 20 }}>
            Your next chapter starts here.
          </h2>
          <p style={{ color: COLORS.textSub, fontSize: 18, marginBottom: 40 }}>Free. 3 minutes. No credit card.</p>
          <button onClick={() => setPage("onboarding")} style={{
            background: "linear-gradient(135deg, #63B3ED, #9F7AEA)",
            border: "none", color: "#fff", fontSize: 18, fontWeight: 700,
            padding: "18px 56px", borderRadius: 12, cursor: "pointer",
            boxShadow: "0 0 60px rgba(99,179,237,0.4)",
          }}>
            Start My Free Analysis
          </button>
        </div>
      </section>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

const STEPS = [
  { id: "profession", label: "Your Profession" },
  { id: "experience", label: "Experience & Languages" },
  { id: "location", label: "Current Location" },
  { id: "financial", label: "Financial Profile" },
  { id: "preferences", label: "Work & Lifestyle" },
];

const labelStyle: React.CSSProperties = { display: "block", fontSize: 14, color: COLORS.textSub, marginBottom: 10, fontWeight: 500 };
const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "12px 16px", color: COLORS.text, fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 20, fontFamily: "inherit", transition: "border-color 0.2s" };
const chipStyle = (active: boolean): React.CSSProperties => ({
  background: active ? "linear-gradient(135deg, rgba(99,179,237,0.2), rgba(159,122,234,0.2))" : "rgba(255,255,255,0.04)",
  border: active ? "1px solid rgba(99,179,237,0.5)" : `1px solid ${COLORS.border}`,
  borderRadius: 8, padding: "8px 14px", color: active ? COLORS.text : COLORS.textSub,
  fontSize: 13, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
  whiteSpace: "nowrap",
});

interface FormState {
  profession: string;
  jobTitle: string;
  years: string;
  languages: string[];
  country: string;
  city: string;
  savings: string;
  monthlyBudget: string;
  preferredCountries: string[];
  remote: string;
  lifestyle: string[];
  reloPriority: string;
}

function Onboarding({ setPage, setProfile }: { setPage: (p: string) => void; setProfile: (p: FormState) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    profession: "", jobTitle: "",
    years: "3-5", languages: [],
    country: "", city: "",
    savings: "", monthlyBudget: "",
    preferredCountries: [], remote: "hybrid",
    lifestyle: [], reloPriority: "quality",
  });

  const update = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (k: keyof FormState, v: string) => setForm(f => {
    const arr = f[k] as string[];
    return { ...f, [k]: arr.includes(v) ? arr.filter((x: string) => x !== v) : [...arr, v] };
  });

  const stepContent = [
    <div key="s0">
      <label style={labelStyle}>What is your field?</label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
        {["Software Engineering", "Data Science", "Product Management", "Design", "Marketing", "Finance", "Healthcare", "Legal", "Education"].map(p => (
          <button key={p} onClick={() => update("profession", p)} style={chipStyle(form.profession === p)}>{p}</button>
        ))}
      </div>
      <label style={labelStyle}>Job title</label>
      <input value={form.jobTitle} onChange={e => update("jobTitle", e.target.value)} placeholder="e.g. Senior Frontend Engineer" style={inputStyle} />
    </div>,
    <div key="s1">
      <label style={labelStyle}>Years of experience</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        {["0-1", "1-3", "3-5", "5-10", "10+"].map(y => (
          <button key={y} onClick={() => update("years", y)} style={chipStyle(form.years === y)}>{y} yrs</button>
        ))}
      </div>
      <label style={labelStyle}>Languages spoken</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {["English", "Spanish", "French", "German", "Portuguese", "Mandarin", "Arabic", "Japanese", "Other"].map(l => (
          <button key={l} onClick={() => toggleArr("languages", l)} style={chipStyle(form.languages.includes(l))}>{l}</button>
        ))}
      </div>
    </div>,
    <div key="s2">
      <label style={labelStyle}>Current country</label>
      <input value={form.country} onChange={e => update("country", e.target.value)} placeholder="e.g. Brazil, India, USA..." style={inputStyle} />
      <label style={labelStyle}>Current city</label>
      <input value={form.city} onChange={e => update("city", e.target.value)} placeholder="e.g. Sao Paulo" style={{ ...inputStyle, marginBottom: 0 }} />
    </div>,
    <div key="s3">
      <label style={labelStyle}>Current savings (USD)</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        {["<$5K", "$5K-$15K", "$15K-$30K", "$30K-$60K", "$60K+"].map(s => (
          <button key={s} onClick={() => update("savings", s)} style={chipStyle(form.savings === s)}>{s}</button>
        ))}
      </div>
      <label style={labelStyle}>Monthly budget for living (USD)</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {["<$1.5K", "$1.5K-$2.5K", "$2.5K-$4K", "$4K-$6K", "$6K+"].map(b => (
          <button key={b} onClick={() => update("monthlyBudget", b)} style={chipStyle(form.monthlyBudget === b)}>{b}</button>
        ))}
      </div>
    </div>,
    <div key="s4">
      <label style={labelStyle}>Work arrangement</label>
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {[["remote", "Remote"], ["hybrid", "Hybrid"], ["onsite", "On-site"]].map(([v, l]) => (
          <button key={v} onClick={() => update("remote", v)} style={{ ...chipStyle(form.remote === v), flex: 1 }}>{l}</button>
        ))}
      </div>
      <label style={labelStyle}>Lifestyle priorities</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        {["Nightlife", "Nature", "Safety", "Diversity", "Affordable", "Weather", "Culture", "Beach", "Food scene"].map(l => (
          <button key={l} onClick={() => toggleArr("lifestyle", l)} style={chipStyle(form.lifestyle.includes(l))}>{l}</button>
        ))}
      </div>
      <label style={labelStyle}>Preferred regions</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {["Western Europe", "Eastern Europe", "North America", "Latin America", "Southeast Asia", "Middle East", "Oceania"].map(r => (
          <button key={r} onClick={() => toggleArr("preferredCountries", r)} style={chipStyle(form.preferredCountries.includes(r))}>{r}</button>
        ))}
      </div>
    </div>,
  ];

  const canNext = () => {
    if (step === 0) return form.profession;
    if (step === 1) return form.years && form.languages.length > 0;
    if (step === 2) return form.country;
    if (step === 3) return form.savings;
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else { setProfile(form); setPage("dashboard"); }
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 1rem 2rem", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <GlowOrb x="-200px" y="-100px" color="#63B3ED" />
      <GlowOrb x="70%" y="60%" color="#9F7AEA" />

      <div style={{ width: "100%", maxWidth: 560, position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{
                width: "18%", height: 3, borderRadius: 2,
                background: i <= step ? "linear-gradient(90deg, #63B3ED, #9F7AEA)" : "rgba(255,255,255,0.1)",
                transition: "background 0.4s",
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>{STEPS[step].label}</span>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>{step + 1} / {STEPS.length}</span>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "2rem", backdropFilter: "blur(20px)" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 8, color: COLORS.text }}>{STEPS[step].label}</h2>
          <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 28 }}>Help our AI understand your profile for personalized city matches.</p>
          {stepContent[step]}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{
              flex: 1, background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.border}`,
              color: COLORS.text, padding: "14px", borderRadius: 10, cursor: "pointer", fontSize: 15,
            }}>Back</button>
          )}
          <button onClick={handleNext} disabled={!canNext()} style={{
            flex: 2, background: canNext() ? "linear-gradient(135deg, #63B3ED, #9F7AEA)" : "rgba(255,255,255,0.1)",
            border: "none", color: canNext() ? "#fff" : COLORS.textMuted,
            padding: "14px", borderRadius: 10, cursor: canNext() ? "pointer" : "default",
            fontSize: 15, fontWeight: 600, transition: "all 0.3s",
          }}>
            {step === STEPS.length - 1 ? "Analyze My Profile" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ profile, setPage }: { profile: FormState | null; setPage: (p: string) => void }) {
  const [activeCity, setActiveCity] = useState<typeof CITIES_DATA[0] | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: `Hi! I have analyzed your profile as a ${profile?.profession || "professional"} with ${profile?.years || "several"} years experience. I found 6 excellent city matches for you. Want me to dive deep on any of them?` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(m => [...m, { role: "user", text: userMsg }]);
    setChatLoading(true);
    try {
      const context = `You are MoveAI's relocation assistant. The user is a ${profile?.profession} with ${profile?.years} years experience from ${profile?.country}, speaking ${(profile?.languages || []).join(", ")}. They prefer ${profile?.remote} work and have savings ${profile?.savings}. They value: ${(profile?.lifestyle || []).join(", ")}. Top city matches: ${CITIES_DATA.slice(0, 3).map(c => `${c.city} (score ${c.score}, salary $${c.salary}, rent $${c.rent})`).join("; ")}. Be concise, specific, and helpful.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: context,
          messages: [
            ...chatMessages.filter((m, idx) => m.role !== "ai" || idx > 0).map(m => ({
              role: m.role === "ai" ? "assistant" : "user", content: m.text
            })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.map((c: { text?: string }) => c.text || "").join("") || "I am here to help with your relocation questions!";
      setChatMessages(m => [...m, { role: "ai", text: reply }]);
    } catch {
      setChatMessages(m => [...m, { role: "ai", text: "I am having trouble connecting. Please try again in a moment." }]);
    }
    setChatLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", color: COLORS.text, paddingTop: 64 }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <GlowOrb x="-100px" y="100px" color="#9F7AEA" size={400} />
      <GlowOrb x="80%" y="300px" color="#63B3ED" size={350} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1.5rem 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", gap: 8, alignItems: "center", background: "rgba(104,211,145,0.1)", border: "1px solid rgba(104,211,145,0.3)", borderRadius: 100, padding: "4px 14px", fontSize: 12, color: "#68D391", marginBottom: 12 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#68D391", display: "inline-block" }} />
              AI Analysis Complete
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>Your Top City Matches</h1>
            <p style={{ color: COLORS.textSub, marginTop: 6, fontSize: 15 }}>
              Based on your {profile?.profession} profile • {profile?.years} years exp • from {profile?.country}
            </p>
          </div>
          <button onClick={() => setChatOpen(o => !o)} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, rgba(99,179,237,0.15), rgba(159,122,234,0.15))",
            border: "1px solid rgba(99,179,237,0.3)", borderRadius: 10, padding: "10px 20px",
            color: COLORS.accent, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            AI Assistant
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Cities Analyzed", value: "200+", icon: "🌍" },
            { label: "Best Match Score", value: "94/100", icon: "⭐" },
            { label: "Avg. Monthly Savings", value: "$2,450", icon: "💰" },
            { label: "Top Region", value: "W. Europe", icon: "🗺️" },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>{value}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
          {CITIES_DATA.map((city, i) => (
            <div key={city.city} onClick={() => setActiveCity(activeCity?.city === city.city ? null : city)}
              style={{
                background: activeCity?.city === city.city ? "rgba(99,179,237,0.07)" : COLORS.bgCard,
                border: `1px solid ${activeCity?.city === city.city ? "rgba(99,179,237,0.4)" : COLORS.border}`,
                borderRadius: 16, padding: "20px 24px", cursor: "pointer",
                transition: "all 0.3s", opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(20px)",
                transitionDelay: `${i * 80}ms`,
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 180 }}>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, width: 24, textAlign: "center" }}>#{i + 1}</div>
                  <div style={{ fontSize: 32 }}>{city.flag}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{city.city}</div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted }}>{city.country}</div>
                  </div>
                </div>
                <ScoreRing score={city.score} />
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap", flex: 1, justifyContent: "flex-end" }}>
                  {[
                    { label: "Salary", value: `$${(city.salary / 1000).toFixed(0)}K/yr` },
                    { label: "Rent", value: `$${city.rent}/mo` },
                    { label: "Savings", value: `$${city.savings}/mo`, highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: highlight ? COLORS.accentGreen : COLORS.text }}>{value}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>{label}</div>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{
                      background: `${DEMAND_COLOR[city.jobDemand]}18`,
                      border: `1px solid ${DEMAND_COLOR[city.jobDemand]}40`,
                      color: DEMAND_COLOR[city.jobDemand],
                      borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 600,
                    }}>{city.jobDemand} Demand</span>
                  </div>
                </div>
              </div>

              {activeCity?.city === city.city && (
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
                    {[
                      { label: "Avg. Salary", value: `$${city.salary.toLocaleString()}/yr` },
                      { label: "Monthly Rent", value: `$${city.rent}` },
                      { label: "Cost of Living", value: `$${city.col}/mo` },
                      { label: "Monthly Savings", value: `$${city.savings}`, color: COLORS.accentGreen },
                      { label: "Relo Difficulty", value: `${city.reloDifficulty}/10`, color: city.reloDifficulty <= 3 ? COLORS.accentGreen : city.reloDifficulty <= 6 ? "#F6AD55" : "#FC8181" },
                      { label: "Job Demand", value: city.jobDemand, color: DEMAND_COLOR[city.jobDemand] },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: color || COLORS.text }}>{value}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(99,179,237,0.06)", border: "1px solid rgba(99,179,237,0.15)", borderRadius: 10, padding: "14px 18px" }}>
                    <div style={{ fontSize: 12, color: COLORS.accent, fontWeight: 600, marginBottom: 6 }}>AI Analysis</div>
                    <p style={{ fontSize: 14, color: COLORS.textSub, margin: 0, lineHeight: 1.7 }}>{city.reason}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {chatOpen && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, width: "min(420px, calc(100vw - 48px))",
          background: "rgba(10,14,30,0.95)", backdropFilter: "blur(30px)",
          border: "1px solid rgba(99,179,237,0.3)",
          borderRadius: 20, display: "flex", flexDirection: "column",
          height: 520, zIndex: 200,
          boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
        }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #63B3ED, #9F7AEA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>MoveAI Assistant</div>
                <div style={{ fontSize: 11, color: COLORS.accentGreen }}>Online</div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 18, cursor: "pointer" }}>×</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%", padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #63B3ED, #9F7AEA)" : "rgba(255,255,255,0.06)",
                  border: msg.role === "ai" ? `1px solid ${COLORS.border}` : "none",
                  fontSize: 13, lineHeight: 1.6, color: COLORS.text,
                }}>{msg.text}</div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: "flex", gap: 4, padding: "10px 14px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent, animation: `bounce 1s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.border}`, display: "flex", gap: 8 }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendChat()}
              placeholder="Ask about cities, visas, salaries..."
              style={{ ...inputStyle, margin: 0, flex: 1, fontSize: 13, padding: "10px 14px" }}
            />
            <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} style={{
              background: "linear-gradient(135deg, #63B3ED, #9F7AEA)", border: "none",
              borderRadius: 8, padding: "10px 16px", color: "#fff", cursor: "pointer", fontSize: 16,
              opacity: chatLoading || !chatInput.trim() ? 0.5 : 1,
            }}>→</button>
          </div>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }`}</style>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("landing");
  const [profile, setProfile] = useState<FormState | null>(null);

  const handleSetPage = (p: string) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <div>
      <Navbar setPage={handleSetPage} />
      {page === "landing" && <Landing setPage={handleSetPage} />}
      {page === "onboarding" && <Onboarding setPage={handleSetPage} setProfile={setProfile} />}
      {page === "dashboard" && <Dashboard profile={profile} setPage={handleSetPage} />}
    </div>
  );
}
