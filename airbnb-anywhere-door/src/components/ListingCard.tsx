"use client";

import { useState } from "react";
import { usePropertyImage } from "@/hooks/usePropertyImage";
import { Heart, Star, Home, Camera, Compass } from "lucide-react";

interface ListingCardProps {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  tags?: string[];
  badge?: string;
  gradient?: string;
  emoji?: string;
  index?: number;
  onClick?: () => void;
  wishlisted?: boolean;
  onWishlistToggle?: () => void;
  priceUnit?: string;
  type?: string;
  imageUrl?: string;
}

export default function ListingCard({
  id,
  name,
  location,
  price,
  rating,
  tags = [],
  badge,
  gradient = "linear-gradient(135deg, #1A1C20 0%, #2D3139 100%)",
  emoji,
  index = 0,
  onClick,
  wishlisted,
  onWishlistToggle,
  priceUnit = "/ night",
  type,
  imageUrl: customImageUrl,
}: ListingCardProps) {
  const [localWishlisted, setLocalWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Fetch real Pexels image if no custom imageUrl is provided OR if the custom imageUrl fails to load
  const imageQuery = `${location} ${name.split(" ").slice(0, 3).join(" ")}`;
  const shouldFetchPexels = !customImageUrl || imgError;
  const resolvedType = (type === "service" || type === "experience") ? type : "stay";
  const { url: pexelsUrl, alt: pexelsAlt, photographer, loading: imgLoading } = usePropertyImage(
    shouldFetchPexels ? imageQuery : "",
    shouldFetchPexels,
    resolvedType
  );

  const imageUrl = (!imgError && customImageUrl) ? customImageUrl : pexelsUrl;
  const imageAlt = (!imgError && customImageUrl) ? name : pexelsAlt;
  const showRealImage = !!imageUrl;
  const isWishlisted = wishlisted !== undefined ? wishlisted : localWishlisted;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle();
    } else {
      setLocalWishlisted((prev) => !prev);
    }
  };

  // Get matching vector fallback icon based on ID type or type prop
  const renderFallbackIcon = () => {
    if (type === "service" || id.startsWith("service")) {
      return <Camera size={38} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.4)" }} />;
    }
    if (type === "experience" || id.startsWith("exp")) {
      return <Compass size={38} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.4)" }} />;
    }
    return <Home size={38} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.4)" }} />;
  };

  return (
    <div
      className="listing-card"
      onClick={onClick}
      style={{ animationDelay: `${index * 0.08}s` }}
      role="article"
    >
      {/* ── Image Area ── */}
      <div
        className="listing-image-placeholder"
        style={{ background: showRealImage ? "#111" : gradient, position: "relative" }}
      >
        {/* Real Pexels Image */}
        {showRealImage && (
          <img
            src={imageUrl}
            alt={imageAlt}
            onError={() => setImgError(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "opacity 0.4s ease",
            }}
          />
        )}

        {/* Shimmer loading skeleton */}
        {imgLoading && !showRealImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        )}

        {/* Fallback Vector Icon */}
        {!showRealImage && (
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            {renderFallbackIcon()}
          </div>
        )}

        {/* Bottom scrim for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 45%)",
            zIndex: 2,
          }}
        />

        {/* Floating Wishlist Heart */}
        <button
          className={`listing-wishlist${isWishlisted ? " active" : ""}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Guest Favourite/Superhost Badge */}
        {badge && (
          <div className="guest-fav-badge" style={{ zIndex: 3 }}>
            {badge}
          </div>
        )}

        {/* Photographer credit (required by Pexels ToS) */}
        {showRealImage && photographer && shouldFetchPexels && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 12,
              zIndex: 3,
              fontSize: 9,
              color: "rgba(255,255,255,0.7)",
              background: "rgba(0, 0, 0, 0.45)",
              padding: "2px 6px",
              borderRadius: "var(--radius-sm)",
              backdropFilter: "blur(4px)",
              fontFamily: "var(--font-body)",
            }}
          >
            📷 Pexels / {photographer}
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="listing-info">
        <div className="listing-row-1">
          <span className="listing-name">{name}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, fontSize: 13.5, fontWeight: 500, fontFamily: "var(--font-body)", color: "var(--text-primary)" }}>
            <Star size={13} fill="#ffb100" stroke="#ffb100" />
            <span>{rating.toFixed(2)}</span>
          </div>
        </div>
        <div className="listing-location">{location}</div>

        {tags.length > 0 && (
          <div className="listing-tags">
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} className="listing-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="listing-price-row">
          <div className="listing-price">
            {price} {priceUnit && <span>{priceUnit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
