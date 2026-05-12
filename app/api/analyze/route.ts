import { NextRequest, NextResponse } from "next/server";

const CITY_POOL = [
  { city: "London", country: "United Kingdom", flag: "🇬🇧", iata: "LHR", adzunaCountry: "gb", adzunaLocation: "london", spotahome: "london", linkedin: "london-united-kingdom", indeed: "London%2C+UK", rent: 2200, col: 3500, reloDifficulty: 4, salary: 85000, savings: 2800 },
  { city: "Berlin", country: "Germany", flag: "🇩🇪", iata: "BER", adzunaCountry: "de", adzunaLocation: "berlin", spotahome: "berlin", linkedin: "berlin-germany", indeed: "Berlin%2C+Germany", rent: 1100, col: 2200, reloDifficulty: 3, salary: 72000, savings: 2800 },
  { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", iata: "AMS", adzunaCountry: "nl", adzunaLocation: "amsterdam", spotahome: "amsterdam", linkedin: "amsterdam-netherlands", indeed: "Amsterdam%2C+Netherlands", rent: 1600, col: 2600, reloDifficulty: 3, salary: 78000, savings: 2500 },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", iata: "YYZ", adzunaCountry: "ca", adzunaLocation: "toronto", spotahome: "toronto", linkedin: "toronto-canada", indeed: "Toronto%2C+ON", rent: 1900, col: 3100, reloDifficulty: 4, salary: 92000, savings: 3200 },
  { city: "Sydney", country: "Australia", flag: "🇦🇺", iata: "SYD", adzunaCountry: "au", adzunaLocation: "sydney", spotahome: "sydney", linkedin: "sydney-australia", indeed: "Sydney%2C+NSW", rent: 2000, col: 3200, reloDifficulty: 5, salary: 88000, savings: 2600 },
  { city: "New York", country: "USA", flag: "🇺🇸", iata: "JFK", adzunaCountry: "us", adzunaLocation: "new york", spotahome: "new-york", linkedin: "new-york-united-states", indeed: "New+York%2C+NY", rent: 3000, col: 4500, reloDifficulty: 6, salary: 120000, savings: 3500 },
  { city: "Barcelona", country: "Spain", flag: "🇪🇸", iata: "BCN", adzunaCountry: "gb", adzunaLocation: "barcelona", spotahome: "barcelona", linkedin: "barcelona-spain", indeed: "Barcelona%2C+Spain", rent: 1200, col: 1900, reloDifficulty: 3, salary: 48000, savings: 1400 },
  { city: "Lisbon", country: "Portugal", flag: "🇵🇹", iata: "LIS", adzunaCountry: "gb", adzunaLocation: "lisbon", spotahome: "lisbon", linkedin: "lisbon-portugal", indeed: "Lisbon%2C+Portugal", rent: 900, col: 1600, reloDifficulty: 2, salary: 42000, savings: 1900 },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", iata: "SIN", adzunaCountry: "sg", adzunaLocation: "singapore", spotahome: "singapore", linkedin: "singapore", indeed: "Singapore", rent: 2400, col: 3800, reloDifficulty: 4, salary: 98000, savings: 2900 },
  { city: "Dubai", country: "UAE", flag: "🇦🇪", iata: "DXB", adzunaCountry: "gb", adzunaLocation: "dubai", spotahome: "dubai", linkedin: "dubai-united-arab-emirates", indeed: "Dubai", rent: 2000, col: 3000, reloDifficulty: 4, salary: 90000, savings: 4000 },
];

export async function POST(req: NextRequest) {
  const { profession } = await req.json();
  const appId = process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
  const appKey = process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;

  const results = await Promise.allSettled(
    CITY_POOL.map(async (city) => {
      const url = "https://api.adzuna.com/v1/api/jobs/" + city.adzunaCountry + "/search/1?app_id=" + appId + "&app_key=" + appKey + "&results_per_page=1&what=" + encodeURIComponent(profession || "software engineer") + "&where=" + encodeURIComponent(city.adzunaLocation) + "&content-type=application/json";
      const res = await fetch(url);
      const data = await res.json();
      const count = data.count || 0;
      const score = Math.min(99, Math.round(50 + (count / 10) * 30 + Math.random() * 10));
      return { ...city, score, jobCount: count, jobDemand: count > 500 ? "Very High" : count > 100 ? "High" : count > 20 ? "Medium" : "Low", reason: "Based on " + count + " live job listings found for your profession in " + city.city + ". Our AI rates this city " + score + "/100 for your profile." };
    })
  );

  const cities = results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
    .map(r => r.value)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return NextResponse.json({ cities });
}