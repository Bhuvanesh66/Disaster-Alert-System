let map;
let markers = [];
let alertColor = [];
const alertsList = document.getElementById("alertsList");
const alertBanner = document.getElementById("alertBanner");

// Initialize Google Map
function initMap() {
  // Load Google Maps with API key from config
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_API_KEY}&libraries=geometry`;
  document.head.appendChild(script);

  script.onload = () => {
    // Create the map with default settings
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: { lat: 0, lng: 0 }, // Default map center at global level
    });
  };
}

// Fetch disaster alerts
async function fetchDisasterAlerts() {
  try {
    // Make request to GDACS API (through proxy to avoid CORS issues)
    const response = await fetch(
      `${config.PROXY_URL}${encodeURIComponent(config.GDACS_API_URL)}`
    );
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");

    // Map alert levels to colors
    alertColor = Array.from(items).map(
      (item) => item.getElementsByTagName("gdacs:alertlevel")[0].textContent
    );

    // Process the alerts for display
    processAlerts(items);
  } catch (error) {
    console.error("Error fetching alerts:", error);
  }
}

// Process and display alerts
function processAlerts(items) {
  alertsList.innerHTML = ""; // Clear existing alerts
  markers.forEach((marker) => marker.setMap(null)); // Remove all markers
  markers = []; // Reset markers array
  let i = 0;

  // Update alert count in notification badge
  document.getElementById(
    "notificationBadge"
  ).textContent = `Alerts : ${items.length}`;

  // Iterate through the items and display the alerts
  Array.from(items).forEach((item) => {
    let title = item.getElementsByTagName("title")[0].textContent;
    let description = item.getElementsByTagName("description")[0].textContent;
    const link = item.getElementsByTagName("link")[0].textContent;

    // Extract coordinates from georss:point if available
    const geoPoint = item.getElementsByTagName("georss:point")[0]?.textContent;
    if (geoPoint) {
      const [lat, lng] = geoPoint.split(" ").map(Number);
      addMarker({ lat, lng }, title, link, i); // Add marker on the map
      i++;
    }

    // Create alert element and append to the list
    const alertElement = document.createElement("div");
    alertElement.className = "alert-item";
    alertElement.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${link}" target="_blank">More info</a>
    `;
    alertsList.appendChild(alertElement);
  });

  // Show latest alert in the banner
  if (items.length > 0) {
    const latestAlert = items[0];
    alertBanner.style.display = "block";
    alertBanner.textContent = `Latest Alert : ${
      latestAlert.getElementsByTagName("title")[0].textContent
    }`;
  } else {
    alertBanner.textContent = "No alerts Found"; // In case no alerts are fetched
  }
}

// Get severity color based on alert level
function getSeverityColor(i) {
  // low Severity (Green)
  if (alertColor[i] && alertColor[i].toLowerCase() === "green") {
    return "#90EE90"; // Light green for low severity
  }
  // Medium Severity (Orange)
  else if (alertColor[i] && alertColor[i].toLowerCase() === "orange") {
    return "#ff8c00"; // Orange for medium severity
  }
  // High Severity (Red)
  else if (alertColor[i] && alertColor[i].toLowerCase() === "red") {
    return "#ff0000"; // Red for high severity
  }
  // Default color if no match
  return "#ffff00"; // Yellow for unspecified severity
}

// Add marker to map
function addMarker(position, title, link, i) {
  const color = getSeverityColor(i); // Get color based on alert level

  const marker = new google.maps.Marker({
    position,
    map,
    title,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.7,
      strokeWeight: 1,
      scale: 10, // Set size of the marker
    },
  });

  // Create info window for the marker
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="max-width: 150px; padding: 2px;">
        <h3 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 12px;">${
          title || "Alert"
        }</h3>
        <a href="${link}" target="_blank">More info</a>
      </div>
    `,
    pixelOffset: new google.maps.Size(0, -5),
  });

  // Add click event to open the info window
  marker.addListener("click", () => {
    markers.forEach((m) => m.infoWindow?.close());
    infoWindow.open(map, marker);
  });

  marker.infoWindow = infoWindow;

  // Store marker for later manipulation
  markers.push(marker);
}

// Search functionality (Refresh the page)
function refreshPage() {
  location.reload(); // Reload the page to fetch new data
}

// Search alerts based on user input
function searchRegion() {
  const searchTerm = document.getElementById("search").value.toLowerCase(); // Get user search input
  const alertItems = document.querySelectorAll(".alert-item"); // Get all alert items
  let i = 0;

  // Use location coordinates from config
  const locationCoords = config.LOCATION_COORDS;

  // Clear previous "no results" message
  const existingNoResults = document.querySelector(".alert-item h3");
  if (
    existingNoResults &&
    existingNoResults.textContent.includes("No Alerts Found")
  ) {
    existingNoResults.parentElement.remove(); // Remove "no alerts" message if any
  }

  // Reset map markers visibility
  markers.forEach((marker) => marker.setMap(map));

  // Center map on searched location if coordinates exist
  const searchLocation = Object.keys(locationCoords).find((loc) =>
    searchTerm.includes(loc)
  );
  if (searchLocation) {
    map.setCenter(locationCoords[searchLocation]); // Center the map on the search location
    map.setZoom(5); // Zoom level
  }

  alertItems.forEach((item, index) => {
    const text = item.textContent.toLowerCase();
    let showItem = text.includes(searchTerm); // Check if the alert matches the search term

    // Toggle alert visibility based on search term match
    if (showItem) {
      markers[index]?.setMap(map); // Show the marker
      item.style.display = "block"; // Show the alert item
      i++; // Increment matched item count
    } else {
      markers[index]?.setMap(null); // Hide the marker
      item.style.display = "none"; // Hide the alert item
    }
  });

  // Display message if no alerts found for search term
  if (i === 0) {
    const div = document.createElement("div");
    div.className = "alert-item";
    div.innerHTML = `<h3>No Alerts Found Near ${searchTerm}</h3>`;
    alertsList.appendChild(div);
  }

  // Update the alert count in the notification badge
  document.getElementById("notificationBadge").textContent = `Alerts : ${i}`;
}

// Initialize and set up intervals for alert fetching and map resizing
document.addEventListener("DOMContentLoaded", () => {
  initMap(); // Initialize Google map
  fetchDisasterAlerts(); // Fetch disaster alerts when page loads

  // Use interval from config to periodically fetch alerts
  setInterval(fetchDisasterAlerts, config.UPDATE_INTERVAL);
});

// Handle window resize to adjust map view and layout
window.addEventListener("resize", () => {
  if (map) {
    google.maps.event.trigger(map, "resize"); // Trigger resize event for map
    map.setCenter(map.getCenter()); // Recenter map after resize
  }

  const searchContainer = document.querySelector(".search-container");
  searchContainer.style.flexWrap = window.innerWidth < 768 ? "wrap" : "nowrap"; // Adjust layout for smaller screens
});

// Trigger search when "Enter" key is pressed in the search input
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchRegion(); // Perform search when Enter is pressed
  }
});

// Add event listeners for refresh and search buttons
document.querySelector("#refreshBtn").addEventListener("click", function () {
  refreshPage(); // Refresh the page when clicked
});

document.querySelector("#searchBtn").addEventListener("click", function () {
  searchRegion(); // Perform search when clicked
});
