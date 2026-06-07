import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface TavilyCacheEntry {
  answer: string;
  results: Array<{ title: string; content: string; url: string }>;
  cachedAt: number;
}

// Server-side in-memory cache for Tavily grounding searches (24h TTL to respect free tier quotas)
const tavilyCache = new Map<string, TavilyCacheEntry>();
const TAVILY_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const getMockResponse = (prompt: string, currencySymbol: string, country: string) => {
  const isInr = currencySymbol === "₹";
  const p = prompt.toLowerCase();

  // 1. GOA
  if (p.includes("goa")) {
    return {
      listings: [
        {
          name: "Coconut Grove Beach Villa",
          location: "Goa, North Goa",
          price: isInr ? "₹9,500/night" : "$110/night",
          rating: 4.97,
          highlights: "Stunning beach views, private pool, and local chef services included.",
          badge: "Guest Favourite",
        },
        {
          name: "Heritage Anjuna Portuguese Villa",
          location: "Anjuna, Goa",
          price: isInr ? "₹7,800/night" : "$90/night",
          rating: 4.91,
          highlights: "Beautifully restored Portuguese home with lush gardens and shared pool.",
          badge: "Superhost",
        },
        {
          name: "Sunset Sea-View Penthouse",
          location: "Candolim, Goa",
          price: isInr ? "₹4,200/night" : "$50/night",
          rating: 4.85,
          highlights: "Cosy apartment overlooking the Arabian Sea, walking distance to beach.",
          badge: "Top Rated",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Arrival & Beach Sunset",
          activities: [
            { time: "Afternoon", description: "Check in at your beach property and freshen up." },
            { time: "Evening", description: "Sunset walk on Candolim beach followed by beachside shacks dinner." },
            { time: "Night", description: "Enjoy live music and local fenny cocktails in Panaji." },
          ],
        },
        {
          day: "Day 2 - Heritage Tour & Spice Plantation",
          activities: [
            { time: "Morning", description: "Visit Basilica of Bom Jesus and Old Goa churches." },
            { time: "Afternoon", description: "Traditional buffet lunch at Sahakari Spice Farm." },
            { time: "Evening", description: "Scenic Mandovi River sunset cruise with Goan folk dance." },
          ],
        },
        {
          day: "Day 3 - Water Sports & Departure",
          activities: [
            { time: "Morning", description: "Parasailing and jet skiing at Baga Beach." },
            { time: "Afternoon", description: "Local fish curry thali lunch." },
            { time: "Evening", description: "Final souvenir shopping before departure." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹28,500" : "$330",
        activities: isInr ? "₹6,000" : "$70",
        food: isInr ? "₹9,000" : "$100",
        transport: isInr ? "₹3,500" : "$40",
        total: isInr ? "₹47,000" : "$540",
        perPerson: isInr ? "₹23,500 / person (2 guests)" : "$270 / person (2 guests)",
      },
    };
  }

  // 2. MANALI / JIBHI / HIMACHAL
  if (p.includes("manali") || p.includes("jibhi") || p.includes("himachal") || p.includes("cabin") || p.includes("chalet")) {
    return {
      listings: [
        {
          name: "Snow Peak Forest Chalet",
          location: "Manali, Himachal Pradesh",
          price: isInr ? "₹6,800/night" : "$80/night",
          rating: 4.93,
          highlights: "Cosy pine-wood cabin with fireplace and panoramic Himalayan views.",
          badge: "Top Rated",
        },
        {
          name: "Riverside A-Frame Cabin",
          location: "Jibhi, Himachal Pradesh",
          price: isInr ? "₹5,200/night" : "$60/night",
          rating: 4.94,
          highlights: "Riverside wooden cottage, wooden deck, bonfire area under pine trees.",
          badge: "Rare Find",
        },
        {
          name: "Solang Valley Ski Resort Room",
          location: "Solang, Manali",
          price: isInr ? "₹4,500/night" : "$55/night",
          rating: 4.78,
          highlights: "Perfect ski chalet room, close to slopes, beautiful valley views.",
          badge: "Superhost",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Arrival & Solang Valley Views",
          activities: [
            { time: "Afternoon", description: "Arrive in Manali, check in to your chalet and enjoy hot chai." },
            { time: "Evening", description: "Stroll along Mall Road and buy local woollens." },
            { time: "Night", description: "Cosy dinner by the fireplace." },
          ],
        },
        {
          day: "Day 2 - Paragliding & Jogini Waterfall Trek",
          activities: [
            { time: "Morning", description: "Paragliding in Solang Valley." },
            { time: "Afternoon", description: "Scenic trek to Jogini Waterfalls near Vashisht village." },
            { time: "Evening", description: "Dip in Vashisht hot springs to relax." },
          ],
        },
        {
          day: "Day 3 - Solang Valley Skiing & Departure",
          activities: [
            { time: "Morning", description: "Skiing session or cable car ride." },
            { time: "Afternoon", description: "Café hopping in Old Manali." },
            { time: "Evening", description: "Depart back to Delhi." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹27,200" : "$320",
        activities: isInr ? "₹12,000" : "$140",
        food: isInr ? "₹10,000" : "$120",
        transport: isInr ? "₹8,000" : "$95",
        total: isInr ? "₹57,200" : "$675",
        perPerson: isInr ? "₹14,300 / person (4 guests)" : "$168.75 / person (4 guests)",
      },
    };
  }

  // 3. KERALA / ALLEPPEY / VARKALA
  if (p.includes("kerala") || p.includes("alleppey") || p.includes("varkala") || p.includes("houseboat")) {
    return {
      listings: [
        {
          name: "Clifftop Infinity Retreat",
          location: "Varkala, Kerala",
          price: isInr ? "₹6,200/night" : "$75/night",
          rating: 4.95,
          highlights: "Breathtaking views from Varkala cliff, private yoga sessions.",
          badge: "Superhost",
        },
        {
          name: "Backwater Houseboat Suite",
          location: "Alleppey, Kerala",
          price: isInr ? "₹8,200/night" : "$100/night",
          rating: 4.93,
          highlights: "Traditional luxury houseboat with personal chef, backwater tour.",
          badge: "Guest Favourite",
        },
        {
          name: "Heritage Coconut Grove Villa",
          location: "Kumarakom, Kerala",
          price: isInr ? "₹7,500/night" : "$90/night",
          rating: 4.94,
          highlights: "Authentic Kerala cottage with outdoor shower and lakefront garden.",
          badge: "Rare Find",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Trivandrum to Varkala Cliff",
          activities: [
            { time: "Afternoon", description: "Drive to Varkala and check in to your clifftop room." },
            { time: "Evening", description: "Explore the clifftop shops and watch sunset over the Arabian Sea." },
            { time: "Night", description: "Candlelit seafood dinner at a cliff café." },
          ],
        },
        {
          day: "Day 2 - Alleppey Backwater Cruise",
          activities: [
            { time: "Morning", description: "Drive to Alleppey and board your luxury houseboat." },
            { time: "Afternoon", description: "Cruise through narrow canals with traditional lunch served on board." },
            { time: "Evening", description: "Watch backwater village life at sunset." },
          ],
        },
        {
          day: "Day 3 - Sunrise Yoga & Departure",
          activities: [
            { time: "Morning", description: "Sunrise beach yoga session." },
            { time: "Afternoon", description: "Traditional Sadya lunch served on banana leaf." },
            { time: "Evening", description: "Depart for Trivandrum airport." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹24,600" : "$300",
        activities: isInr ? "₹5,000" : "$60",
        food: isInr ? "₹7,500" : "$90",
        transport: isInr ? "₹4,000" : "$50",
        total: isInr ? "₹41,100" : "$500",
        perPerson: isInr ? "₹41,100 / person (1 guest)" : "$500 / person (1 guest)",
      },
    };
  }

  // 4. JAIPUR / UDAIPUR / RAJASTHAN / HERITAGE
  if (p.includes("jaipur") || p.includes("udaipur") || p.includes("rajasthan") || p.includes("heritage") || p.includes("palace") || p.includes("castle")) {
    return {
      listings: [
        {
          name: "Lakeside Heritage Palace",
          location: "Udaipur, Rajasthan",
          price: isInr ? "₹18,500/night" : "$220/night",
          rating: 4.99,
          highlights: "Royal heritage palace on Lake Pichola, private pool and butler service.",
          badge: "Guest Favourite",
        },
        {
          name: "Fortress Heritage Hotel",
          location: "Jodhpur, Rajasthan",
          price: isInr ? "₹11,500/night" : "$135/night",
          rating: 4.95,
          highlights: "Historic fortress hotel with fort view and ethnic Rajasthani decor.",
          badge: "Superhost",
        },
        {
          name: "Pink City Haveli Suite",
          location: "Jaipur, Rajasthan",
          price: isInr ? "₹5,800/night" : "$70/night",
          rating: 4.90,
          highlights: "Traditional Haveli room with inner courtyard, close to Hawa Mahal.",
          badge: "Top Rated",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Jaipur Palace & Amer Fort",
          activities: [
            { time: "Afternoon", description: "Arrive in Jaipur, check in to your Haveli." },
            { time: "Evening", description: "Visit Amer Fort and watch the light and sound show." },
            { time: "Night", description: "Traditional Rajasthani thali dinner at Chokhi Dhani." },
          ],
        },
        {
          day: "Day 2 - Hawa Mahal & Bazaars",
          activities: [
            { time: "Morning", description: "Photoshoot at Hawa Mahal and visit City Palace." },
            { time: "Afternoon", description: "Shopping in Johari Bazaar for handicrafts." },
            { time: "Evening", description: "Sunset views from Nahargarh Fort." },
          ],
        },
        {
          day: "Day 3 - Sunrise Balloon & Departure",
          activities: [
            { time: "Morning", description: "Sunrise hot air balloon ride over the fort." },
            { time: "Afternoon", description: "Lassi tasting at Lassiwala." },
            { time: "Evening", description: "Depart for airport." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹34,800" : "$420",
        activities: isInr ? "₹9,000" : "$110",
        food: isInr ? "₹11,000" : "$130",
        transport: isInr ? "₹5,000" : "$60",
        total: isInr ? "₹59,800" : "$720",
        perPerson: isInr ? "₹19,933 / person (3 guests)" : "$240 / person (3 guests)",
      },
    };
  }

  // 5. MIAMI / BEACH HOUSE
  if (p.includes("miami")) {
    return {
      listings: [
        {
          name: "Miami Oceanfront Beach House",
          location: "Miami Beach, Florida",
          price: isInr ? "₹38,200/night" : "$450/night",
          rating: 4.94,
          highlights: "Stunning private beach house with pool, direct sand access.",
          badge: "Guest Favourite",
        },
        {
          name: "Modern Wynwood Penthouse",
          location: "Miami, Florida",
          price: isInr ? "₹23,800/night" : "$280/night",
          rating: 4.88,
          highlights: "Sleek loft in the art district, private rooftop terrace.",
          badge: "Superhost",
        },
        {
          name: "Coconut Grove Garden Villa",
          location: "Miami, Florida",
          price: isInr ? "₹29,700/night" : "$350/night",
          rating: 4.92,
          highlights: "Tropical lush gardens, private jacuzzi, and pool.",
          badge: "Rare Find",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Arrival & Ocean Drive",
          activities: [
            { time: "Afternoon", description: "Check in at your beach property and enjoy the pool." },
            { time: "Evening", description: "Sunset walk on South Beach and explore art deco buildings." },
            { time: "Night", description: "Dinner and tropical drinks on Ocean Drive." },
          ],
        },
        {
          day: "Day 2 - Wynwood Walls & Sunset Cruise",
          activities: [
            { time: "Morning", description: "Tour the famous Wynwood Walls street art." },
            { time: "Afternoon", description: "Little Havana food tour tasting cuban sandwich." },
            { time: "Evening", description: "Millionaire's Row yacht cruise at sunset." },
          ],
        },
        {
          day: "Day 3 - Everglades Airboat Tour",
          activities: [
            { time: "Morning", description: "Airboat tour in Everglades National Park to see gators." },
            { time: "Afternoon", description: "Lunch at Key Biscayne." },
            { time: "Evening", description: "Final beachside walks before departure." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹114,600" : "$1,350",
        activities: isInr ? "₹38,250" : "$450",
        food: isInr ? "₹51,000" : "$600",
        transport: isInr ? "₹17,000" : "$200",
        total: isInr ? "₹220,850" : "$2,600",
        perPerson: isInr ? "₹55,212 / person (4 guests)" : "$650 / person (4 guests)",
      },
    };
  }

  // 6. ASPEN
  if (p.includes("aspen")) {
    return {
      listings: [
        {
          name: "Aspen Snowmass Ski Chalet",
          location: "Aspen, Colorado",
          price: isInr ? "₹55,250/night" : "$650/night",
          rating: 4.97,
          highlights: "Luxury ski-in/ski-out chalet with fireplace and hot tub.",
          badge: "Guest Favourite",
        },
        {
          name: "Maroon Bells Timber Cabin",
          location: "Aspen, Colorado",
          price: isInr ? "₹35,700/night" : "$420/night",
          rating: 4.93,
          highlights: "Rustic log cabin surrounded by pine forests and mountain peaks.",
          badge: "Superhost",
        },
        {
          name: "Downtown Aspen Luxury Flat",
          location: "Aspen, Colorado",
          price: isInr ? "₹32,300/night" : "$380/night",
          rating: 4.89,
          highlights: "Modern apartment steps from the gondola and fine dining.",
          badge: "Top Rated",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Arrival & Cozy Cabin Night",
          activities: [
            { time: "Afternoon", description: "Arrive in Aspen, check in to your timber chalet." },
            { time: "Evening", description: "Relax in the private hot tub under the stars." },
            { time: "Night", description: "Hot cocoa and dinner by the fireside." },
          ],
        },
        {
          day: "Day 2 - Skiing & Après Ski",
          activities: [
            { time: "Morning", description: "Full morning skiing/snowboarding on Aspen mountain." },
            { time: "Afternoon", description: "Ski school session or freestyle riding." },
            { time: "Evening", description: "Après-ski drinks in town." },
          ],
        },
        {
          day: "Day 3 - Maroon Bells Hike",
          activities: [
            { time: "Morning", description: "Snowshoe or hike around the iconic Maroon Bells lake." },
            { time: "Afternoon", description: "Lunch at Ajax Tavern." },
            { time: "Evening", description: "Depart for Denver airport." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹386,750" : "$4,550",
        activities: isInr ? "₹102,000" : "$1,200",
        food: isInr ? "₹76,500" : "$900",
        transport: isInr ? "₹29,750" : "$350",
        total: isInr ? "₹595,000" : "$7,000",
        perPerson: isInr ? "₹297,500 / person (2 guests)" : "$3,500 / person (2 guests)",
      },
    };
  }

  // 7. NYC / NEW YORK
  if (p.includes("nyc") || p.includes("new york") || p.includes("manhattan")) {
    return {
      listings: [
        {
          name: "Manhattan Skyline Penthouse",
          location: "New York City, NY",
          price: isInr ? "₹40,800/night" : "$480/night",
          rating: 4.95,
          highlights: "Luxury penthouse with private terrace overlooking Central Park.",
          badge: "Guest Favourite",
        },
        {
          name: "SoHo Designer Loft",
          location: "New York City, NY",
          price: isInr ? "₹27,200/night" : "$320/night",
          rating: 4.91,
          highlights: "Classic brick-walled SoHo loft, close to boutique shopping.",
          badge: "Superhost",
        },
        {
          name: "Brooklyn Heights Brownstone",
          location: "Brooklyn, NY",
          price: isInr ? "₹21,250/night" : "$250/night",
          rating: 4.88,
          highlights: "Historic brownstone apartment, walking distance to Brooklyn Bridge Park.",
          badge: "Top Rated",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Brooklyn Bridge Sunset",
          activities: [
            { time: "Afternoon", description: "Check in to your brownstone loft and unpack." },
            { time: "Evening", description: "Walk across Brooklyn Bridge at sunset for skyline views." },
            { time: "Night", description: "Dinner in DUMBO overlooking the harbor." },
          ],
        },
        {
          day: "Day 2 - Central Park & Broadway",
          activities: [
            { time: "Morning", description: "Bagel picnic in Central Park." },
            { time: "Afternoon", description: "Stroll along High Line and visit Chelsea Market." },
            { time: "Evening", description: "Catch a Broadway show in the theater district." },
          ],
        },
        {
          day: "Day 3 - Museums & Departure",
          activities: [
            { time: "Morning", description: "Visit the Museum of Modern Art (MoMA)." },
            { time: "Afternoon", description: "Explore SoHo boutiques." },
            { time: "Evening", description: "Depart for JFK airport." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹81,600" : "$960",
        activities: isInr ? "₹25,500" : "$300",
        food: isInr ? "₹34,000" : "$400",
        transport: isInr ? "₹10,200" : "$120",
        total: isInr ? "₹151,300" : "$1,780",
        perPerson: isInr ? "₹75,650 / person (2 guests)" : "$890 / person (2 guests)",
      },
    };
  }

  // 8. MALIBU / LOS ANGELES
  if (p.includes("malibu") || p.includes("la ") || p.includes("california")) {
    return {
      listings: [
        {
          name: "Malibu Pacific Ocean Villa",
          location: "Malibu, California",
          price: isInr ? "₹63,750/night" : "$750/night",
          rating: 4.98,
          highlights: "Stunning oceanfront villa, private deck built over the sand.",
          badge: "Guest Favourite",
        },
        {
          name: "Topanga Canyon Mountain Retreat",
          location: "Malibu, California",
          price: isInr ? "₹32,300/night" : "$380/night",
          rating: 4.92,
          highlights: "Architectural dome surrounded by nature, private hiking trails.",
          badge: "Superhost",
        },
        {
          name: "Zuma Beach Pool House",
          location: "Malibu, California",
          price: isInr ? "₹38,250/night" : "$450/night",
          rating: 4.90,
          highlights: "Modern home with pool and spacious lounge deck near Zuma beach.",
          badge: "Rare Find",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Malibu Ocean Views",
          activities: [
            { time: "Afternoon", description: "Check in to your beach house and watch waves crash." },
            { time: "Evening", description: "Seafood dinner at Nobu Malibu right on the ocean." },
            { time: "Night", description: "Stargazing from your private deck." },
          ],
        },
        {
          day: "Day 2 - Surf Lagoon & Hiking",
          activities: [
            { time: "Morning", description: "Private surf lesson at Malibu Lagoon." },
            { time: "Afternoon", description: "Hike in Santa Monica mountains for panoramic views." },
            { time: "Evening", description: "Wine tasting at local Malibu vineyards." },
          ],
        },
        {
          day: "Day 3 - Zuma Beach & Departure",
          activities: [
            { time: "Morning", description: "Relax at Zuma beach." },
            { time: "Afternoon", description: "Walk along Malibu Pier." },
            { time: "Evening", description: "Depart for LAX airport." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹191,250" : "$2,250",
        activities: isInr ? "₹51,000" : "$600",
        food: isInr ? "₹63,750" : "$750",
        transport: isInr ? "₹25,500" : "$300",
        total: isInr ? "₹331,500" : "$3,900",
        perPerson: isInr ? "₹55,250 / person (6 guests)" : "$650 / person (6 guests)",
      },
    };
  }

  // 9. YELLOWSTONE
  if (p.includes("yellowstone") || p.includes("glamping") || p.includes("montana")) {
    return {
      listings: [
        {
          name: "Yellowstone Luxury Glamping Tent",
          location: "West Yellowstone, MT",
          price: isInr ? "₹23,800/night" : "$280/night",
          rating: 4.93,
          highlights: "Luxury safari tent with en-suite bath and wood-burning stove.",
          badge: "Guest Favourite",
        },
        {
          name: "Mountain View Log Cabin",
          location: "Gardiner, MT",
          price: isInr ? "₹18,700/night" : "$220/night",
          rating: 4.89,
          highlights: "Log cabin with mountain views, close to north park entrance.",
          badge: "Superhost",
        },
        {
          name: "Elk Creek Ranch Lodge",
          location: "Yellowstone area",
          price: isInr ? "₹28,900/night" : "$340/night",
          rating: 4.91,
          highlights: "Spacious ranch home with horse trails and fly fishing access.",
          badge: "Rare Find",
        },
      ],
      itinerary: [
        {
          day: "Day 1 - Glamping Campfire",
          activities: [
            { time: "Afternoon", description: "Check in to your glamping safari tent." },
            { time: "Evening", description: "Cook s'mores over the community campfire." },
            { time: "Night", description: "Enjoy stargazing in one of the darkest spots in the US." },
          ],
        },
        {
          day: "Day 2 - Geysers & Wildlife Tour",
          activities: [
            { time: "Morning", description: "Watch Old Faithful erupt and hike around the basin." },
            { time: "Afternoon", description: "Drive through Lamar Valley to spot grizzly bears and wolves." },
            { time: "Evening", description: "Soak in Yellowstone hot springs." },
          ],
        },
        {
          day: "Day 3 - Grand Canyon Hike",
          activities: [
            { time: "Morning", description: "Hike along the rim of the Grand Canyon of the Yellowstone." },
            { time: "Afternoon", description: "Picnic lunch near Yellowstone Lake." },
            { time: "Evening", description: "Drive back for airport departure." },
          ],
        },
      ],
      budget: {
        accommodation: isInr ? "₹95,200" : "$1,120",
        activities: isInr ? "₹21,250" : "$250",
        food: isInr ? "₹34,000" : "$400",
        transport: isInr ? "₹25,500" : "$300",
        total: isInr ? "₹175,950" : "$2,070",
        perPerson: isInr ? "₹43,987 / person (4 guests)" : "$517.50 / person (4 guests)",
      },
    };
  }

  // DEFAULT FALLBACK (Generic Beach/Mansion/Chalet depending on Country)
  return {
    listings: [
      {
        name: isInr ? "Clifftop Heritage Mansion" : "Clifftop Villa with Infinity Pool",
        location: isInr ? "Udaipur, Rajasthan" : "Santorini, Greece",
        price: isInr ? "₹12,500/night" : "$420/night",
        rating: 4.97,
        highlights: isInr
          ? "Stunning views of Pichola Lake, private infinity pool, Rajasthani architecture with butler service."
          : "Breathtaking caldera views, private infinity pool, butler service included.",
        badge: "Guest Favourite",
      },
      {
        name: isInr ? "Backwater Houseboat Suite" : "Designer Cave Suite",
        location: isInr ? "Alleppey, Kerala" : "Oia, Santorini",
        price: isInr ? "₹8,200/night" : "$280/night",
        rating: 4.93,
        highlights: isInr
          ? "Luxury houseboat with AC bedrooms, personal chef, and guided backwater tours at dawn."
          : "Traditional cycladic cave carved into volcanic rock. Heated plunge pool, rooftop terrace.",
        badge: "Superhost",
      },
      {
        name: isInr ? "Snow Peak Forest Chalet" : "Luxury Seaview Penthouse",
        location: isInr ? "Manali, Himachal Pradesh" : "Fira, Santorini",
        price: isInr ? "₹6,800/night" : "$340/night",
        rating: 4.89,
        highlights: isInr
          ? "Cosy pine-wood chalet, Himalayan views, fireplace, and skiing slopes 2km away."
          : "360° panoramic views, chef's kitchen, private jacuzzi.",
        badge: "Top Rated",
      },
    ],
    itinerary: [
      {
        day: isInr ? "Day 1 - Arrival & Lake Pichola Sunset" : "Day 1 - Arrival & Caldera Sunset",
        activities: [
          { time: "Afternoon", description: isInr ? "Check in at your heritage mansion and freshen up." : "Check in and freshen up at your villa." },
          { time: "Evening", description: isInr ? "Sunset boat ride on Lake Pichola with views of City Palace." : "Walk the rim path from Fira to Oia - the world's most dramatic sunset." },
          { time: "Night", description: isInr ? "Dinner at a rooftop restaurant with traditional Rajasthani thali." : "Dinner at Ambrosia restaurant with caldera views." },
        ],
      },
      {
        day: isInr ? "Day 2 - City Palace & Bazaars" : "Day 2 - Island & Volcano",
        activities: [
          { time: "Morning", description: isInr ? "Visit the magnificent City Palace museum and Jagdish Temple." : "Boat tour to the active Nea Kameni volcano and hot springs." },
          { time: "Afternoon", description: isInr ? "Explore the colourful Hathi Pol bazaar for handicrafts and textiles." : "Visit Akrotiri archaeological site." },
          { time: "Evening", description: isInr ? "Monsoon Palace (Sajjangarh) for panoramic sunset views." : "Wine tasting at Santo Wines with sunset backdrop." },
        ],
      },
      {
        day: isInr ? "Day 3 - Leisure & Departure" : "Day 3 - Beaches & Leisure",
        activities: [
          { time: "Morning", description: isInr ? "Spa session at your heritage property." : "Red Beach and White Beach - volcanic sand." },
          { time: "Afternoon", description: isInr ? "Vintage car museum or Shilpgram rural arts centre." : "ATV ride around the island's scenic coast." },
          { time: "Evening", description: isInr ? "Final lakeside dinner before departure." : "Farewell dinner at your villa's private terrace." },
        ],
      },
    ],
    budget: {
      accommodation: isInr ? "₹37,500" : "$1,260",
      activities: isInr ? "₹8,000" : "$380",
      food: isInr ? "₹12,000" : "$420",
      transport: isInr ? "₹5,500" : "$180",
      total: isInr ? "₹63,000" : "$2,240",
      perPerson: isInr ? "₹15,750 / person (4 guests)" : "$560 / person (4 guests)",
    },
  };
};

export async function POST(req: NextRequest) {
  let promptText = "";
  try {
    const {
      prompt,
      currency = "₹",
      country = "India",
      city = "New Delhi",
      history = [],
      useTavily = false,
      tavilyApiKey = "",
    } = await req.json();
    promptText = prompt || "";

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Tavily Grounding Search (with caching support)
    let searchContext = "";
    let tavilyUsed = false;
    const activeTavilyKey = tavilyApiKey || process.env.TAVILY_API_KEY;
    if (useTavily && activeTavilyKey) {
      try {
        const cacheKey = prompt.toLowerCase().trim().replace(/\s+/g, " ");
        const cached = tavilyCache.get(cacheKey);

        if (cached && Date.now() - cached.cachedAt < TAVILY_CACHE_TTL_MS) {
          console.log("Tavily grounding cache HIT for query:", prompt);
          searchContext = `[Real-Time Grounding Information from Web Search]:\n` +
            `Direct Answer Summary: ${cached.answer || "N/A"}\n` +
            `Search Results: ${JSON.stringify(cached.results)}`;
          tavilyUsed = true;
        } else {
          console.log("Running Tavily grounding search for query:", prompt);
          const searchRes = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: activeTavilyKey,
              query: prompt,
              search_depth: "basic",
              include_answer: true,
            }),
          });
          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const curatedResults = (searchData.results || []).slice(0, 3).map((r: any) => ({
              title: r.title,
              content: r.content,
              url: r.url
            }));
            searchContext = `[Real-Time Grounding Information from Web Search]:\n` +
              `Direct Answer Summary: ${searchData.answer || "N/A"}\n` +
              `Search Results: ${JSON.stringify(curatedResults)}`;
            tavilyUsed = true;

            // Cache the response
            tavilyCache.set(cacheKey, {
              answer: searchData.answer || "N/A",
              results: curatedResults,
              cachedAt: Date.now()
            });
            console.log("Tavily grounding retrieved and cached successfully.");
          } else {
            console.warn("Tavily API failed with status:", searchRes.status);
          }
        }
      } catch (searchErr) {
        console.error("Error executing Tavily search:", searchErr);
      }
    }

    let data: any = null;
    let successfulModelName = "";

    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelsToTry = [
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash",
        "gemini-3-flash-preview",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-2.5-pro",

        "gemini-1.5-pro",
        "gemini-2.0-flash-exp"
      ];

      const systemPrompt = `You are "Anywhere Door", a sharp, context-aware AI travel concierge embedded in Airbnb. You read between the lines of a user's travel request and produce plans that feel handcrafted, not templated.
User context:
- Base country: ${country}
- Base city: ${city}
- Currency: ${currency} (use ONLY this symbol for every price, never ₹, $, or others unless it matches)

---

UNDERSTANDING THE REQUEST
Before building the plan, silently extract:
1. **Destination**: explicit or inferred (e.g. "snowy vibes" -> Manali/Shimla)
2. **Duration**: number of nights/days; if unstated, infer from context (e.g. "weekend" = 2 nights)
3. **Group profile**: solo | couple | group of N | family with kids | friends
4. **Budget tier**: derive from the user's words, then apply it using YOUR knowledge of real pricing for that specific destination and season:
   - "cheap / budget / backpacker / under X" -> BUDGET tier: pick stays in the lowest cost range for that place (e.g. hostels, shared guesthouses, budget homestays). Do NOT use a fixed number: ₹800 is budget in Kasol, ₹2,500 might be budget in South Goa peak season. Use your knowledge.
   - "comfortable / mid-range / decent / standard" -> MID tier: 3-star equivalents or well-reviewed homestays/inns at the typical mid-market rate for that destination.
   - "luxury / splurge / 5-star / premium / lavish / treat ourselves" -> PREMIUM tier: high-end resorts, boutique villas, or luxury stays at market rate for that destination.
   - If the user states a hard price ceiling (e.g. "under ₹10,000 total" or "budget of ₹5k"), treat that as an absolute cap for the ENTIRE trip including stays, food, and activities.
   - If no budget signals, default to MID tier.
5. **Vibe/Intent**: romantic escape | adventure | relaxation | cultural immersion | foodie | party | spiritual | workation
6. **Constraints**: no alcohol, veg-only, pet-friendly, accessibility needs, no flights, etc.
7. **Season/Timing**: if dates or months are given, ensure destination is accessible and recommendations are season-appropriate.

---

OUTPUT FORMAT: respond ONLY with this JSON (no markdown, no extra text):

{
  "title": "A short, catchy, personalised trip name that reflects their specific request (e.g. 'Cosy Manali Couple Escape')",
  "message": "2-3 sentences written like a knowledgeable friend: explain your picks, why they match the vibe, and one insider tip. Avoid corporate filler.",
  "stays": [
    {
      "name": "Real or plausible property name",
      "location": "Neighbourhood or village, City",
      "price": "${currency}X,XXX/night",
      "rating": number between 4.5 and 5.0,
      "highlights": "Two vivid, specific sentences that sell the place. Mention unique details like the view, a smell, a feeling, not generic amenities.",
      "badge": "Guest Favourite | Superhost | Top Rated | Rare Find | New"
    }
  ],
  "experiences": [
    {
      "name": "Real or plausible local experience or activity name",
      "location": "Activity site, City",
      "price": "${currency}X,XXX/person",
      "rating": number between 4.5 and 5.0,
      "highlights": "Two vivid, specific sentences that sell the experience.",
      "badge": "Guest Favourite | Superhost | Top Rated | New"
    }
  ],
  "services": [
    {
      "name": "Real or plausible local service (e.g. Photographer, Chef, Local Guide)",
      "location": "Service area, City",
      "price": "${currency}X,XXX/session (or /service or /day)",
      "rating": number between 4.5 and 5.0,
      "highlights": "Two vivid, specific sentences that sell the service.",
      "badge": "Guest Favourite | Superhost | Top Rated | New"
    }
  ],
  "itinerary": [
    {
      "day": "Day N: Evocative title (e.g. 'Day 1: Arrive, Unwind, Explore Old Town')",
      "activities": [
        { "time": "Morning | Afternoon | Evening | Night", "description": "Specific activity with a local detail, not just 'visit a temple'." }
      ]
    }
  ],
  "budget": {
    "accommodation": "${currency} total for all nights",
    "activities": "${currency} realistic estimate",
    "food": "${currency} realistic estimate (match to group size and budget tier)",
    "transport": "${currency} realistic estimate (local cabs, trains, etc.)",
    "total": "${currency} grand total",
    "perPerson": "${currency} per person split"
  },
  "questions": [
    "A short, natural follow-up question to refine this plan (e.g. 'Would you prefer a more secluded spot?')",
    "A second follow-up question based on something ambiguous or expandable in their request."
  ]
}

---

HARD RULES:
- Listings count: stays: exactly 3, experiences: exactly 2, services: exactly 1-2. Itinerary days: match the requested duration (default 3 if unspecified). Budget: always complete.
- Budget tier is NON-NEGOTIABLE.
- Prices must be realistic for the destination and season, not inflated or copied from high-end properties.
- The 'message' must feel personal and conversational. Never say 'I have curated' or 'Here is your plan'.
- Activities must be specific and local.
- If the group is a couple, make the plan romantic. If it's a group of friends, add social energy. If solo, add introspective or freedom-oriented moments.
- For day trips / no-stay requests: stays = [], accommodation budget = ${currency}0.
- Never pad the itinerary with airport transfers or check-in procedures unless the trip is over 4 days.
- Return ONLY the raw JSON object. No backticks, no 'json' label, no explanation.`;

      // Map incoming history to Gemini Chat API format
      const chatHistory = [];
      if (history && history.length > 0) {
        for (const msg of history) {
          const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
          let textContent = "";
          if (typeof msg.content === "string") {
            textContent = msg.content;
          } else if (msg.parts && msg.parts[0] && msg.parts[0].text) {
            textContent = msg.parts[0].text;
          } else {
            textContent = JSON.stringify(msg);
          }
          chatHistory.push({
            role,
            parts: [{ text: textContent }],
          });
        }
      }

      let lastError: any = null;

      for (const modelName of modelsToTry) {
        try {
          console.log(`Attempting plan generation with model: ${modelName}...`);
          const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.7,
            },
            systemInstruction: systemPrompt,
          });

          // Initialize Chat session with history
          const chat = model.startChat({
            history: chatHistory,
          });

          const promptToSend = searchContext
            ? `Real-time search results to ground your answer:\n${searchContext}\n\nUser request: ${prompt}`
            : prompt;

          const result = await chat.sendMessage(promptToSend);
          const text = result.response.text();
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (!jsonMatch) throw new Error("No valid JSON in model response");

          data = JSON.parse(jsonMatch[0]);
          data.listings = data.listings || data.stays || [];
          data.stays = data.stays || data.listings || [];
          data.experiences = data.experiences || [];
          data.services = data.services || [];
          data.modelUsed = modelName;
          data.tavilyUsed = tavilyUsed;
          console.log(`Plan generation succeeded with model: ${modelName}`);
          break;
        } catch (err: any) {
          console.warn(`Model ${modelName} failed:`, err?.message || err);
          lastError = err;
        }
      }

      if (!data) {
        throw lastError || new Error("All Gemini models failed to generate a plan.");
      }
    } else {
      throw new Error("GEMINI_API_KEY is not set in the environment variables. Please configure GEMINI_API_KEY.");
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Plan API error:", err);
    const { currency = "₹", country = "India" } = await req.json().catch(() => ({}));
    return NextResponse.json(getMockResponse(promptText || "", currency, country));
  }
}
