import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const profession = searchParams.get("profession") || "software engineer";
  const location = searchParams.get("location") || "london";
  const country = searchParams.get("country") || "gb";
  const appId = process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
  const appKey = process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;
  const url = "https://api.adzuna.com/v1/api/jobs/" + country + "/search/1?app_id=" + appId + "&app_key=" + appKey + "&results_per_page=5&what=" + encodeURIComponent(profession) + "&where=" + encodeURIComponent(location) + "&content-type=application/json";
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}