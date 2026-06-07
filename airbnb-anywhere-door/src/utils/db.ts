"use client";

export interface UserProfile {
  name: string;
  location: string;
}

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject("IndexedDB is client-only");
      return;
    }
    const request = window.indexedDB.open("AirbnbOdysseyDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile");
      }
      if (!db.objectStoreNames.contains("wishlist")) {
        db.createObjectStore("wishlist");
      }
      if (!db.objectStoreNames.contains("trips")) {
        db.createObjectStore("trips");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ── Profile Operations ──
export async function getProfile(): Promise<UserProfile | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("profile", "readonly");
      const store = tx.objectStore("profile");
      const req = store.get("user");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("IndexedDB error:", err);
    return null;
  }
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("profile", "readwrite");
      const store = tx.objectStore("profile");
      const req = store.put(profile, "user");
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("IndexedDB error:", err);
  }
}

// ── Wishlist Operations ──
export async function getWishlist(): Promise<string[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("wishlist", "readonly");
      const store = tx.objectStore("wishlist");
      const req = store.get("list");
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("IndexedDB error:", err);
    return [];
  }
}

export async function saveWishlist(list: string[]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("wishlist", "readwrite");
      const store = tx.objectStore("wishlist");
      const req = store.put(list, "list");
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("IndexedDB error:", err);
  }
}

// ── Travel Plan (Trips) Operations ──
export async function getLatestPlan(): Promise<any | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("trips", "readonly");
      const store = tx.objectStore("trips");
      const req = store.get("latest");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("IndexedDB error:", err);
    return null;
  }
}

export async function saveLatestPlan(plan: any): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("trips", "readwrite");
      const store = tx.objectStore("trips");
      const req = store.put(plan, "latest");
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error("IndexedDB error:", err);
  }
}
