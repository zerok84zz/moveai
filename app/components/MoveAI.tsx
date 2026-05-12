"use client";

import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#050814",
  bgCard: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  accent: "#63B3ED",
  accentAlt: "#9F7AEA",
  accentGreen: "#68D391",
  text: "#F7FAFC",
  textMuted: "#718096",
  textSub: "#A0AEC0",
};

interface CityData {
  city: string;
  country: string;
  flag: string;
  score: number;
  salary: number;
  rent: number;
  col: number;
  jobDemand: string;
  savings: number;
  reloDifficulty: number;
  reason: string;
  iata: string;
  spotahome: string;
  indeed: string;
  linkedin: string;
}

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

interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  salary_min?: number;
  salary_max?: number;
  redirect_url: string;
}

const CITIES_DATA: CityData[] = [
  {
    city: "Berlin",
    country: "Germany",
    flag: "🇩🇪",
    score: 94,
    salary: 72000,
    rent: 1100,
    col: 1900,
    jobDemand: "Very High",
    savings: 2400,
    reloDifficulty: 4,
    reason: "Excellent tech ecosystem and startup culture.",
    iata: "BER",
    spotahome: "berlin",
    indeed: "Berlin",
    linkedin: "Berlin",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    flag: "🇳🇱",
    score: 91,
    salary: 78000,
    rent: 1600,
    col: 2400,
    jobDemand: "High",
    savings: 2600,
    reloDifficulty: 5,
    reason: "Strong salaries with excellent work-life balance.",
    iata: "AMS",
    spotahome: "amsterdam",
    indeed: "Amsterdam",
    linkedin: "Amsterdam",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    flag: "🇵🇹",
    score: 88,
    salary: 42000,
    rent: 900,
    col: 1500,
    jobDemand: "High",
    savings: 1400,
    reloDifficulty: 3,
    reason: "Affordable lifestyle and remote-work friendly.",
    iata: "LIS",
    spotahome: "lisbon",
    indeed: "Lisbon",
    linkedin: "Lisbon",
  },
  {
    city: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    score: 85,
    salary: 92000,
    rent: 1900,
    col: 2900,
    jobDemand: "Very High",
    savings: 3200,
    reloDifficulty: 6,
    reason: "Massive international tech market.",
    iata: "YYZ",
    spotahome: "toronto",
    indeed: "Toronto",
    linkedin: "Toronto",
  },
  {
    city: "Barcelona",
    country: "Spain",
    flag: "🇪🇸",
    score: 83,
    salary: 48000,
    rent: 1200,
    col: 1800,
    jobDemand: "Medium",
    savings: 1300,
    reloDifficulty: 3,
    reason: "Amazing lifestyle and weather.",
    iata: "BCN",
    spotahome: "barcelona",
    indeed: "Barcelona",
    linkedin: "Barcelona",
  },
  {
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    score: 80,
    salary: 98000,
    rent: 2400,
    col: 3400,
    jobDemand: "Very High",
    savings: 4000,
    reloDifficulty: 7,
    reason: "One of the strongest global tech hubs.",
    iata: "SIN",
    spotahome: "singapore",
    indeed: "Singapore",
    linkedin: "Singapore",
  },
];

const DEMAND_COLOR: Record<string, string> = {
  "Very High": "#68D391",
  High: "#63B3ED",
  Medium: "#F6AD55",
  Low: "#FC8181",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 14,
  color: COLORS.textSub,
  marginBottom: 10,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "14px 16px",
  color: COLORS.text,
  marginBottom: 24,
  outline: "none",
};

const chipStyle = (active: boolean): React.CSSProperties => ({
  background: active
    ? "linear-gradient(135deg, rgba(99,179,237,0.2), rgba(159,122,234,0.2))"
    : "rgba(255,255,255,0.03)",
  border: active
    ? "1px solid rgba(99,179,237,0.5)"
    : "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "10px 14px",
  color: active ? COLORS.text : COLORS.textSub,
  fontSize: 13,
  cursor: "pointer",
  transition: "0.2s",
});

function GlowOrb({
  x,
  y,
  color,
  size = 400,
}: {
  x: string;
  y: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(120px)",
        opacity: 0.18,
      }}
    />
  );
}

function ScoreRing({
  score,
  size = 60,
}: {
  score: number;
  size?: number;
}) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  const color =
    score >= 90
      ? "#68D391"
      : score >= 80
      ? "#63B3ED"
      : "#F6AD55";

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="4"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />

      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          transform: "rotate(90deg)",
          transformOrigin: "center",
          fill: COLORS.text,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {score}
      </text>
    </svg>
  );
}

function Navbar({
  setPage,
}: {
  setPage: (p: string) => void;
}) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(14px)",
        background: "rgba(5,8,20,0.75)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", gap: 12, alignItems: "center" }}
          onClick={() => setPage("landing")}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background:
                "linear-gradient(135deg,#63B3ED,#9F7AEA)",
            }}
          />

          <span
            style={{
              color: COLORS.text,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            MoveAI
          </span>
        </div>

        <button
          onClick={() => setPage("onboarding")}
          style={{
            background:
              "linear-gradient(135deg,#63B3ED,#9F7AEA)",
            border: "none",
            padding: "12px 18px",
            borderRadius: 10,
            color: "white",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

function Landing({
  setPage,
}: {
  setPage: (p: string) => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      <GlowOrb x="-100px" y="100px" color="#63B3ED" size={600} />
      <GlowOrb x="60%" y="0px" color="#9F7AEA" size={500} />

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(3rem,8vw,6rem)",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Relocate
          <br />
          smarter.
        </h1>

        <p
          style={{
            maxWidth: 700,
            color: COLORS.textSub,
            fontSize: 20,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          AI-powered relocation intelligence for global
          professionals.
        </p>

        <button
          onClick={() => setPage("onboarding")}
          style={{
            background:
              "linear-gradient(135deg,#63B3ED,#9F7AEA)",
            border: "none",
            padding: "18px 30px",
            borderRadius: 14,
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Start Analysis
        </button>
      </section>
    </div>
  );
}

function Onboarding({
  setPage,
  setProfile,
}: {
  setPage: (p: string) => void;
  setProfile: (p: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>({
    profession: "",
    jobTitle: "",
    years: "3-5",
    languages: [],
    country: "",
    city: "",
    savings: "",
    monthlyBudget: "",
    preferredCountries: [],
    remote: "",
    lifestyle: [],
    reloPriority: "",
  });

  const update = (k: keyof FormState, v: any) => {
    setForm((f) => ({
      ...f,
      [k]: v,
    }));
  };

  const handleContinue = () => {
    setProfile(form);
    setPage("dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
          padding: 40,
        }}
      >
        <h2
          style={{
            fontSize: 34,
            marginBottom: 30,
          }}
        >
          Build your relocation profile
        </h2>

        <label style={labelStyle}>Profession</label>

        <input
          value={form.profession}
          onChange={(e) =>
            update("profession", e.target.value)
          }
          style={inputStyle}
          placeholder="Software Engineer"
        />

        <label style={labelStyle}>Current City</label>

        <input
          value={form.city}
          onChange={(e) =>
            update("city", e.target.value)
          }
          style={inputStyle}
          placeholder="Madrid"
        />

        <label style={labelStyle}>Current Country</label>

        <input
          value={form.country}
          onChange={(e) =>
            update("country", e.target.value)
          }
          style={inputStyle}
          placeholder="Spain"
        />

        <button
          onClick={handleContinue}
          style={{
            width: "100%",
            background:
              "linear-gradient(135deg,#63B3ED,#9F7AEA)",
            border: "none",
            padding: "16px",
            borderRadius: 12,
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Analyze My Profile
        </button>
      </div>
    </div>
  );
}

function Dashboard({
  profile,
}: {
  profile: FormState | null;
}) {
  const [activeCity, setActiveCity] =
    useState<CityData | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        padding: "120px 24px 60px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            marginBottom: 10,
          }}
        >
          Your Relocation Matches
        </h1>

        <p
          style={{
            color: COLORS.textSub,
            marginBottom: 40,
          }}
        >
          Based on your profile as a{" "}
          {profile?.profession}
        </p>

        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {CITIES_DATA.map((city) => (
            <div
              key={city.city}
              onClick={() =>
                setActiveCity(
                  activeCity?.city === city.city
                    ? null
                    : city
                )
              }
              style={{
                background: COLORS.bgCard,
                border:
                  activeCity?.city === city.city
                    ? "1px solid rgba(99,179,237,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 24,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 42 }}>
                    {city.flag}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                      }}
                    >
                      {city.city}
                    </div>

                    <div
                      style={{
                        color: COLORS.textSub,
                      }}
                    >
                      {city.country}
                    </div>
                  </div>
                </div>

                <ScoreRing score={city.score} />
              </div>

              {activeCity?.city === city.city && (
                <div
                  style={{
                    marginTop: 30,
                    borderTop:
                      "1px solid rgba(255,255,255,0.08)",
                    paddingTop: 24,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(180px,1fr))",
                      gap: 18,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 700,
                        }}
                      >
                        $
                        {city.salary.toLocaleString()}
                      </div>

                      <div
                        style={{
                          color: COLORS.textMuted,
                          fontSize: 13,
                        }}
                      >
                        Average Salary
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 700,
                        }}
                      >
                        ${city.rent}
                      </div>

                      <div
                        style={{
                          color: COLORS.textMuted,
                          fontSize: 13,
                        }}
                      >
                        Monthly Rent
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 700,
                          color:
                            DEMAND_COLOR[
                              city.jobDemand
                            ],
                        }}
                      >
                        {city.jobDemand}
                      </div>

                      <div
                        style={{
                          color: COLORS.textMuted,
                          fontSize: 13,
                        }}
                      >
                        Job Demand
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      marginTop: 24,
                      color: COLORS.textSub,
                      lineHeight: 1.8,
                    }}
                  >
                    {city.reason}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("landing");

  const [profile, setProfile] =
    useState<FormState | null>(null);

  const handleSetPage = (p: string) => {
    setPage(p);

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <Navbar setPage={handleSetPage} />

      {page === "landing" && (
        <Landing setPage={handleSetPage} />
      )}

      {page === "onboarding" && (
        <Onboarding
          setPage={handleSetPage}
          setProfile={setProfile}
        />
      )}

      {page === "dashboard" && (
        <Dashboard profile={profile} />
      )}
    </div>
  );
}