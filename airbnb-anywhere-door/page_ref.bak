"use client";

import { useState, useEffect } from "react";
import ListingCard from "@/components/ListingCard";
import AnywhereDoor from "@/components/AnywhereDoor";
import { useTheme } from "@/context/ThemeContext";
import {
  Compass,
  Heart,
  Map,
  Mail,
  User,
  Search,
  SlidersHorizontal,
  Palmtree,
  Home as HomeIcon,
  Castle,
  Mountain,
  Waves,
  Building,
  Trees,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  CalendarDays,
  CreditCard,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  Globe,
  X,
  Star,
} from "lucide-react";

/*  Custom illustrative SVGs matching Airbnb icons  */
const StaysIconSVG = () => (
  <svg viewBox="0 0 32 32" style={{ width: 22, height: 22, display: "block" }}>
    {/* Cottage body */}
    <path d="M12 28V16h8v12h7V14L16 5 5 14v14z" fill="#71717a" />
    {/* Roof */}
    <path d="M16 3L3 13.5v2L16 5l13 10.5v-2z" fill="#27272a" />
    {/* Green tree */}
    <circle cx="27" cy="21" r="5" fill="#22c55e" />
    <rect x="26" y="24" width="2" height="4" fill="#78350f" />
  </svg>
);

const ExperiencesIconSVG = () => (
  <svg viewBox="0 0 32 32" style={{ width: 22, height: 22, display: "block" }}>
    {/* Basket */}
    <rect x="14" y="25" width="4" height="4" rx="1" fill="#78350f" />
    <line x1="14.5" y1="22" x2="14.5" y2="25" stroke="#4b5563" strokeWidth="1" />
    <line x1="17.5" y1="22" x2="17.5" y2="25" stroke="#4b5563" strokeWidth="1" />
    {/* Hot air balloon */}
    <path d="M16 4C11 4 7 8 7 13c0 4 3 7 5 9h8c2-2 5-5 5-9 0-5-4-9-9-9z" fill="#ef4444" />
    <path d="M16 4c-2 0-3.5 4-3.5 9s1.5 9 3.5 9 3.5-4 3.5-9-1.5-9-3.5-9z" fill="#f97316" />
    <line x1="16" y1="4" x2="16" y2="22" stroke="#fde047" strokeWidth="1" />
  </svg>
);

const ServicesIconSVG = () => (
  <svg viewBox="0 0 32 32" style={{ width: 22, height: 22, display: "block" }}>
    {/* Bell Base */}
    <rect x="6" y="24" width="20" height="4" rx="1" fill="#1e293b" />
    <rect x="15" y="22" width="2" height="2" fill="#475569" />
    {/* Bell Dome */}
    <path d="M8 22c0-5 3-9 8-9s8 4 8 9z" fill="#94a3b8" />
    {/* Bell Button */}
    <ellipse cx="16" cy="11" rx="3" ry="2" fill="#334155" />
    <rect x="15" y="8" width="2" height="3" fill="#1e293b" />
  </svg>
);

/*  Homes Categories  */
const STAYS_CATEGORIES = [
  { label: "Cabins", icon: HomeIcon },
  { label: "Mansions", icon: Castle },
  { label: "Heritage", icon: Globe },
  { label: "City", icon: Building },
  { label: "Countryside", icon: Trees },
  { label: "Beach", icon: Palmtree },
  { label: "Mountains", icon: Mountain },
  { label: "Lakefront", icon: Waves },
];

/*  Stays Database  */
const STAYS_LISTINGS_INDIA = [
  {
    id: "beach-1",
    name: "Coconut Grove Beach Villa",
    location: "Goa, North Goa",
    price: 9500,
    rating: 4.97,
    tags: ["Beachfront", "Private Pool", "Chef"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #1a1200 0%, #2e2000 50%, #4a3300 100%)",
    emoji: "🏝️",
    category: "Beach",
    country: "India",
  },
  {
    id: "beach-2",
    name: "Clifftop Infinity Retreat",
    location: "Varkala, Kerala",
    price: 6200,
    rating: 4.95,
    tags: ["Cliff Top", "Sea View", "Yoga"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #0a2a1a 0%, #0f3d25 50%, #1a5c35 100%)",
    emoji: "🌊",
    category: "Beach",
    country: "India",
  },
  {
    id: "cabin-1",
    name: "Whispering Pines A-Frame",
    location: "Jibhi, Himachal Pradesh",
    price: 5200,
    rating: 4.94,
    tags: ["A-Frame", "Riverside", "Bonfire"],
    badge: "Rare Find",
    gradient: "linear-gradient(135deg, #1e110a 0%, #3a2214 50%, #52311d 100%)",
    emoji: "🌲",
    category: "Cabins",
    country: "India",
  },
  {
    id: "mansion-1",
    name: "Lakeside Heritage Palace",
    location: "Udaipur, Rajasthan",
    price: 18500,
    rating: 4.99,
    tags: ["Lake Pichola", "Infinity Pool", "Butler"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #3d2470 100%)",
    emoji: "🏰",
    category: "Mansions",
    country: "India",
  },
  {
    id: "mountain-1",
    name: "Snow Peak Forest Chalet",
    location: "Manali, Himachal Pradesh",
    price: 5800,
    rating: 4.93,
    tags: ["Mountain", "Snow View", "Fireplace"],
    badge: "Top Rated",
    gradient: "linear-gradient(135deg, #0d1a2a 0%, #1a2d45 50%, #243d60 100%)",
    emoji: "🏔️",
    category: "Mountains",
    country: "India",
  },
  {
    id: "lakefront-1",
    name: "Backwater Houseboat Suite",
    location: "Alleppey, Kerala",
    price: 8200,
    rating: 4.93,
    tags: ["AC Bedroom", "Personal Chef", "Dawn Tour"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #051a24 0%, #0d3246 50%, #184c68 100%)",
    emoji: "🚢",
    category: "Lakefront",
    country: "India",
  },
  {
    id: "heritage-1",
    name: "Fortress Heritage Hotel",
    location: "Jodhpur, Rajasthan",
    price: 11500,
    rating: 4.95,
    tags: ["Fort View", "Ethnic Decor", "Pool"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #2b1f15 0%, #423021 50%, #5c442f 100%)",
    emoji: "🏯",
    category: "Heritage",
    country: "India",
  },
  {
    id: "city-1",
    name: "Cyber City Penthouse",
    location: "Gurugram, Haryana",
    price: 8500,
    rating: 4.85,
    tags: ["Metro View", "Smart Home", "Rooftop"],
    badge: "New",
    gradient: "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 50%, #3e3e3e 100%)",
    emoji: "🏙️",
    category: "City",
    country: "India",
  },
  {
    id: "countryside-1",
    name: "Organic Farm Villa",
    location: "Coorg, Karnataka",
    price: 7500,
    rating: 4.94,
    tags: ["Coffee Estate", "Treks", "Pets Allowed"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #1a2a1a 0%, #273e27 50%, #375737 100%)",
    emoji: "🌿",
    category: "Countryside",
    country: "India",
  },
];

const STAYS_LISTINGS_SWITZERLAND = [
  {
    id: "beach-swiss",
    name: "Lake Geneva Sunshore Villa",
    location: "Lausanne, Switzerland",
    price: 14500,
    rating: 4.96,
    tags: ["Lakeside", "Private Dock", "Heated Pool"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #0f2a4a 0%, #1d4b7c 50%, #2f6ea8 100%)",
    emoji: "🏝️",
    category: "Beach",
    country: "Switzerland",
  },
  {
    id: "beach-swiss-2",
    name: "Montreux Riviera Palms Apartment",
    location: "Montreux, Switzerland",
    price: 11500,
    rating: 4.88,
    tags: ["Lakeside Beach", "Palms View", "Jacuzzi"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #102a43 0%, #243e56 100%)",
    emoji: "🏖️",
    category: "Beach",
    country: "Switzerland",
  },
  {
    id: "cabin-swiss",
    name: "Zermatt Alpine A-Frame",
    location: "Zermatt, Switzerland",
    price: 8900,
    rating: 4.98,
    tags: ["Alps View", "Fireplace", "Ski-in/Ski-out"],
    badge: "Rare Find",
    gradient: "linear-gradient(135deg, #1f140e 0%, #3a271d 50%, #5c3e2e 100%)",
    emoji: "🌲",
    category: "Cabins",
    country: "Switzerland",
  },
  {
    id: "cabin-swiss-2",
    name: "Grindelwald Cosy Log Cabin",
    location: "Grindelwald, Switzerland",
    price: 7200,
    rating: 4.93,
    tags: ["Wooden Design", "Mountain Views", "Fireplace"],
    badge: "Top Rated",
    gradient: "linear-gradient(135deg, #2c1a0c 0%, #4a321a 100%)",
    emoji: "🏡",
    category: "Cabins",
    country: "Switzerland",
  },
  {
    id: "mansion-swiss",
    name: "Chateau de Lancy Estate",
    location: "Geneva, Switzerland",
    price: 28500,
    rating: 4.99,
    tags: ["Historic Manor", "Private Park", "Helipad"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #24113a 0%, #3e1f64 50%, #5b3193 100%)",
    emoji: "🏰",
    category: "Mansions",
    country: "Switzerland",
  },
  {
    id: "mansion-swiss-2",
    name: "Villa Castagnola Shoreline Manor",
    location: "Lugano, Switzerland",
    price: 24500,
    rating: 4.97,
    tags: ["Italianate Garden", "Lake Views", "Dock"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #2b0f4a 0%, #4a2278 100%)",
    emoji: "🏰",
    category: "Mansions",
    country: "Switzerland",
  },
  {
    id: "mountain-swiss",
    name: "Matterhorn Summit Chalet",
    location: "Zermatt, Switzerland",
    price: 12800,
    rating: 4.97,
    tags: ["Matterhorn View", "Outdoor Jacuzzi", "Sauna"],
    badge: "Top Rated",
    gradient: "linear-gradient(135deg, #091a2e 0%, #153054 50%, #254d7e 100%)",
    emoji: "🏔️",
    category: "Mountains",
    country: "Switzerland",
  },
  {
    id: "mountain-swiss-2",
    name: "Verbier Luxury Ski Chalet",
    location: "Verbier, Switzerland",
    price: 14800,
    rating: 4.96,
    tags: ["Ski-in/Ski-out", "Sauna", "Heated Balcony"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #091a2e 0%, #1c324e 100%)",
    emoji: "🏔️",
    category: "Mountains",
    country: "Switzerland",
  },
  {
    id: "lakefront-swiss",
    name: "Lake Lucerne Panorama Lodge",
    location: "Lucerne, Switzerland",
    price: 11200,
    rating: 4.94,
    tags: ["Lake Access", "Mountain Views", "Balcony"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #062130 0%, #0e3d58 50%, #195f87 100%)",
    emoji: "🚢",
    category: "Lakefront",
    country: "Switzerland",
  },
  {
    id: "lakefront-swiss-2",
    name: "Interlaken Lake-View Lodge",
    location: "Interlaken, Switzerland",
    price: 9800,
    rating: 4.91,
    tags: ["Lake Access", "Eiger View", "Terrace"],
    badge: "New",
    gradient: "linear-gradient(135deg, #051d2c 0%, #153e5c 100%)",
    emoji: "🌊",
    category: "Lakefront",
    country: "Switzerland",
  },
  {
    id: "heritage-swiss",
    name: "Bern Old Town Historic Apartment",
    location: "Bern, Switzerland",
    price: 7800,
    rating: 4.92,
    tags: ["16th Century", "Medieval Arcades", "Renovated"],
    badge: "Rare Find",
    gradient: "linear-gradient(135deg, #2e1d11 0%, #462c1b 50%, #633f28 100%)",
    emoji: "🏯",
    category: "Heritage",
    country: "Switzerland",
  },
  {
    id: "heritage-swiss-2",
    name: "St. Gallen Historic Abbey Loft",
    location: "St. Gallen, Switzerland",
    price: 8200,
    rating: 4.95,
    tags: ["Historic Center", "Ornate Windows", "Library Walk"],
    badge: "Rare Find",
    gradient: "linear-gradient(135deg, #2a1b12 0%, #422d21 100%)",
    emoji: "🏯",
    category: "Heritage",
    country: "Switzerland",
  },
  {
    id: "city-swiss",
    name: "Zurich Bahnhofstrasse Loft",
    location: "Zurich, Switzerland",
    price: 15500,
    rating: 4.91,
    tags: ["Downtown", "Rooftop Terrace", "Design Furniture"],
    badge: "New",
    gradient: "linear-gradient(135deg, #1f1f1f 0%, #333333 50%, #474747 100%)",
    emoji: "🏙️",
    category: "City",
    country: "Switzerland",
  },
  {
    id: "city-swiss-2",
    name: "Geneva Rue du Rhone Penthouse",
    location: "Geneva, Switzerland",
    price: 17500,
    rating: 4.92,
    tags: ["Jet d'Eau View", "Modern Design", "High Speed WiFi"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%)",
    emoji: "🏙️",
    category: "City",
    country: "Switzerland",
  },
  {
    id: "countryside-swiss",
    name: "Grindelwald Valley Farmhouse",
    location: "Grindelwald, Switzerland",
    price: 6800,
    rating: 4.95,
    tags: ["Eiger View", "Organic Garden", "Family Friendly"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #102413 0%, #204125 50%, #32623b 100%)",
    emoji: "🌿",
    category: "Countryside",
    country: "Switzerland",
  },
  {
    id: "countryside-swiss-2",
    name: "Appenzell Alpine Farm Stay",
    location: "Appenzell, Switzerland",
    price: 5800,
    rating: 4.94,
    tags: ["Traditional House", "Cheese Dairy Tour", "Pet Friendly"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #102413 0%, #1e3c23 100%)",
    emoji: "🌿",
    category: "Countryside",
    country: "Switzerland",
  },
];

/*  Airbnb Services Categories (matching screenshot)  */
const SERVICES_CATEGORIES = [
  {
    label: "Photography",
    count: "7 available",
    img: "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Make-up",
    count: "2 available",
    img: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Chefs",
    count: "Coming soon",
    img: "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Massage",
    count: "Coming soon",
    img: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Prepared meals",
    count: "Coming soon",
    img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Training",
    count: "Coming soon",
    img: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Hair",
    count: "Coming soon",
    img: "https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Spa treatments",
    count: "Coming soon",
    img: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    label: "Catering",
    count: "Coming soon",
    img: "https://images.pexels.com/photos/3297363/pexels-photo-3297363.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

/*  Airbnb Services Listings (Photographers in New Delhi)  */
const SERVICES_LISTINGS_INDIA = [
  {
    id: "service-1",
    name: "New Delhi photo session by a Female Photographer",
    location: "Connaught Place, New Delhi",
    price: 8500,
    rating: 5.0,
    tags: ["Outdoor Session", "Solo/Couple friendly", "120 Mins"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
    emoji: "📷",
    category: "Photography",
    country: "India",
  },
  {
    id: "service-2",
    name: "Historical photo shoot by Madhur",
    location: "Humayun's Tomb, New Delhi",
    price: 10000,
    rating: 4.91,
    tags: ["Heritage Monuments", "Costume Consultation", "High Res"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    emoji: "📸",
    category: "Photography",
    country: "India",
  },
  {
    id: "service-3",
    name: "Candid travel portraits by Anurag",
    location: "Old Delhi Bazaars, Delhi",
    price: 8000,
    rating: 4.89,
    tags: ["Street Portraits", "Local Guide Included", "Fast Delivery"],
    badge: "Top Rated",
    gradient: "linear-gradient(135deg, #e1eec3 0%, #f05053 100%)",
    emoji: "🤵",
    category: "Photography",
    country: "India",
  },
  {
    id: "service-4",
    name: "Intimate raw aesthetic photos in Delhi by bugzy",
    location: "Lodhi Art District, New Delhi",
    price: 5000,
    rating: 5.0,
    tags: ["Cinematic Vibe", "Urban Aesthetics", "Digital Gallery"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
    emoji: "⚡",
    category: "Photography",
    country: "India",
  },
  {
    id: "service-5",
    name: "Click with a Wink by AKfotography",
    location: "Hauz Khas Village, New Delhi",
    price: 8000,
    rating: 4.93,
    tags: ["Fun Vibe", "Group Friendly", "Social Media Edits"],
    badge: "Rare Find",
    gradient: "linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)",
    emoji: "✨",
    category: "Photography",
    country: "India",
  },
  {
    id: "service-6",
    name: "Cinematic captures by Kumar",
    location: "Sunder Nursery, New Delhi",
    price: 4500,
    rating: 4.78,
    tags: ["Insta Reels", "Video Snippets", "Gimbal Shots"],
    badge: "New",
    gradient: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)",
    emoji: "🎥",
    category: "Photography",
    country: "India",
  },
  {
    id: "service-7",
    name: "High-quality portraits by Rahul",
    location: "Saket Studio, New Delhi",
    price: 2800,
    rating: 4.85,
    tags: ["Studio Headshots", "Lighting Setup", "Edited Files"],
    badge: "New",
    gradient: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
    emoji: "👤",
    category: "Photography",
    country: "India",
  },
];

const SERVICES_LISTINGS_SWITZERLAND = [
  {
    id: "service-swiss-1",
    name: "Zurich Old Town Photo Shoot",
    location: "Zurich, Switzerland",
    price: 12000,
    rating: 5.0,
    tags: ["Outdoor Session", "Solo/Couple friendly", "90 Mins"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #1b2838 0%, #2a475e 100%)",
    emoji: "📷",
    category: "Photography",
    country: "Switzerland",
  },
  {
    id: "service-swiss-2",
    name: "Lucerne Lakeside Portraits by Marc",
    location: "Lucerne, Switzerland",
    price: 14500,
    rating: 4.93,
    tags: ["Lake & Chapel Bridge", "High Res", "Digital Gallery"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #0f233a 0%, #1f4268 100%)",
    emoji: "📸",
    category: "Photography",
    country: "Switzerland",
  },
  {
    id: "service-swiss-3",
    name: "Alpine Vibe Captures by Sarah",
    location: "Zermatt, Switzerland",
    price: 11000,
    rating: 4.96,
    tags: ["Mountain Scenic Shots", "Fast Delivery", "Edited Files"],
    badge: "Top Rated",
    gradient: "linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%)",
    emoji: "⚡",
    category: "Photography",
    country: "Switzerland",
  },
];

/*  Airbnb Experiences Listings  */
const EXPERIENCES_LISTINGS_INDIA = [
  {
    id: "exp-1",
    name: "Old Delhi Street Food & Rickshaw Tour",
    location: "Chandni Chowk, Delhi",
    price: 2200,
    rating: 4.98,
    tags: ["Food Tasting", "Rickshaw Ride", "Heritage Walk"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #e65c00 0%, #F9D423 100%)",
    emoji: "🍛",
    category: "Food",
    country: "India",
  },
  {
    id: "exp-2",
    name: "Taj Mahal Sunrise Tour from Delhi",
    location: "Delhi pick-up (tour to Agra)",
    price: 5500,
    rating: 4.99,
    tags: ["Private Car", "Taj Mahal Entry", "Tour Guide"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    emoji: "🕌",
    category: "Sightseeing",
    country: "India",
  },
];

const EXPERIENCES_LISTINGS_SWITZERLAND = [
  {
    id: "exp-swiss-1",
    name: "Lake Lucerne Scenic Boat Tour",
    location: "Lucerne, Switzerland",
    price: 3500,
    rating: 4.97,
    tags: ["Boat Cruise", "Scenic Views", "Chocolate Tasting"],
    badge: "Guest Favourite",
    gradient: "linear-gradient(135deg, #0e304d 0%, #1c527f 100%)",
    emoji: "🚢",
    category: "Sightseeing",
    country: "Switzerland",
  },
  {
    id: "exp-swiss-2",
    name: "Zermatt Chocolate & Cheese Fondue Walk",
    location: "Zermatt, Switzerland",
    price: 4200,
    rating: 4.99,
    tags: ["Food Walk", "Local Cheese", "Chocolate Workshop"],
    badge: "Superhost",
    gradient: "linear-gradient(135deg, #2e1d0f 0%, #52351c 100%)",
    emoji: "🧀",
    category: "Food",
    country: "Switzerland",
  },
];

/*  Bottom nav items definition with Lucide Icons  */
const NAV_ITEMS = [
  { id: "nav-explore", label: "Explore", icon: Compass },
  { id: "nav-wishlists", label: "Wishlists", icon: Heart },
  { id: "nav-trips", label: "Trips", icon: Map },
  { id: "nav-inbox", label: "Inbox", icon: Mail },
  { id: "nav-profile", label: "Profile", icon: User },
];

interface GeoInfo {
  city: string;
  regionName: string;
  country: string;
  currency: string;
  currencySymbol: string;
}

export default function Home() {
  const { theme, toggleTheme, isSystemTheme, resetToSystem, themeMode, setThemeMode } = useTheme();
  const [timeStr, setTimeStr] = useState("12:30");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  // Dynamic header height measurement for CSS stickiness
  useEffect(() => {
    const header = document.querySelector(".top-nav");
    if (!header) return;
    
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`
      );
    };
    
    updateHeaderHeight();
    
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  // Keyboard awareness: track visual viewport height on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vv = window.visualViewport;
    if (!vv) return;
    
    const handleVisualViewportResize = () => {
      document.documentElement.style.setProperty(
        "--visual-viewport-height",
        `${vv.height}px`
      );
    };
    
    vv.addEventListener("resize", handleVisualViewportResize);
    vv.addEventListener("scroll", handleVisualViewportResize);
    handleVisualViewportResize();
    
    return () => {
      vv.removeEventListener("resize", handleVisualViewportResize);
      vv.removeEventListener("scroll", handleVisualViewportResize);
    };
  }, []);
  // Explore sub-tabs: stays, experiences, services
  const [activeSubTab, setActiveSubTab] = useState<"stays" | "experiences" | "services">("stays");
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery("");
  }, [activeSubTab]);

  const [activeCategory, setActiveCategory] = useState("Cabins");
  const [activeServiceCategory, setActiveServiceCategory] = useState("Photography");
  const [activeNav, setActiveNav] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const scrollEl = document.querySelector(".app-scroll");
    if (scrollEl) {
      scrollEl.scrollTop = 0;
    }
    setHeaderScrolled(false);
  }, [activeNav]);
  
  // Interactive Search Filter states (prevents triggering AI)
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(20000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("Any");
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);

  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [activeTrip, setActiveTrip] = useState<any | null>(null);
  const [expandedTripId, setExpandedTripId] = useState<string | null>(null);
  const [userName, setUserName] = useState("John Doe");
  const [geoInfo, setGeoInfo] = useState<GeoInfo>({
    city: "New Delhi",
    regionName: "Delhi",
    country: "India",
    currency: "INR",
    currencySymbol: "₹",
  });
  const [isGeoLoaded, setIsGeoLoaded] = useState(false);
  
  // Start with mock listings initially as fallback; while calling API show loader
  const [listingsLoading, setListingsLoading] = useState(false);
  const [staysListings, setStaysListings] = useState<typeof STAYS_LISTINGS_INDIA>(STAYS_LISTINGS_INDIA);
  const [experiencesListings, setExperiencesListings] = useState<typeof EXPERIENCES_LISTINGS_INDIA>(EXPERIENCES_LISTINGS_INDIA);
  const [servicesListings, setServicesListings] = useState<typeof SERVICES_LISTINGS_INDIA>(SERVICES_LISTINGS_INDIA);

  // Auto-reset activeCategory when dynamic listings load and current selection has no matches
  useEffect(() => {
    const hasMatch = staysListings.some((l) => l.category === activeCategory);
    if (!hasMatch && staysListings.length > 0) {
      const orderedCats = STAYS_CATEGORIES.map((c) => c.label);
      const firstAvail = orderedCats.find((cat) =>
        staysListings.some((l) => l.category === cat)
      );
      if (firstAvail) setActiveCategory(firstAvail);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staysListings]);

  // Auto-reset activeServiceCategory when dynamic listings load and current selection has no matches
  useEffect(() => {
    const hasMatch = servicesListings.some((l) => l.category === activeServiceCategory);
    if (!hasMatch && servicesListings.length > 0) {
      const orderedCats = SERVICES_CATEGORIES.map((c) => c.label);
      const firstAvail = orderedCats.find((cat) =>
        servicesListings.some((l) => l.category === cat)
      );
      if (firstAvail) setActiveServiceCategory(firstAvail);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesListings]);

  // Helper to save trip to IndexedDB
  const saveTripToIndexedDB = (trip: any) => {
    try {
      const request = window.indexedDB.open("AnywhereDoorDB", 1);
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction("plans", "readwrite");
        const store = transaction.objectStore("plans");
        store.put(trip);
      };
    } catch (e) {
      console.error("IndexedDB save failed:", e);
    }
  };

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("airbnb-wishlist");
      if (saved) {
        setWishlistedIds(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Load all trips from IndexedDB on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const request = window.indexedDB.open("AnywhereDoorDB", 1);
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("plans")) {
          db.createObjectStore("plans", { keyPath: "id" });
        }
      };
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction("plans", "readonly");
        const store = transaction.objectStore("plans");
        const getReq = store.getAll();
        getReq.onsuccess = (e: any) => {
          const results = e.target.result || [];
          let loadedTrips = results.filter((r: any) => r.id !== "latest" && r.plan);
          const legacyLatest = results.find((r: any) => r.id === "latest");
          
          if (legacyLatest && loadedTrips.length === 0) {
            const convertedTrip = {
              id: "trip-legacy",
              title: legacyLatest.data.title || "My Trip",
              plan: legacyLatest.data,
              history: [],
              timestamp: Date.now()
            };
            loadedTrips = [convertedTrip];
            saveTripToIndexedDB(convertedTrip);
          }
          
          loadedTrips.sort((a: any, b: any) => (b.timestamp || 0) - (a.timestamp || 0));
          setTrips(loadedTrips);
          if (loadedTrips.length > 0) {
            setExpandedTripId(loadedTrips[0].id);
          }
        };
      };
    } catch (e) {
      console.error("Failed to load plans from IndexedDB:", e);
    }
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlistedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("airbnb-wishlist", JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  // Detect location via server-side API proxy to avoid CORS
  useEffect(() => {
    fetch(`/api/geolocation?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.country) {
          const symbolMap: Record<string, string> = {
            INR: "₹", USD: "$", EUR: "€", GBP: "£",
            AED: "د.إ", SGD: "S$", AUD: "A$", CAD: "C$",
            JPY: "¥", CNY: "¥", THB: "฿", MYR: "RM", CHF: "Fr.",
          };
          const countryCurrencyMap: Record<string, string> = {
            IN: "INR", US: "USD", GB: "GBP", DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
            AE: "AED", SG: "SGD", AU: "AUD", CA: "CAD", JP: "JPY", CN: "CNY", TH: "THB", MY: "MYR",
            CH: "CHF",
          };
          const currencyCode = countryCurrencyMap[data.countryCode] ?? "INR";
          const countryNames: Record<string, string> = {
            IN: "India",
            CH: "Switzerland",
            US: "United States",
            GB: "United Kingdom",
            DE: "Germany",
            FR: "France",
            IT: "Italy",
            ES: "Spain",
            NL: "Netherlands",
            AE: "United Arab Emirates",
            SG: "Singapore",
            AU: "Australia",
            CA: "Canada",
            JP: "Japan",
            CN: "China",
            TH: "Thailand",
            MY: "Malaysia",
          };
          const rawCountry = data.country || "India";
          const resolvedCountry = countryNames[rawCountry] ?? countryNames[data.countryCode] ?? rawCountry;
          const isSwiss = resolvedCountry === "Switzerland" || resolvedCountry === "CH";
          setStaysListings(isSwiss ? STAYS_LISTINGS_SWITZERLAND : STAYS_LISTINGS_INDIA);
          setExperiencesListings(isSwiss ? EXPERIENCES_LISTINGS_SWITZERLAND : EXPERIENCES_LISTINGS_INDIA);
          setServicesListings(isSwiss ? SERVICES_LISTINGS_SWITZERLAND : SERVICES_LISTINGS_INDIA);
          setGeoInfo({
            city: data.city ?? "Delhi",
            regionName: data.regionName ?? "",
            country: resolvedCountry,
            currency: currencyCode,
            currencySymbol: symbolMap[currencyCode] ?? currencyCode ?? "₹",
          });
        }
        setIsGeoLoaded(true);
      })
      .catch(() => {
        // Keep Indian defaults
        setIsGeoLoaded(true);
      });
  }, []);

  // Load dynamic listings for geolocated city
  useEffect(() => {
    if (!isGeoLoaded || !geoInfo.city) return;

    const CACHE_KEY = "airbnb-listings-cache-v3";
    const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

    // --- Check localStorage cache first ---
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        const sameLocation =
          cached.city?.toLowerCase() === geoInfo.city.toLowerCase() &&
          cached.country?.toLowerCase() === geoInfo.country.toLowerCase();
        const fresh = Date.now() - (cached.timestamp || 0) < CACHE_TTL_MS;

        if (sameLocation && fresh && cached.data) {
          console.log("Client listings cache HIT for:", geoInfo.city, geoInfo.country);
          const d = cached.data;
          const isSwiss = geoInfo.country === "Switzerland" || geoInfo.country === "CH";
          const fallbackStays = isSwiss ? STAYS_LISTINGS_SWITZERLAND : STAYS_LISTINGS_INDIA;
          const fallbackExperiences = isSwiss ? EXPERIENCES_LISTINGS_SWITZERLAND : EXPERIENCES_LISTINGS_INDIA;
          const fallbackServices = isSwiss ? SERVICES_LISTINGS_SWITZERLAND : SERVICES_LISTINGS_INDIA;
          setStaysListings(d.stays?.length > 0 ? d.stays : fallbackStays);
          setExperiencesListings(d.experiences?.length > 0 ? d.experiences : fallbackExperiences);
          setServicesListings(d.services?.length > 0 ? d.services : fallbackServices);
          setListingsLoading(false);
          return; // ← skip API call entirely
        }
      }
    } catch (_) {
      // Corrupt cache — continue to fetch
    }

    // --- Cache miss / expired / city changed → fetch API ---
    setListingsLoading(true);
    console.log("Client listings cache MISS — fetching /api/listings for:", geoInfo.city);

    const localTavilyKey = typeof window !== 'undefined' ? localStorage.getItem("tavily-api-key") || "" : "";
    const localUseTavily = typeof window !== 'undefined' ? localStorage.getItem("use-tavily") === "true" : false;

    fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: geoInfo.city,
        country: geoInfo.country,
        currency: geoInfo.currency,
        useTavily: localUseTavily || true,
        tavilyApiKey: localTavilyKey,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dynamic listings");
        return res.json();
      })
      .then((data) => {
        // Use dynamic data if valid — never mix with mock
        const isSwiss = geoInfo.country === "Switzerland" || geoInfo.country === "CH";
        const fallbackStays = isSwiss ? STAYS_LISTINGS_SWITZERLAND : STAYS_LISTINGS_INDIA;
        const fallbackExperiences = isSwiss ? EXPERIENCES_LISTINGS_SWITZERLAND : EXPERIENCES_LISTINGS_INDIA;
        const fallbackServices = isSwiss ? SERVICES_LISTINGS_SWITZERLAND : SERVICES_LISTINGS_INDIA;
        setStaysListings(data.stays?.length > 0 ? data.stays : fallbackStays);
        setExperiencesListings(data.experiences?.length > 0 ? data.experiences : fallbackExperiences);
        setServicesListings(data.services?.length > 0 ? data.services : fallbackServices);

        // Write to localStorage cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              city: geoInfo.city,
              country: geoInfo.country,
              timestamp: Date.now(),
              data,
            })
          );
          console.log("Client listings cache WRITTEN for:", geoInfo.city);
        } catch (_) {
          // Storage quota exceeded — no-op
        }
      })
      .catch((err) => {
        // Full mock fallback on any error — never a partial/mixed state
        console.error("Dynamic listings failed, falling back to full mock data:", err);
        const isSwiss = geoInfo.country === "Switzerland" || geoInfo.country === "CH";
        setStaysListings(isSwiss ? STAYS_LISTINGS_SWITZERLAND : STAYS_LISTINGS_INDIA);
        setExperiencesListings(isSwiss ? EXPERIENCES_LISTINGS_SWITZERLAND : EXPERIENCES_LISTINGS_INDIA);
        setServicesListings(isSwiss ? SERVICES_LISTINGS_SWITZERLAND : SERVICES_LISTINGS_INDIA);
      })
      .finally(() => {
        setListingsLoading(false);
      });
  }, [geoInfo.city, geoInfo.country, isGeoLoaded]);

  // Offline Exchange Rates relative to INR (base rate = 1.0)
  const EXCHANGE_RATES: Record<string, number> = {
    INR: 1.0,
    USD: 85.0,
    EUR: 92.0,
    GBP: 108.0,
    CHF: 95.0,
    AED: 23.1,
    SGD: 63.0,
    AUD: 56.5,
    CAD: 62.0,
    JPY: 0.55,
    CNY: 11.8,
  };

  const parseNumericPrice = (priceVal: any): number => {
    if (typeof priceVal === "number") return priceVal;
    if (!priceVal || typeof priceVal !== "string") return 0;
    if (priceVal.toLowerCase().includes("free")) return 0;
    const clean = priceVal.replace(/₹/g, "").replace(/,/g, "").replace(/\s/g, "");
    const match = clean.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Convert static prices based on currency symbol detected
  const getFormattedPrice = (inrPrice: number) => {
    if (inrPrice <= 0) return "Free";
    const rate = EXCHANGE_RATES[geoInfo.currency] || 1.0;
    const symbol = geoInfo.currencySymbol;
    const converted = Math.round(inrPrice / rate);
    
    if (symbol === "Fr." || symbol === "CHF") {
      return `Fr. ${converted.toLocaleString("en-US")}`;
    }
    if (symbol === "₹") {
      return `₹${converted.toLocaleString("en-IN")}`;
    }
    return `${symbol}${converted.toLocaleString("en-US")}`;
  };

  // Helper to replace static/hardcoded cities in listings with the geolocated city name
  const getDynamicLocation = (location: string, country: string) => {
    const city = geoInfo.city || "New Delhi";
    const userCountry = geoInfo.country || "India";

    if (country && country !== userCountry) {
      return `${location.split(",")[0]}, ${city}`;
    }

    if (userCountry !== "Switzerland") {
      if (location.includes("Goa")) return `Beachfront, ${city}`;
      if (location.includes("Varkala") || location.includes("Kerala")) return `Lakeside Beach, ${city}`;
      if (location.includes("Jibhi") || location.includes("Himachal")) return `Pine Hills, ${city}`;
      if (location.includes("Udaipur") || location.includes("Rajasthan") || location.includes("Jodhpur")) return `Heritage Zone, ${city}`;
      if (location.includes("Gurugram") || location.includes("Haryana")) return `Downtown, ${city}`;
      if (location.includes("Coorg") || location.includes("Karnataka")) return `Countryside, ${city}`;
      if (location.includes("Delhi") || location.includes("New Delhi") || location.includes("Chandni Chowk")) {
        if (location.includes("Chandni Chowk")) return `Market Area, ${city}`;
        if (location.includes("Connaught Place")) return `City Center, ${city}`;
        if (location.includes("Humayun")) return `Historic Garden, ${city}`;
        if (location.includes("Lodhi")) return `Art District, ${city}`;
        if (location.includes("Hauz Khas")) return `Lake Village, ${city}`;
        if (location.includes("Sunder Nursery")) return `Heritage Park, ${city}`;
        if (location.includes("Saket")) return `Studio Zone, ${city}`;
        return `Central, ${city}`;
      }
      return `${location.split(",")[0]}, ${city}`;
    } else {
      if (location.includes("Lausanne")) return `Lakeside, ${city}`;
      if (location.includes("Montreux")) return `Riviera, ${city}`;
      if (location.includes("Zermatt")) return `Alpine Village, ${city}`;
      if (location.includes("Grindelwald")) return `Glacier Valley, ${city}`;
      if (location.includes("Geneva")) return `Downtown, ${city}`;
      if (location.includes("Lugano")) return `Lakefront, ${city}`;
      if (location.includes("Verbier")) return `Ski Resort, ${city}`;
      if (location.includes("Zurich")) return `Old Town, ${city}`;
      if (location.includes("Lucerne")) return `Lake Shore, ${city}`;
      return `${location.split(",")[0]}, ${city}`;
    }
  };

  const getDynamicName = (name: string, country: string) => {
    const city = geoInfo.city || "New Delhi";
    let updated = name;
    updated = updated.replace(/New Delhi/g, city);
    updated = updated.replace(/Delhi/g, city);
    updated = updated.replace(/Zurich/g, city);
    updated = updated.replace(/Lucerne/g, city);
    updated = updated.replace(/Zermatt/g, city);
    updated = updated.replace(/Geneva/g, city);
    updated = updated.replace(/Goa/g, city);
    updated = updated.replace(/Varkala/g, city);
    updated = updated.replace(/Jibhi/g, city);
    updated = updated.replace(/Udaipur/g, city);
    updated = updated.replace(/Gurugram/g, city);
    updated = updated.replace(/Coorg/g, city);
    updated = updated.replace(/Alleppey/g, city);
    updated = updated.replace(/Jodhpur/g, city);

    if (updated.includes("Taj Mahal Sunrise Tour")) {
      updated = `Scenic Sunrise Landmark Tour from ${city}`;
    }
    return updated;
  };

  // Dynamic stays filtering based on interactive filters + category
  const filteredStays = staysListings.filter((l) => {

    if (l.category !== activeCategory) return false;
    if (l.price > maxPriceFilter) return false;
    if (selectedPropertyType !== "Any") {
      const matchesType = l.name.toLowerCase().includes(selectedPropertyType.toLowerCase()) || 
                          l.tags.some(t => t.toLowerCase().includes(selectedPropertyType.toLowerCase()));
      if (!matchesType) return false;
    }
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every((amenity) =>
        l.tags.some((tag) => tag.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAllAmenities) return false;
    }
    if (minRatingFilter > 0 && l.rating < minRatingFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesSearch = l.name.toLowerCase().includes(q) ||
                            l.location.toLowerCase().includes(q) ||
                            (l.tags && l.tags.some(t => t.toLowerCase().includes(q)));
      if (!matchesSearch) return false;
    }
    return true;
  });

  // Dynamic experiences filtering based on interactive filters
  const filteredExperiences = experiencesListings.filter((l) => {

    if (l.price > maxPriceFilter) return false;
    if (minRatingFilter > 0 && l.rating < minRatingFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesSearch = l.name.toLowerCase().includes(q) ||
                            l.location.toLowerCase().includes(q) ||
                            (l.tags && l.tags.some(t => t.toLowerCase().includes(q)));
      if (!matchesSearch) return false;
    }
    return true;
  });

  // Dynamic services filtering based on category + interactive filters
  const filteredServices = servicesListings.filter((l) => {

    if (l.category !== activeServiceCategory) return false;
    if (l.price > maxPriceFilter) return false;
    if (minRatingFilter > 0 && l.rating < minRatingFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesSearch = l.name.toLowerCase().includes(q) ||
                            l.location.toLowerCase().includes(q) ||
                            (l.tags && l.tags.some(t => t.toLowerCase().includes(q)));
      if (!matchesSearch) return false;
    }
    return true;
  });
  
  const isOverlayOpen = drawerOpen || filterModalOpen;
  // Clean all listings matching stays, services, and experiences for wishlist displays
  const getFullListingDetails = (id: string) => {
    // 1. Check standard listings first
    const standard = (
      staysListings.find((l) => l.id === id) ||
      servicesListings.find((l) => l.id === id) ||
      experiencesListings.find((l) => l.id === id)
    );
    if (standard) return standard;

    // 2. Check all saved trips (IndexedDB loaded plans)
    for (const trip of trips) {
      const plan = trip.plan;
      if (!plan) continue;

      // Check stays inside the trip plan
      const tripStays = plan.stays || plan.listings || [];
      const stayIdx = tripStays.findIndex((_: any, idx: number) => `stay-ai-${trip.id}-${idx}` === id);
      if (stayIdx !== -1) {
        const item = tripStays[stayIdx];
        return {
          id,
          name: item.name,
          location: item.location,
          price: parseNumericPrice(item.price),
          rating: item.rating,
          tagline: item.highlights,
          tags: [],
          badge: item.badge,
          category: "Cabins",
          country: item.country || "",
          gradient: item.gradient || "linear-gradient(135deg, #1e110a 0%, #3a2214 50%, #52311d 100%)",
          emoji: item.emoji || "🏡",
        };
      }

      // Check experiences inside the trip plan
      const tripExperiences = plan.experiences || [];
      const expIdx = tripExperiences.findIndex((_: any, idx: number) => `exp-ai-${trip.id}-${idx}` === id);
      if (expIdx !== -1) {
        const item = tripExperiences[expIdx];
        return {
          id,
          name: item.name,
          location: item.location,
          price: parseNumericPrice(item.price),
          rating: item.rating,
          tagline: item.highlights,
          tags: [],
          badge: item.badge,
          category: "Experiences",
          country: item.country || "",
          gradient: item.gradient || "linear-gradient(135deg, #0a2a1a 0%, #0f3d25 50%, #1a5c35 100%)",
          emoji: item.emoji || "🏔️",
        };
      }

      // Check services inside the trip plan
      const tripServices = plan.services || [];
      const svcIdx = tripServices.findIndex((_: any, idx: number) => `service-ai-${trip.id}-${idx}` === id);
      if (svcIdx !== -1) {
        const item = tripServices[svcIdx];
        return {
          id,
          name: item.name,
          location: item.location,
          price: parseNumericPrice(item.price),
          rating: item.rating,
          tagline: item.highlights,
          tags: [],
          badge: item.badge,
          category: "Photography",
          country: item.country || "",
          gradient: item.gradient || "linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #3d2470 100%)",
          emoji: item.emoji || "📷",
        };
      }
    }

    return null;
  };

  const sectionTitle =
    activeSubTab === "services"
      ? `${activeServiceCategory} in ${geoInfo.city}`
      : activeSubTab === "experiences"
      ? `Popular experiences near ${geoInfo.city}`
      : geoInfo.country === "India"
      ? `Popular homes near ${geoInfo.city}`
      : `Top picks in ${geoInfo.country}`;

  return (
    <div className="phone-shell">
      <div className={`phone-frame${isOverlayOpen ? " overlay-open" : ""}`}>
        {/*  Status Bar  */}
        <div className="status-bar">
          <span className="status-time">{timeStr}</span>
          <div className="status-icons">
            {/* Signal */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="1" y="16" width="3" height="6" rx="0.5" />
              <rect x="6" y="12" width="3" height="10" rx="0.5" />
              <rect x="11" y="8" width="3" height="14" rx="0.5" />
              <rect x="16" y="4" width="3" height="18" rx="0.5" opacity="0.4" />
              <rect x="21" y="1" width="3" height="21" rx="0.5" opacity="0.2" />
            </svg>
            {/* Battery */}
            <svg width="20" height="12" viewBox="0 0 24 14" fill="none">
              <rect x="0.5" y="0.5" width="20" height="13" rx="3.5" stroke="currentColor" strokeOpacity="0.5" />
              <rect x="2" y="2" width="14" height="10" rx="2" fill="currentColor" />
              <path d="M22 5v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        {/*  Scrollable Content  */}
        <div 
          className="app-scroll"
          onScroll={(e) => {
            const isScrolled = e.currentTarget.scrollTop > 15;
            if (isScrolled !== headerScrolled) {
              setHeaderScrolled(isScrolled);
            }
          }}
        >
          {/*  Top Header (Responsive: Mobile & Desktop)  */}
          <div className={`top-nav${activeNav !== 0 ? " mobile-hide" : ""}`} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <div 
              className="logo" 
              onClick={() => { setActiveNav(0); setActiveSubTab("stays"); }}
              style={{ cursor: "pointer" }}
            >
              <span className="deck-logo">airbnb ✕ GenAI</span>
            </div>



            {/* Center: Desktop-only Subtabs */}
            <div className="desktop-subtabs">
              <button 
                className={`desktop-subtab-btn${activeSubTab === "stays" && activeNav === 0 ? " active" : ""}`}
                onClick={() => { setActiveSubTab("stays"); setActiveNav(0); }}
              >
                Homes
              </button>
              <button 
                className={`desktop-subtab-btn${activeSubTab === "experiences" && activeNav === 0 ? " active" : ""}`}
                onClick={() => { setActiveSubTab("experiences"); setActiveNav(0); }}
              >
                Experiences
              </button>
              <button 
                className={`desktop-subtab-btn${activeSubTab === "services" && activeNav === 0 ? " active" : ""}`}
                onClick={() => { setActiveSubTab("services"); setActiveNav(0); }}
              >
                Services
              </button>
            </div>

            {/* Right: Desktop Menu + Theme Toggle */}
            <div className="desktop-nav-right">
              <div className="desktop-menu">
                <button className={activeNav === 1 ? "active" : ""} onClick={() => setActiveNav(1)}>Wishlists</button>
                <button className={activeNav === 2 ? "active" : ""} onClick={() => setActiveNav(2)}>Trips</button>
                <button className={activeNav === 3 ? "active" : ""} onClick={() => setActiveNav(3)}>Inbox</button>
                <button className={activeNav === 4 ? "active" : ""} onClick={() => setActiveNav(4)}>Profile</button>
              </div>
              
              <button
                id="theme-toggle-btn"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Switch Theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>
          {/* TAB 0: EXPLORE */}
          {activeNav === 0 && (
            <>

              {/* Header Sub-Tabs (Stays, Experiences, Services) */}
              <div className="explore-subtabs">
                <button
                  className={`subtab-btn${activeSubTab === "stays" ? " active" : ""}`}
                  onClick={() => setActiveSubTab("stays")}
                >
                  <div className="subtab-icon-wrapper">
                    <StaysIconSVG />
                  </div>
                  <span className="subtab-label">Stays</span>
                </button>
                <button
                  className={`subtab-btn${activeSubTab === "experiences" ? " active" : ""}`}
                  onClick={() => setActiveSubTab("experiences")}
                >
                  <div className="subtab-icon-wrapper">
                    <ExperiencesIconSVG />
                  </div>
                  <span className="subtab-label">Experiences</span>
                </button>
                <button
                  className={`subtab-btn${activeSubTab === "services" ? " active" : ""}`}
                  onClick={() => setActiveSubTab("services")}
                >
                  <div className="subtab-icon-wrapper">
                    <ServicesIconSVG />
                  </div>
                  <span className="subtab-label">Services</span>
                </button>
              </div>

              {/*  SUBTAB 1: STAYS/HOMES  */}
              {activeSubTab === "stays" && (
                <>
                  <div className="sticky-header-wrapper">
                    {/* Search Bar */}
                    <div className="search-container">
                      <div
                        className="search-bar"
                        id="main-search-bar"
                      >
                        <Search className="search-icon" size={18} />
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search homes (e.g. Goa, Manali, Chalet...)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                          className="search-filter-btn" 
                          aria-label="Filters" 
                          id="filter-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilterModalOpen(true);
                          }}
                        >
                          <SlidersHorizontal size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Category Pills */}
                    <div className="categories-scroll" role="tablist" aria-label="Listing categories">
                      {STAYS_CATEGORIES.filter((cat) => 
                        listingsLoading || staysListings.some((l) => l.category === cat.label)
                      ).map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                          <button
                            key={cat.label}
                            id={`cat-${cat.label.toLowerCase()}`}
                            className={`category-pill${activeCategory === cat.label ? " active" : ""}`}
                            onClick={() => setActiveCategory(cat.label)}
                            role="tab"
                            aria-selected={activeCategory === cat.label}
                          >
                            <div className="category-pill-icon">
                              <IconComponent size={20} />
                            </div>
                            <span className="category-pill-label">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stays Grid */}
                  <div className="section-header">
                    <span className="section-title">{sectionTitle}</span>
                  </div>

                  <div className="listings-grid">
                    {listingsLoading
                      ? Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="listing-skeleton">
                            <div className="skeleton-image" />
                            <div className="skeleton-body">
                              <div className="skeleton-line wide" />
                              <div className="skeleton-line medium" />
                              <div className="skeleton-line narrow" />
                              <div className="skeleton-tags">
                                <div className="skeleton-tag" />
                                <div className="skeleton-tag" />
                              </div>
                            </div>
                          </div>
                        ))
                      : filteredStays.map((listing, i) => (
                          <ListingCard
                            key={listing.id}
                            id={listing.id}
                            name={getDynamicName(listing.name, listing.country || geoInfo.country)}
                            location={getDynamicLocation(listing.location, listing.country || geoInfo.country)}
                            price={getFormattedPrice(listing.price)}
                            type="stay"
                            rating={listing.rating}
                            tags={listing.tags}
                            badge={listing.badge}
                            gradient={listing.gradient}
                            emoji={listing.emoji}
                            index={i}
                            wishlisted={wishlistedIds.includes(listing.id)}
                            onWishlistToggle={() => toggleWishlist(listing.id)}
                          />
                        ))}
                  </div>
                </>
              )}

              {/*  SUBTAB 2: EXPERIENCES  */}
              {activeSubTab === "experiences" && (
                <>
                  <div className="sticky-header-wrapper">
                    <div className="search-container">
                      <div className="search-bar">
                        <Search className="search-icon" size={18} />
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search experiences (e.g. Food, Rickshaw...)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                          className="search-filter-btn" 
                          aria-label="Filters"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilterModalOpen(true);
                          }}
                        >
                          <SlidersHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Experiences Grid */}
                  <div className="section-header">
                    <span className="section-title">{sectionTitle}</span>
                  </div>

                  <div className="listings-grid">
                    {listingsLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="listing-skeleton">
                            <div className="skeleton-image" />
                            <div className="skeleton-body">
                              <div className="skeleton-line wide" />
                              <div className="skeleton-line medium" />
                              <div className="skeleton-line narrow" />
                              <div className="skeleton-tags">
                                <div className="skeleton-tag" />
                                <div className="skeleton-tag" />
                              </div>
                            </div>
                          </div>
                        ))
                      : filteredExperiences.map((listing, i) => (
                          <ListingCard
                            key={listing.id}
                            id={listing.id}
                            name={getDynamicName(listing.name, listing.country || geoInfo.country)}
                            location={getDynamicLocation(listing.location, listing.country || geoInfo.country)}
                            price={getFormattedPrice(listing.price)}
                            priceUnit="/ guest"
                            type="experience"
                            rating={listing.rating}
                            tags={listing.tags}
                            badge={listing.badge}
                            gradient={listing.gradient}
                            emoji={listing.emoji}
                            index={i}
                            wishlisted={wishlistedIds.includes(listing.id)}
                            onWishlistToggle={() => toggleWishlist(listing.id)}
                          />
                        ))}
                  </div>
                </>
              )}

              {/*  SUBTAB 3: SERVICES (AIRBNB SERVICES MOCKUP)  */}
              {activeSubTab === "services" && (
                <>
                  <div className="sticky-header-wrapper">
                    <div className="search-container">
                      <div className="search-bar">
                        <Search className="search-icon" size={18} />
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search services (e.g. Photographer...)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                          className="search-filter-btn" 
                          aria-label="Filters"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilterModalOpen(true);
                          }}
                        >
                          <SlidersHorizontal size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Services in New Delhi Section Header */}
                    <div className="section-header" style={{ paddingBottom: 6 }}>
                      <span className="section-title">Services in {geoInfo.city}</span>
                    </div>

                    {/* Category Scroll (Circular rounded images with counts) */}
                    <div className="services-scroll">
                      {SERVICES_CATEGORIES.filter((cat) =>
                        listingsLoading || servicesListings.some((l) => l.category === cat.label)
                      ).map((cat) => (
                        <button
                          key={cat.label}
                          className={`service-category-card${activeServiceCategory === cat.label ? " active" : ""}`}
                          onClick={() => cat.count !== "Coming soon" && setActiveServiceCategory(cat.label)}
                        >
                          <div className="service-category-image">
                            <img src={cat.img} alt={cat.label} />
                          </div>
                          <span className="service-category-label">{cat.label}</span>
                          <span className="service-category-count">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Services Listings Grid */}
                  <div className="section-header">
                    <span className="section-title">{sectionTitle}</span>
                  </div>

                  <div className="listings-grid">
                    {listingsLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="listing-skeleton">
                            <div className="skeleton-image" />
                            <div className="skeleton-body">
                              <div className="skeleton-line wide" />
                              <div className="skeleton-line medium" />
                              <div className="skeleton-line narrow" />
                              <div className="skeleton-tags">
                                <div className="skeleton-tag" />
                                <div className="skeleton-tag" />
                              </div>
                            </div>
                          </div>
                        ))
                      : filteredServices.map((listing, i) => (
                          <ListingCard
                            key={listing.id}
                            id={listing.id}
                            name={getDynamicName(listing.name, listing.country || geoInfo.country)}
                            location={getDynamicLocation(listing.location, listing.country || geoInfo.country)}
                            price={getFormattedPrice(listing.price)}
                            priceUnit={listing.category === "Photography" ? "/ session" : "/ service"}
                            type="service"
                            rating={listing.rating}
                            tags={listing.tags}
                            badge={listing.badge}
                            gradient={listing.gradient}
                            emoji={listing.emoji}
                            index={i}
                            wishlisted={wishlistedIds.includes(listing.id)}
                            onWishlistToggle={() => toggleWishlist(listing.id)}
                          />
                        ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* TAB 1: WISHLISTS */}
          {activeNav === 1 && (
            <div className="tab-container">
              <h1 className="tab-title">
                Wishlists
              </h1>

              {wishlistedIds.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", marginBottom: 16 }}>
                    <Heart size={28} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                    Create your first wishlist
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 260, lineHeight: "18px", marginBottom: 20 }}>
                    As you search, click the heart icon on your favorite places to save them here.
                  </p>
                  <button
                    onClick={() => setActiveNav(0)}
                    style={{ background: "var(--airbnb-coral)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", padding: "10px 20px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer" }}
                  >
                    Start exploring
                  </button>
                </div>
              ) : (
                <div className="listings-grid" style={{ padding: 0 }}>
                  {wishlistedIds.map((id, i) => {
                    const listing = getFullListingDetails(id);
                    if (!listing) return null;
                    return (
                      <ListingCard
                        key={listing.id}
                        id={listing.id}
                        name={getDynamicName(listing.name, listing.country || geoInfo.country)}
                        location={getDynamicLocation(listing.location, listing.country || geoInfo.country)}
                        price={getFormattedPrice(listing.price)}
                        priceUnit={
                          listing.id.startsWith("exp") 
                            ? "/ guest" 
                            : (listing.id.startsWith("service") 
                                ? (listing.category === "Photography" ? "/ session" : "/ service") 
                                : "/ night")
                        }
                        rating={listing.rating}
                        tagline={(listing as any).tagline}
                        tags={listing.tags}
                        badge={listing.badge}
                        gradient={listing.gradient}
                        emoji={listing.emoji}
                        index={i}
                        wishlisted={true}
                        onWishlistToggle={() => toggleWishlist(listing.id)}
                        type={
                          listing.id.startsWith("exp") 
                            ? "experience" 
                            : (listing.id.startsWith("service") ? "service" : "stay")
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TRIPS (INTEGRATED WITH AI) */}
          {activeNav === 2 && (
            <div className="tab-container">
              <h1 className="tab-title">
                Trips
              </h1>

              {trips.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", marginBottom: 16 }}>
                    <Map size={28} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                    No trips planned yet
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 260, lineHeight: "18px", marginBottom: 20 }}>
                    Use the Anywhere Door AI assistant to auto-generate customized itineraries, hotel matches, and splits.
                  </p>
                  <button
                    onClick={() => { setActiveTrip(null); setDrawerOpen(true); }}
                    style={{ background: "var(--airbnb-coral)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", padding: "10px 20px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, margin: "0 auto" }}
                  >
                    <Sparkles size={14} fill="currentColor" />
                    Open Anywhere Door
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
                    <button
                      onClick={() => { setActiveTrip(null); setDrawerOpen(true); }}
                      style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--airbnb-coral)", color: "#fff", border: "none", borderRadius: "var(--radius-full)", padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-display)" }}
                    >
                      <Sparkles size={12} fill="currentColor" />
                      Plan a New Trip
                    </button>
                  </div>

                  {trips.map((trip) => {
                    const isExpanded = expandedTripId === trip.id;
                    const plan = trip.plan;

                    return (
                      <div
                        key={trip.id}
                        className={`trip-accordion-item${isExpanded ? " expanded" : ""}`}
                      >
                        <div
                          className="trip-header-main"
                          onClick={() => setExpandedTripId(isExpanded ? null : trip.id)}
                        >
                          <div className="trip-header-left">
                            <span className="trip-title-text">
                              {trip.title}
                            </span>
                            <span className="trip-subtitle-text">
                              {plan.listings.length} items • {plan.itinerary.length} days • {plan.budget.total} total
                            </span>
                          </div>

                          <div className="trip-header-actions">
                            <button
                              className="trip-btn modify"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTrip(trip);
                                setDrawerOpen(true);
                              }}
                            >
                              <Sparkles size={12} fill="currentColor" />
                              AI Edit
                            </button>
                            <button
                              className="trip-btn delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextTrips = trips.filter(t => t.id !== trip.id);
                                setTrips(nextTrips);
                                if (expandedTripId === trip.id) {
                                  setExpandedTripId(nextTrips[0]?.id || null);
                                }
                                try {
                                  const request = window.indexedDB.open("AnywhereDoorDB", 1);
                                  request.onsuccess = (event: any) => {
                                    const db = event.target.result;
                                    const transaction = db.transaction("plans", "readwrite");
                                    const store = transaction.objectStore("plans");
                                    store.delete(trip.id);
                                  };
                                } catch (err) {
                                  console.error("IndexedDB delete failed:", err);
                                }
                              }}
                              aria-label="Delete trip"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="trip-content-details">
                            {plan.message && (
                              <div style={{
                                fontSize: 12,
                                color: "var(--text-secondary)",
                                background: "var(--bg-glass)",
                                padding: "10px 14px",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-subtle)",
                                marginBottom: 16,
                                lineHeight: "1.5"
                              }}>
                                {plan.message}
                              </div>
                            )}

                            {/* Stays */}
                            {((plan.stays && plan.stays.length > 0) || (plan.listings && plan.listings.length > 0)) && (
                              <>
                                <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
                                  <Sparkles size={16} style={{ color: "var(--airbnb-coral)" }} />
                                  <span>Top Stays</span>
                                </div>
                                <div className="listings-grid" style={{ padding: 0, gap: 16, marginBottom: 20 }}>
                                  {(plan.stays || plan.listings || []).map((listing: any, idx: number) => {
                                    const cardId = `stay-ai-${trip.id}-${idx}`;
                                    return (
                                      <ListingCard
                                        key={listing.name}
                                        id={cardId}
                                        name={listing.name}
                                        location={listing.location}
                                        price={getFormattedPrice(parseNumericPrice(listing.price))}
                                        rating={listing.rating}
                                        tagline={listing.highlights}
                                        tags={[]}
                                        badge={listing.badge}
                                        index={idx}
                                        priceUnit="/ night"
                                        wishlisted={wishlistedIds.includes(cardId)}
                                        onWishlistToggle={() => toggleWishlist(cardId)}
                                        type="stay"
                                      />
                                    );
                                  })}
                                </div>
                              </>
                            )}

                            {/* Experiences */}
                            {plan.experiences && plan.experiences.length > 0 && (
                              <>
                                <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
                                  <Sparkles size={16} style={{ color: "var(--airbnb-coral)" }} />
                                  <span>Recommended Experiences</span>
                                </div>
                                <div className="listings-grid" style={{ padding: 0, gap: 16, marginBottom: 20 }}>
                                  {plan.experiences.map((listing: any, idx: number) => {
                                    const cardId = `exp-ai-${trip.id}-${idx}`;
                                    return (
                                      <ListingCard
                                        key={listing.name}
                                        id={cardId}
                                        name={listing.name}
                                        location={listing.location}
                                        price={getFormattedPrice(parseNumericPrice(listing.price))}
                                        rating={listing.rating}
                                        tagline={listing.highlights}
                                        tags={[]}
                                        badge={listing.badge}
                                        index={idx}
                                        priceUnit="/ guest"
                                        wishlisted={wishlistedIds.includes(cardId)}
                                        onWishlistToggle={() => toggleWishlist(cardId)}
                                        type="experience"
                                      />
                                    );
                                  })}
                                </div>
                              </>
                            )}

                            {/* Services */}
                            {plan.services && plan.services.length > 0 && (
                              <>
                                <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
                                  <Sparkles size={16} style={{ color: "var(--airbnb-coral)" }} />
                                  <span>Local Services</span>
                                </div>
                                <div className="listings-grid" style={{ padding: 0, gap: 16, marginBottom: 20 }}>
                                  {plan.services.map((listing: any, idx: number) => {
                                    const cardId = `service-ai-${trip.id}-${idx}`;
                                    return (
                                      <ListingCard
                                        key={listing.name}
                                        id={cardId}
                                        name={listing.name}
                                        location={listing.location}
                                        price={getFormattedPrice(parseNumericPrice(listing.price))}
                                        rating={listing.rating}
                                        tagline={listing.highlights}
                                        tags={[]}
                                        badge={listing.badge}
                                        index={idx}
                                        priceUnit={listing.category === "Photography" ? "/ session" : "/ service"}
                                        wishlisted={wishlistedIds.includes(cardId)}
                                        onWishlistToggle={() => toggleWishlist(cardId)}
                                        type="service"
                                      />
                                    );
                                  })}
                                </div>
                              </>
                            )}

                            {/* Daily Itinerary */}
                            <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <CalendarDays size={16} style={{ color: "var(--airbnb-coral)" }} />
                              <span>Itinerary</span>
                            </div>
                            {plan.itinerary.map((day: any) => (
                              <div key={day.day} className="itinerary-card">
                                <div className="itinerary-day-header">{day.day}</div>
                                <div className="itinerary-activities">
                                  {day.activities.map((act: any, j: number) => (
                                    <div className="itinerary-activity" key={j}>
                                      <span className="activity-time">{act.time}</span>
                                      <div className="activity-dot" />
                                      <span className="activity-text">{act.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}

                            {/* Cost Breakdown */}
                            <div className="results-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <CreditCard size={16} style={{ color: "var(--airbnb-coral)" }} />
                              <span>Cost Split Breakdown</span>
                            </div>
                            <div className="budget-card">
                              <div className="budget-title">💳 Plan Summary</div>
                              {[
                                { label: "Accommodation", value: plan.budget.accommodation },
                                { label: "Activities", value: plan.budget.activities },
                                { label: "Food & Dining", value: plan.budget.food },
                                { label: "Transport", value: plan.budget.transport },
                                { label: "Total Cost", value: plan.budget.total },
                              ].map((row) => (
                                <div className="budget-row" key={row.label}>
                                  <span className="budget-label">• {row.label}</span>
                                  <span className={`budget-value${row.label === "Total Cost" ? " total" : ""}`}>{row.value}</span>
                                </div>
                              ))}
                              <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "var(--radius-md)", fontSize: 13, color: "#34d399", fontWeight: 600, textAlign: "center" }}>
                                👥 {plan.budget.perPerson}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INBOX */}
          {activeNav === 3 && (
            <div className="tab-container">
              <h1 className="tab-title">
                Inbox
              </h1>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    title: "Airbnb Support",
                    msg: "Welcome to Airbnb Reimagined! Test our new AI Anywhere Door search bar.",
                    time: "Yesterday",
                    read: true,
                  },
                  {
                    title: "Gemini AI Concierge",
                    msg: "Need help planning a group trip or finding the best price? Type your request below.",
                    time: "2 days ago",
                    read: false,
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: 14, background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", cursor: "pointer", position: "relative" }}>
                    {!item.read && (
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--airbnb-coral)", position: "absolute", top: 16, right: 16 }} />
                    )}
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--airbnb-coral-glow)", color: "var(--airbnb-coral)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MessageSquare size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                          {item.title}
                        </span>
                        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{item.time}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: "16px" }}>{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeNav === 4 && (
            <div className="tab-container">
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--airbnb-coral)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>
                  {userName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "U"}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 800,
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px dashed var(--border-subtle)",
                      outline: "none",
                      color: "var(--text-primary)",
                      width: "100%",
                      padding: "2px 0"
                    }}
                    placeholder="Enter name"
                  />
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                    📍 {geoInfo.city}, {geoInfo.country}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", padding: "8px 0" }}>
                  Preferences
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Local Currency</span>
                  <select
                    value={geoInfo.currency}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      const symbolMap: Record<string, string> = {
                        INR: "₹", USD: "$", EUR: "€", GBP: "£", CHF: "Fr.",
                        AED: "د.إ", SGD: "S$", AUD: "A$", CAD: "C$", JPY: "¥", CNY: "¥"
                      };
                      setGeoInfo(prev => ({
                        ...prev,
                        currency: selectedVal,
                        currencySymbol: symbolMap[selectedVal] || selectedVal
                      }));
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--airbnb-coral)",
                      cursor: "pointer",
                      padding: "4px 8px",
                      textAlign: "right"
                    }}
                  >
                    <option value="INR" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>INR (₹)</option>
                    <option value="USD" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>USD ($)</option>
                    <option value="EUR" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>EUR (€)</option>
                    <option value="GBP" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>GBP (£)</option>
                    <option value="CHF" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>CHF (Fr.)</option>
                    <option value="AED" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>AED (د.إ)</option>
                    <option value="SGD" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>SGD (S$)</option>
                    <option value="AUD" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>AUD (A$)</option>
                    <option value="CAD" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>CAD (C$)</option>
                    <option value="JPY" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>JPY (¥)</option>
                    <option value="CNY" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>CNY (¥)</option>
                  </select>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Theme Mode</span>
                  <select
                    value={themeMode}
                    onChange={(e) => setThemeMode(e.target.value as any)}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--airbnb-coral)",
                      cursor: "pointer",
                      padding: "4px 8px",
                    }}
                  >
                    <option value="system" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>System Default</option>
                    <option value="light" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>Light</option>
                    <option value="dark" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>Dark</option>
                  </select>
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", padding: "16px 0 8px" }}>
                  Developer Controls
                </div>

                <a
                  href="/deck"
                  style={{ textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Strategy Slides (PDF Export)</span>
                  <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
                </a>

                <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", cursor: "pointer" }}>
                  <HelpCircle size={16} style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Support & Feedback</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*  Anywhere Door FAB (Themed matching var(--airbnb-coral) FAB center pill)  */}
        {activeNav === 0 && (
          <button
            className={`anywhere-door-fab${isOverlayOpen ? " hidden" : ""}`}
            onClick={() => setDrawerOpen(true)}
            id="anywhere-door-btn"
            aria-label="Open Anywhere Door AI travel planner"
          >
            <div className="fab-icon">
              <Sparkles size={14} fill="currentColor" />
            </div>
            <span>Anywhere Door</span>
          </button>
        )}

        {/*  Bottom Navigation  */}
        <nav className={`bottom-nav${isOverlayOpen ? " hidden" : ""}`} aria-label="Main navigation">
          {NAV_ITEMS.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                id={item.id}
                className={`nav-item${activeNav === i ? " active" : ""}`}
                onClick={() => setActiveNav(i)}
                aria-label={item.label}
              >
                <IconComponent size={20} />
                <span className="nav-item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/*  Anywhere Door Drawer  */}
        <AnywhereDoor
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          currency={geoInfo.currencySymbol}
          country={geoInfo.country}
          city={geoInfo.city}
          activeTrip={activeTrip}
          onPlanGenerated={(plan, history) => {
            if (!plan) return; // Reset/cleared search

            if (activeTrip) {
              // Modifying existing trip
              const updatedTrips = trips.map(t => {
                if (t.id === activeTrip.id) {
                  return {
                    ...t,
                    title: plan.title || t.title,
                    plan: plan,
                    history: history,
                    timestamp: Date.now()
                  };
                }
                return t;
              });
              setTrips(updatedTrips);
              saveTripToIndexedDB({
                id: activeTrip.id,
                title: plan.title || activeTrip.title,
                plan: plan,
                history: history,
                timestamp: Date.now()
              });
            } else {
              // Adding new trip
              const newTripId = "trip-" + Date.now();
              const newTrip = {
                id: newTripId,
                title: plan.title || `Trip to ${plan.listings[0]?.location.split(",")[0] || "Destination"}`,
                plan: plan,
                history: history,
                timestamp: Date.now()
              };
              setTrips([newTrip, ...trips]);
              setExpandedTripId(newTripId);
              saveTripToIndexedDB(newTrip);
            }
            setActiveNav(2); // Transition to Trips tab
          }}
        />

        {/*  Search Filters Modal  */}
        <div 
          className={`filter-overlay${filterModalOpen ? " open" : ""}`} 
          onClick={() => setFilterModalOpen(false)} 
          aria-hidden="true" 
        />
        <div 
          className={`filter-modal${filterModalOpen ? " open" : ""}`} 
          role="dialog" 
          aria-modal="true" 
          aria-label="Filter listings"
        >
          {/* Header */}
          <div className="filter-header">
            <h2>Filters</h2>
            <button className="filter-close" onClick={() => setFilterModalOpen(false)} aria-label="Close filters">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="filter-body">
            {/* Price Range Section */}
            <div className="filter-section">
              <div className="filter-section-title">Price Range</div>
              <div className="price-input-row">
                <div className="price-input-box">
                  <div className="price-input-label">Min price</div>
                  <div className="price-input-value">
                    <span>{geoInfo.currencySymbol}</span>
                    <span>0</span>
                  </div>
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: 18 }}>-</div>
                <div className="price-input-box">
                  <div className="price-input-label">Max price</div>
                  <div className="price-input-value">
                    <span>{geoInfo.currencySymbol}</span>
                    <span>{geoInfo.currencySymbol === "₹" ? maxPriceFilter.toLocaleString("en-IN") : Math.round(maxPriceFilter / 85).toLocaleString("en-US")}</span>
                  </div>
                </div>
              </div>
              <input 
                type="range" 
                min="1000"
                max="30000"
                step="500"
                value={maxPriceFilter} 
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="price-range-slider"
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                <span>Min: {geoInfo.currencySymbol === "₹" ? "₹1,000" : "$12"}</span>
                <span>Max: {geoInfo.currencySymbol === "₹" ? "₹30,000+" : "$350+"}</span>
              </div>
            </div>

            {/* Property Types Section (Only relevant for Stays) */}
            {activeSubTab === "stays" && (
              <div className="filter-section">
                <div className="filter-section-title">Property Type</div>
                <div className="property-types-grid">
                  {[
                    { label: "Any", icon: Globe },
                    { label: "House", icon: HomeIcon },
                    { label: "Villa", icon: Castle },
                    { label: "Cabin", icon: Mountain },
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <div 
                        key={type.label}
                        className={`property-type-card${selectedPropertyType === type.label ? " active" : ""}`}
                        onClick={() => setSelectedPropertyType(type.label)}
                      >
                        <Icon size={18} />
                        <span className="property-type-label">{type.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Amenities Section (Only relevant for Stays) */}
            {activeSubTab === "stays" && (
              <div className="filter-section">
                <div className="filter-section-title">Amenities</div>
                <div className="amenities-grid">
                  {[
                    { label: "Pool", value: "Pool" },
                    { label: "Air Conditioning", value: "AC" },
                    { label: "Personal Chef", value: "Chef" },
                    { label: "Scenic View", value: "View" },
                    { label: "Pets Allowed", value: "Pets" },
                  ].map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity.value);
                    return (
                      <label 
                        key={amenity.value}
                        className={`amenity-checkbox-label${isSelected ? " active" : ""}`}
                      >
                        <input 
                          type="checkbox"
                          className="amenity-checkbox-input"
                          checked={isSelected}
                          onChange={() => {
                            setSelectedAmenities(prev => 
                              prev.includes(amenity.value)
                                ? prev.filter(a => a !== amenity.value)
                                : [...prev, amenity.value]
                            );
                          }}
                        />
                        <span>{amenity.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Minimum Rating Section */}
            <div className="filter-section">
              <div className="filter-section-title">Minimum Rating</div>
              <div className="ratings-row">
                {[
                  { label: "Any", value: 0 },
                  { label: "4.5★+", value: 4.5 },
                  { label: "4.8★+", value: 4.8 },
                  { label: "4.9★+", value: 4.9 },
                ].map((rating) => (
                  <button
                    key={rating.value}
                    className={`rating-pill-btn${minRatingFilter === rating.value ? " active" : ""}`}
                    onClick={() => setMinRatingFilter(rating.value)}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="filter-footer">
            <button 
              className="clear-all-btn"
              onClick={() => {
                setMaxPriceFilter(20000);
                setSelectedAmenities([]);
                setSelectedPropertyType("Any");
                setMinRatingFilter(0);
              }}
            >
              Clear all
            </button>
            <button 
              className="apply-filters-btn"
              onClick={() => setFilterModalOpen(false)}
            >
              Show {
                activeSubTab === "stays" 
                  ? `${filteredStays.length} homes` 
                  : activeSubTab === "experiences" 
                  ? `${filteredExperiences.length} experiences` 
                  : `${filteredServices.length} services`
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
