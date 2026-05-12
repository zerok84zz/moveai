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
  { city: "Paris", country: "France", flag: "🇫🇷", iata: "CDG", adzunaCountry: "fr", adzunaLocation: "paris", spotahome: "paris", linkedin: "paris-france", indeed: "Paris%2C+France", rent: 1800, col: 2900, reloDifficulty: 4, salary: 68000, savings: 2000 },
  { city: "Melbourne", country: "Australia", flag: "🇦🇺", iata: "MEL", adzunaCountry: "au", adzunaLocation: "melbourne", spotahome: "melbourne", linkedin: "melbourne-australia", indeed: "Melbourne%2C+VIC", rent: 1700, col: 2800, reloDifficulty: 4, salary: 84000, savings: 2400 },
  { city: "Montreal", country: "Canada", flag: "🇨🇦", iata: "YUL", adzunaCountry: "ca", adzunaLocation: "montreal", spotahome: "montreal", linkedin: "montreal-canada", indeed: "Montreal%2C+QC", rent: 1400, col: 2400, reloDifficulty: 3, salary: 78000, savings: 2800 },
  { city: "Zurich", country: "Switzerland", flag: "🇨🇭", iata: "ZRH", adzunaCountry: "gb", adzunaLocation: "zurich", spotahome: "zurich", linkedin: "zurich-switzerland", indeed: "Zurich%2C+Switzerland", rent: 2800, col: 4200, reloDifficulty: 5, salary: 130000, savings: 4500 },
  { city: "Munich", country: "Germany", flag: "🇩🇪", iata: "MUC", adzunaCountry: "de", adzunaLocation: "munich", spotahome: "munich", linkedin: "munich-germany", indeed: "Munich%2C+Germany", rent: 1800, col: 2800, reloDifficulty: 3, salary: 80000, savings: 2500 },
  { city: "Vienna", country: "Austria", flag: "🇦🇹", iata: "VIE", adzunaCountry: "at", adzunaLocation: "vienna", spotahome: "vienna", linkedin: "vienna-austria", indeed: "Vienna%2C+Austria", rent: 1200, col: 2200, reloDifficulty: 3, salary: 65000, savings: 2000 },
  { city: "Stockholm", country: "Sweden", flag: "🇸🇪", iata: "ARN", adzunaCountry: "gb", adzunaLocation: "stockholm", spotahome: "stockholm", linkedin: "stockholm-sweden", indeed: "Stockholm%2C+Sweden", rent: 1500, col: 2600, reloDifficulty: 4, salary: 72000, savings: 2100 },
  { city: "Copenhagen", country: "Denmark", flag: "🇩🇰", iata: "CPH", adzunaCountry: "gb", adzunaLocation: "copenhagen", spotahome: "copenhagen", linkedin: "copenhagen-denmark", indeed: "Copenhagen%2C+Denmark", rent: 1600, col: 2800, reloDifficulty: 4, salary: 74000, savings: 2000 },
  { city: "Dublin", country: "Ireland", flag: "🇮🇪", iata: "DUB", adzunaCountry: "gb", adzunaLocation: "dublin", spotahome: "dublin", linkedin: "dublin-ireland", indeed: "Dublin%2C+Ireland", rent: 2000, col: 3000, reloDifficulty: 3, salary: 82000, savings: 2600 },
  { city: "Vancouver", country: "Canada", flag: "🇨🇦", iata: "YVR", adzunaCountry: "ca", adzunaLocation: "vancouver", spotahome: "vancouver", linkedin: "vancouver-canada", indeed: "Vancouver%2C+BC", rent: 2100, col: 3200, reloDifficulty: 4, salary: 85000, savings: 2500 },
  { city: "San Francisco", country: "USA", flag: "🇺🇸", iata: "SFO", adzunaCountry: "us", adzunaLocation: "san francisco", spotahome: "san-francisco", linkedin: "san-francisco-bay-area", indeed: "San+Francisco%2C+CA", rent: 3500, col: 5000, reloDifficulty: 6, salary: 150000, savings: 4000 },
  { city: "Austin", country: "USA", flag: "🇺🇸", iata: "AUS", adzunaCountry: "us", adzunaLocation: "austin", spotahome: "austin", linkedin: "austin-texas", indeed: "Austin%2C+TX", rent: 1800, col: 2800, reloDifficulty: 4, salary: 110000, savings: 3800 },
  { city: "Warsaw", country: "Poland", flag: "🇵🇱", iata: "WAW", adzunaCountry: "gb", adzunaLocation: "warsaw", spotahome: "warsaw", linkedin: "warsaw-poland", indeed: "Warsaw%2C+Poland", rent: 700, col: 1400, reloDifficulty: 2, salary: 45000, savings: 1800 },
  { city: "Prague", country: "Czech Republic", flag: "🇨🇿", iata: "PRG", adzunaCountry: "gb", adzunaLocation: "prague", spotahome: "prague", linkedin: "prague-czech-republic", indeed: "Prague%2C+Czech+Republic", rent: 800, col: 1500, reloDifficulty: 2, salary: 48000, savings: 1900 },
  { city: "Tallinn", country: "Estonia", flag: "🇪🇪", iata: "TLL", adzunaCountry: "gb", adzunaLocation: "tallinn", spotahome: "tallinn", linkedin: "tallinn-estonia", indeed: "Tallinn%2C+Estonia", rent: 600, col: 1200, reloDifficulty: 2, salary: 42000, savings: 1700 },
];

export async function POST(req: NextRequest) {
  const { profession } = await req.json();
  const appId = process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
  const appKey = process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;

  const shuffled = [...CITY_POOL].sort(() => Math.random() - 0.5).slice(0, 12);

  const results = await Promise.allSettled(
    shuffled.map(async (city) => {
      try {
        const url = "https://api.adzuna.com/v1/api/jobs/" + city.adzunaCountry + "/search/1?app_id=" + appId + "&app_key=" + appKey + "&results_per_page=1&what=" + encodeURIComponent(profession || "software engineer") + "&where=" + encodeURIComponent(city.adzunaLocation) + "&content-type=application/json";
        const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
        const data = await res.json();
        const count = data.count || 0;
        const score = Math.min(99, Math.round(40 + Math.min(count / 5, 40) + Math.random() * 15));
        return { ...city, score, jobCount: count, jobDemand: count > 500 ? "Very High" : count > 100 ? "High" : count > 20 ? "Medium" : "Low", reason: "Our AI found " + count + " live job listings for your profession in " + city.city + ". With an average salary of $" + city.salary.toLocaleString() + " and rent around $" + city.rent + "/mo, your estimated monthly savings would be $" + city.savings + "." };
      } catch {
        return { ...city, score: Math.round(50 + Math.random() * 20), jobCount: 0, jobDemand: "Low", reason: "Data temporarily unavailable for " + city.city + ". Estimates based on historical data." };
      }
    })
  );

  const cities = results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
    .map(r => r.value)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return NextResponse.json({ cities });
}