import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 1. Try Vercel's direct geolocation headers first (most reliable when deployed on Vercel)
    const vercelCity = request.headers.get("x-vercel-ip-city");
    const vercelCountry = request.headers.get("x-vercel-ip-country");
    
    if (vercelCity) {
      return NextResponse.json({
        city: decodeURIComponent(vercelCity),
        countryCode: vercelCountry || "US",
        country: vercelCountry === "IN" ? "India" : (vercelCountry || "United States"),
        success: true
      });
    }

    // 2. Fallback to ip-api.com using forwarding headers for local testing
    let ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "";
    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    const url = ip && ip !== "127.0.0.1" && ip !== "::1" && ip !== "localhost"
      ? `http://ip-api.com/json/${ip}`
      : "http://ip-api.com/json/";

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch geolocation");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // Return standard fallback rather than erroring out
    return NextResponse.json({
      city: "New Delhi",
      countryCode: "IN",
      country: "India",
      success: false
    });
  }
}
