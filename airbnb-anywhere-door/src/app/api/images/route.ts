import { NextRequest, NextResponse } from "next/server";

interface PexelsPhoto {
  id: number;
  src: {
    large: string;
    medium: string;
    small: string;
  };
  alt: string;
  photographer: string;
}

interface CacheEntry {
  url: string;
  alt: string;
  photographer: string;
  cachedAt: number;
}

// ── Server-side in-memory cache (persists for the lifetime of the Node.js process) ──
const imageCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function getCacheKey(query: string): string {
  return query.toLowerCase().trim();
}

function isCacheValid(entry: CacheEntry): boolean {
  return Date.now() - entry.cachedAt < CACHE_TTL_MS;
}

/** Curates a better search query from location/name for more accurate Pexels results */
function buildSearchQuery(query: string): string {
  const locationKeywords: Record<string, string> = {
    // India
    goa: "goa beach villa",
    udaipur: "udaipur lake palace india",
    manali: "manali himalaya chalet snow",
    kerala: "kerala houseboat backwater",
    jaipur: "jaipur rajasthan heritage hotel",
    varkala: "varkala cliff beach india",
    alleppey: "alleppey houseboat kerala",
    shimla: "shimla mountain cottage",
    darjeeling: "darjeeling tea hill station",
    // International
    santorini: "santorini villa infinity pool",
    bali: "bali villa tropical pool",
    paris: "paris luxury apartment",
    maldives: "maldives overwater bungalow",
    thailand: "thailand beach resort",
    dubai: "dubai luxury penthouse",
  };

  const lower = query.toLowerCase();
  for (const [key, curated] of Object.entries(locationKeywords)) {
    if (lower.includes(key)) return curated;
  }

  // Fallback: append "luxury vacation rental" for generic queries
  return `${query} luxury vacation rental property`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawQuery = searchParams.get("q");
  const size = searchParams.get("size") ?? "large";

  if (!rawQuery) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  const apiKey = process.env.PEXELS_API_KEY || process.env.PEXELS_API;

  // No API key configured → return nothing (client falls back to gradient)
  if (!apiKey || apiKey.length < 10) {
    return NextResponse.json({ error: "PEXELS_API_KEY not configured" }, { status: 503 });
  }

  const cacheKey = getCacheKey(rawQuery);

  // ── Check in-memory server cache ──
  const cached = imageCache.get(cacheKey);
  if (cached && isCacheValid(cached)) {
    return NextResponse.json(
      { url: cached.url, alt: cached.alt, photographer: cached.photographer, cached: true },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=7200",
          "X-Cache": "HIT",
        },
      }
    );
  }

  try {
    const searchQuery = buildSearchQuery(rawQuery);
    const pexelsRes = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=5&orientation=landscape`,
      {
        headers: { Authorization: apiKey },
        // Next.js fetch cache — deduplicate identical requests within a request cycle
        next: { revalidate: 3600 },
      }
    );

    if (!pexelsRes.ok) {
      throw new Error(`Pexels API error: ${pexelsRes.status}`);
    }

    const data = await pexelsRes.json();
    const photos: PexelsPhoto[] = data.photos ?? [];

    if (photos.length === 0) {
      return NextResponse.json({ error: "No photos found" }, { status: 404 });
    }

    // Pick a photo based on cache key hash for visual variety across cards
    const pickIndex = Math.abs(cacheKey.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % photos.length;
    const photo = photos[pickIndex];

    const imageUrl = size === "medium" ? photo.src.medium : photo.src.large;

    // ── Store in server cache ──
    const entry: CacheEntry = {
      url: imageUrl,
      alt: photo.alt || rawQuery,
      photographer: photo.photographer,
      cachedAt: Date.now(),
    };
    imageCache.set(cacheKey, entry);

    return NextResponse.json(
      { url: imageUrl, alt: entry.alt, photographer: entry.photographer, cached: false },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=7200",
          "X-Cache": "MISS",
        },
      }
    );
  } catch (err) {
    console.error("Pexels image fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
