import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

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
          day: "Day 1 — Arrival & Beach Sunset",
          activities: [
            { time: "Afternoon", description: "Check in at your beach property and freshen up." },
            { time: "Evening", description: "Sunset walk on Candolim beach followed by beachside shacks dinner." },
            { time: "Night", description: "Enjoy live music and local fenny cocktails in Panaji." },
          ],
        },
        {
          day: "Day 2 — Heritage Tour & Spice Plantation",
          activities: [
            { time: "Morning", description: "Visit Basilica of Bom Jesus and Old Goa churches." },
            { time: "Afternoon", description: "Traditional buffet lunch at Sahakari Spice Farm." },
            { time: "Evening", description: "Scenic Mandovi River sunset cruise with Goan folk dance." },
          ],
        },
        {
          day: "Day 3 — Water Sports & Departure",
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
          day: "Day 1 — Arrival & Solang Valley Views",
          activities: [
            { time: "Afternoon", description: "Arrive in Manali, check in to your chalet and enjoy hot chai." },
            { time: "Evening", description: "Stroll along Mall Road and buy local woollens." },
            { time: "Night", description: "Cosy dinner by the fireplace." },
          ],
        },
        {
          day: "Day 2 — Paragliding & Jogini Waterfall Trek",
          activities: [
            { time: "Morning", description: "Paragliding in Solang Valley." },
            { time: "Afternoon", description: "Scenic trek to Jogini Waterfalls near Vashisht village." },
            { time: "Evening", description: "Dip in Vashisht hot springs to relax." },
          ],
        },
        {
          day: "Day 3 — Solang Valley Skiing & Departure",
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
          day: "Day 1 — Trivandrum to Varkala Cliff",
          activities: [
            { time: "Afternoon", description: "Drive to Varkala and check in to your clifftop room." },
            { time: "Evening", description: "Explore the clifftop shops and watch sunset over the Arabian Sea." },
            { time: "Night", description: "Candlelit seafood dinner at a cliff café." },
          ],
        },
        {
          day: "Day 2 — Alleppey Backwater Cruise",
          activities: [
            { time: "Morning", description: "Drive to Alleppey and board your luxury houseboat." },
            { time: "Afternoon", description: "Cruise through narrow canals with traditional lunch served on board." },
            { time: "Evening", description: "Watch backwater village life at sunset." },
          ],
        },
        {
          day: "Day 3 — Sunrise Yoga & Departure",
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
          day: "Day 1 — Jaipur Palace & Amer Fort",
          activities: [
            { time: "Afternoon", description: "Arrive in Jaipur, check in to your Haveli." },
            { time: "Evening", description: "Visit Amer Fort and watch the light and sound show." },
            { time: "Night", description: "Traditional Rajasthani thali dinner at Chokhi Dhani." },
          ],
        },
        {
          day: "Day 2 — Hawa Mahal & Bazaars",
          activities: [
            { time: "Morning", description: "Photoshoot at Hawa Mahal and visit City Palace." },
            { time: "Afternoon", description: "Shopping in Johari Bazaar for handicrafts." },
            { time: "Evening", description: "Sunset views from Nahargarh Fort." },
          ],
        },
        {
          day: "Day 3 — Sunrise Balloon & Departure",
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
          day: "Day 1 — Arrival & Ocean Drive",
          activities: [
            { time: "Afternoon", description: "Check in at your beach property and enjoy the pool." },
            { time: "Evening", description: "Sunset walk on South Beach and explore art deco buildings." },
            { time: "Night", description: "Dinner and tropical drinks on Ocean Drive." },
          ],
        },
        {
          day: "Day 2 — Wynwood Walls & Sunset Cruise",
          activities: [
            { time: "Morning", description: "Tour the famous Wynwood Walls street art." },
            { time: "Afternoon", description: "Little Havana food tour tasting cuban sandwich." },
            { time: "Evening", description: "Millionaire's Row yacht cruise at sunset." },
          ],
        },
        {
          day: "Day 3 — Everglades Airboat Tour",
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
          day: "Day 1 — Arrival & Cozy Cabin Night",
          activities: [
            { time: "Afternoon", description: "Arrive in Aspen, check in to your timber chalet." },
            { time: "Evening", description: "Relax in the private hot tub under the stars." },
            { time: "Night", description: "Hot cocoa and dinner by the fireside." },
          ],
        },
        {
          day: "Day 2 — Skiing & Après Ski",
          activities: [
            { time: "Morning", description: "Full morning skiing/snowboarding on Aspen mountain." },
            { time: "Afternoon", description: "Ski school session or freestyle riding." },
            { time: "Evening", description: "Après-ski drinks in town." },
          ],
        },
        {
          day: "Day 3 — Maroon Bells Hike",
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
          day: "Day 1 — Brooklyn Bridge Sunset",
          activities: [
            { time: "Afternoon", description: "Check in to your brownstone loft and unpack." },
            { time: "Evening", description: "Walk across Brooklyn Bridge at sunset for skyline views." },
            { time: "Night", description: "Dinner in DUMBO overlooking the harbor." },
          ],
        },
        {
          day: "Day 2 — Central Park & Broadway",
          activities: [
            { time: "Morning", description: "Bagel picnic in Central Park." },
            { time: "Afternoon", description: "Stroll along High Line and visit Chelsea Market." },
            { time: "Evening", description: "Catch a Broadway show in the theater district." },
          ],
        },
        {
          day: "Day 3 — Museums & Departure",
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
          day: "Day 1 — Malibu Ocean Views",
          activities: [
            { time: "Afternoon", description: "Check in to your beach house and watch waves crash." },
            { time: "Evening", description: "Seafood dinner at Nobu Malibu right on the ocean." },
            { time: "Night", description: "Stargazing from your private deck." },
          ],
        },
        {
          day: "Day 2 — Surf Lagoon & Hiking",
          activities: [
            { time: "Morning", description: "Private surf lesson at Malibu Lagoon." },
            { time: "Afternoon", description: "Hike in Santa Monica mountains for panoramic views." },
            { time: "Evening", description: "Wine tasting at local Malibu vineyards." },
          ],
        },
        {
          day: "Day 3 — Zuma Beach & Departure",
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
          day: "Day 1 — Glamping Campfire",
          activities: [
            { time: "Afternoon", description: "Check in to your glamping safari tent." },
            { time: "Evening", description: "Cook s'mores over the community campfire." },
            { time: "Night", description: "Enjoy stargazing in one of the darkest spots in the US." },
          ],
        },
        {
          day: "Day 2 — Geysers & Wildlife Tour",
          activities: [
            { time: "Morning", description: "Watch Old Faithful erupt and hike around the basin." },
            { time: "Afternoon", description: "Drive through Lamar Valley to spot grizzly bears and wolves." },
            { time: "Evening", description: "Soak in Yellowstone hot springs." },
          ],
        },
        {
          day: "Day 3 — Grand Canyon Hike",
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
        day: isInr ? "Day 1 — Arrival & Lake Pichola Sunset" : "Day 1 — Arrival & Caldera Sunset",
        activities: [
          { time: "Afternoon", description: isInr ? "Check in at your heritage mansion and freshen up." : "Check in and freshen up at your villa." },
          { time: "Evening", description: isInr ? "Sunset boat ride on Lake Pichola with views of City Palace." : "Walk the rim path from Fira to Oia — the world's most dramatic sunset." },
          { time: "Night", description: isInr ? "Dinner at a rooftop restaurant with traditional Rajasthani thali." : "Dinner at Ambrosia restaurant with caldera views." },
        ],
      },
      {
        day: isInr ? "Day 2 — City Palace & Bazaars" : "Day 2 — Island & Volcano",
        activities: [
          { time: "Morning", description: isInr ? "Visit the magnificent City Palace museum and Jagdish Temple." : "Boat tour to the active Nea Kameni volcano and hot springs." },
          { time: "Afternoon", description: isInr ? "Explore the colourful Hathi Pol bazaar for handicrafts and textiles." : "Visit Akrotiri archaeological site." },
          { time: "Evening", description: isInr ? "Monsoon Palace (Sajjangarh) for panoramic sunset views." : "Wine tasting at Santo Wines with sunset backdrop." },
        ],
      },
      {
        day: isInr ? "Day 3 — Leisure & Departure" : "Day 3 — Beaches & Leisure",
        activities: [
          { time: "Morning", description: isInr ? "Spa session at your heritage property." : "Red Beach and White Beach — volcanic sand." },
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
    const { prompt, currency = "₹", country = "India", city = "New Delhi" } = await req.json();
    promptText = prompt || "";

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      await new Promise((r) => setTimeout(r, 2000));
      return NextResponse.json(getMockResponse(prompt, currency, country));
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.85,
      },
    });

    const systemPrompt = `You are "Anywhere Door", an elite AI travel concierge for Airbnb.

User context:
- Country: ${country}
- City: ${city}
- Preferred currency: ${currency} (use this symbol for ALL prices)

Given the user's travel request, respond ONLY with a valid JSON object in this exact schema:

{
  "listings": [
    {
      "name": "string",
      "location": "string",
      "price": "string (e.g. ${currency}12,000/night — always use ${currency} symbol)",
      "rating": number (4.7–5.0),
      "highlights": "string (2 vivid sentences)",
      "badge": "string (Guest Favourite | Superhost | Top Rated | Rare Find)"
    }
  ],
  "itinerary": [
    {
      "day": "string (e.g. Day 1 — Title)",
      "activities": [
        { "time": "Morning|Afternoon|Evening|Night", "description": "string" }
      ]
    }
  ],
  "budget": {
    "accommodation": "string (${currency} amount)",
    "activities": "string (${currency} amount)",
    "food": "string (${currency} amount)",
    "transport": "string (${currency} amount)",
    "total": "string (${currency} total)",
    "perPerson": "string (${currency} per person split)"
  }
}

Rules:
- Provide exactly 3 listings, 3 itinerary days, and a complete budget.
- Always use ${currency} as the currency symbol — never use $ or other symbols.
- If the user is from ${country}, prioritise ${country}-based destinations unless they request elsewhere.
- Make listings feel premium, vivid, and culturally authentic to the destination.
- Budget should reflect realistic pricing in ${currency} for the destination.
- Return ONLY the JSON object — no markdown, no explanation, no extra text.`;

    const result = await model.generateContent(
      `${systemPrompt}\n\nUser travel request: ${prompt}`
    );
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON in model response");

    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Plan API error:", err);
    const { currency = "₹", country = "India" } = await req.json().catch(() => ({}));
    return NextResponse.json(getMockResponse(promptText || "", currency, country));
  }
}
