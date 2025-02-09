const config = {
  // Google Maps API key, will be replaced by environment variable
  GOOGLE_MAPS_API_KEY: "AIzaSyBdrMY_mAyGUTgS-tZ87r9CZelj-egBOQc",

  // GDACS API URL to get disaster alerts in XML format
  GDACS_API_URL: "https://www.gdacs.org/xml/rss.xml",

  // Proxy URL to bypass CORS issues while fetching the data
  PROXY_URL: "https://api.allorigins.win/raw?url=",

  // Interval (in milliseconds) to update alerts (5 minutes = 300,000ms)
  UPDATE_INTERVAL: 300000,

  // Coordinates for various locations used in the system (lat, lng)
  LOCATION_COORDS: {
    // Asia
    india: { lat: 20.5937, lng: 78.9629 }, // India
    russia: { lat: 61.524, lng: 105.3188 }, // Russia
    china: { lat: 35.8617, lng: 104.1954 }, // China
    japan: { lat: 36.2048, lng: 138.2529 }, // Japan
    indonesia: { lat: -0.7893, lng: 113.9213 }, // Indonesia
    singapore_city: { lat: 1.3521, lng: 103.8198 }, // Singapore
    jakarta: { lat: -6.2088, lng: 106.8456 }, // Jakarta, Indonesia
    kuala_lumpur: { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur, Malaysia
    thailand: { lat: 15.87, lng: 100.9925 }, // Thailand
    vietnam: { lat: 14.0583, lng: 108.2772 }, // Vietnam
    singapore: { lat: 1.3521, lng: 103.8198 }, // Singapore (duplicated, but keeping as is)
    malaysia: { lat: 4.2105, lng: 101.9758 }, // Malaysia

    // Middle East
    dubai: { lat: 25.2048, lng: 55.2708 }, // Dubai, UAE
    riyadh: { lat: 24.7136, lng: 46.6753 }, // Riyadh, Saudi Arabia
    telaviv: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv, Israel
    abu_dhabi: { lat: 24.4539, lng: 54.3773 }, // Abu Dhabi, UAE
    saudiarabia: { lat: 23.8859, lng: 45.0792 }, // Saudi Arabia
    uae: { lat: 23.4241, lng: 53.8478 }, // UAE
    israel: { lat: 31.0461, lng: 34.8516 }, // Israel

    // Oceania
    sydney: { lat: -33.8688, lng: 151.2093 }, // Sydney, Australia
    melbourne: { lat: -37.8136, lng: 144.9631 }, // Melbourne, Australia
    auckland: { lat: -36.8485, lng: 174.7633 }, // Auckland, New Zealand
    brisbane: { lat: -27.4698, lng: 153.0251 }, // Brisbane, Australia
    perth: { lat: -31.9505, lng: 115.8605 }, // Perth, Australia

    // Africa
    nigeria: { lat: 9.082, lng: 8.6753 }, // Nigeria
    egypt: { lat: 26.8206, lng: 30.8025 }, // Egypt
    southafrica: { lat: -30.5595, lng: 22.9375 }, // South Africa
    kenya: { lat: -0.0236, lng: 37.9062 }, // Kenya

    // Major Cities in Asia
    tokyo: { lat: 35.6762, lng: 139.6503 }, // Tokyo, Japan
    beijing: { lat: 39.9042, lng: 116.4074 }, // Beijing, China
    mumbai: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
    shanghai: { lat: 31.2304, lng: 121.4737 }, // Shanghai, China

    // Europe
    uk: { lat: 55.3781, lng: -3.436 }, // United Kingdom
    germany: { lat: 51.1657, lng: 10.4515 }, // Germany
    france: { lat: 46.2276, lng: 2.2137 }, // France
    italy: { lat: 41.8719, lng: 12.5674 }, // Italy
    spain: { lat: 40.4637, lng: -3.7492 }, // Spain

    // Major Cities in Europe
    london: { lat: 51.5074, lng: -0.1278 }, // London, UK
    paris: { lat: 48.8566, lng: 2.3522 }, // Paris, France
    berlin: { lat: 52.52, lng: 13.405 }, // Berlin, Germany
    rome: { lat: 41.9028, lng: 12.4964 }, // Rome, Italy

    // South America
    brazil: { lat: -14.235, lng: -51.9253 }, // Brazil
    argentina: { lat: -38.4161, lng: -63.6167 }, // Argentina
    peru: { lat: -9.19, lng: -75.0152 }, // Peru
    colombia: { lat: 4.5709, lng: -74.2973 }, // Colombia

    // North America
    newyork: { lat: 40.7128, lng: -74.006 }, // New York, USA
    losangeles: { lat: 34.0522, lng: -118.2437 }, // Los Angeles, USA
    chicago: { lat: 41.8781, lng: -87.6298 }, // Chicago, USA
    houston: { lat: 29.7604, lng: -95.3698 }, // Houston, USA
    phoenix: { lat: 33.4484, lng: -112.074 }, // Phoenix, USA

    // Canada and Mexico
    canada: { lat: 56.1304, lng: -106.3468 }, // Canada
    mexico: { lat: 23.6345, lng: -102.5528 }, // Mexico
  },
};
