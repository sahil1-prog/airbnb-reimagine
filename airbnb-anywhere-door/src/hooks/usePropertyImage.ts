"use client";

import { useState, useEffect } from "react";

interface ImageResult {
  url: string | null;
  alt: string;
  photographer: string;
  loading: boolean;
}

const SESSION_CACHE_PREFIX = "pexels_img_";
const SESSION_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

interface SessionEntry {
  url: string;
  alt: string;
  photographer: string;
  cachedAt: number;
}

// ── Client-side module-level in-memory cache for synchronous instant resolution ──
const clientImageMemoryCache = new Map<string, { url: string; alt: string; photographer: string }>();

function getSessionCache(key: string): SessionEntry | null {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_PREFIX + key);
    if (!raw) return null;
    const entry: SessionEntry = JSON.parse(raw);
    if (Date.now() - entry.cachedAt > SESSION_CACHE_TTL_MS) {
      sessionStorage.removeItem(SESSION_CACHE_PREFIX + key);
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

function setSessionCache(key: string, entry: SessionEntry) {
  try {
    sessionStorage.setItem(SESSION_CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // sessionStorage full or unavailable — silently ignore
  }
}

/**
 * Fetches a Pexels image for a given search query.
 * Caches results in sessionStorage and local module memory to avoid repeat API calls
 * and eliminate visual layout shifts on component mounts.
 */
export function usePropertyImage(query: string, enabled: boolean = true): ImageResult {
  const cacheKey = query.toLowerCase().trim();

  // Determine if we have a synchronous memory or session cache hit before rendering
  const getCachedEntry = (): { url: string; alt: string; photographer: string } | null => {
    if (!enabled || !query) return null;
    
    // Check in-memory cache first (instant)
    const memoryHit = clientImageMemoryCache.get(cacheKey);
    if (memoryHit) return memoryHit;

    // Check sessionStorage second
    const sessionHit = getSessionCache(cacheKey);
    if (sessionHit) {
      // Warm up memory cache
      clientImageMemoryCache.set(cacheKey, {
        url: sessionHit.url,
        alt: sessionHit.alt,
        photographer: sessionHit.photographer
      });
      return sessionHit;
    }
    
    return null;
  };

  const cached = getCachedEntry();

  const [result, setResult] = useState<ImageResult>(
    cached
      ? { url: cached.url, alt: cached.alt, photographer: cached.photographer, loading: false }
      : { url: null, alt: query, photographer: "", loading: enabled && !!query }
  );

  useEffect(() => {
    if (!enabled || !query) {
      setResult({ url: null, alt: query, photographer: "", loading: false });
      return;
    }

    const currentCached = getCachedEntry();
    if (currentCached) {
      setResult({
        url: currentCached.url,
        alt: currentCached.alt,
        photographer: currentCached.photographer,
        loading: false,
      });
      return;
    }

    let cancelled = false;
    setResult((prev) => ({ ...prev, loading: true }));

    fetch(`/api/images?q=${encodeURIComponent(query)}&size=large`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.url) {
          const entry: SessionEntry = {
            url: data.url,
            alt: data.alt ?? query,
            photographer: data.photographer ?? "",
            cachedAt: Date.now(),
          };
          setSessionCache(cacheKey, entry);
          clientImageMemoryCache.set(cacheKey, {
            url: data.url,
            alt: entry.alt,
            photographer: entry.photographer
          });
          setResult({ url: data.url, alt: entry.alt, photographer: entry.photographer, loading: false });
        } else {
          setResult({ url: null, alt: query, photographer: "", loading: false });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ url: null, alt: query, photographer: "", loading: false });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query, enabled, cacheKey]);

  return result;
}
