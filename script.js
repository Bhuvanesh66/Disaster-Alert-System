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
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: { lat: 0, lng: 0 },
    });
  };
}

// Fetch disaster alerts
async function fetchDisasterAlerts() {
  try {
    const response = await fetch(
      `${config.PROXY_URL}${encodeURIComponent(config.GDACS_API_URL)}`
    );
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");

    alertColor = Array.from(items).map(
      (item) => item.getElementsByTagName("gdacs:alertlevel")[0].textContent
    );

    processAlerts(items);
  } catch (error) {
    console.error("Error fetching alerts:", error);
  }
}
// Process and display alerts
function processAlerts(items) {
  alertsList.innerHTML = "";
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
  let i = 0;
  document.getElementById(
    "notificationBadge"
  ).textContent = `Alerts : ${items.length}`;

  Array.from(items).forEach((item) => {
    let title = item.getElementsByTagName("title")[0].textContent;

    let description = item.getElementsByTagName("description")[0].textContent;

    const link = item.getElementsByTagName("link")[0].textContent;

    // Extract coordinates from georss:point if available
    const geoPoint = item.getElementsByTagName("georss:point")[0]?.textContent;
    if (geoPoint) {
      const [lat, lng] = geoPoint.split(" ").map(Number);

      addMarker({ lat, lng }, title, link, i);
      i++;
    }

    // Create alert item
    const alertElement = document.createElement("div");
    alertElement.className = "alert-item";
    alertElement.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${link}" target="_blank">More info</a>
    `;

    alertsList.appendChild(alertElement);
  });

  // Show latest alert in banner
  if (items.length > 0) {
    const latestAlert = items[0];
    alertBanner.style.display = "block";
    alertBanner.textContent = `Latest Alert : ${
      latestAlert.getElementsByTagName("title")[0].textContent
    }`;
  } else {
    alertBanner.textConten = "No alerts Found";
  }
}

// Add marker to map
// Get severity color based on alert text
function getSeverityColor(i) {
  // low Severity (Green)
  if (alertColor[i] && alertColor[i].toLowerCase() === "green") {
    return "#90EE90";
  }
  // Medium Severity (Orange)
  else if (alertColor[i] && alertColor[i].toLowerCase() === "orange") {
    return "#ff8c00";
  }
  // High Severity (Red)
  else if (alertColor[i] && alertColor[i].toLowerCase() === "red") {
    return "#ff0000";
  }
  // Default color if no match
  return "#ffff00";
}

// Add marker to map
function addMarker(position, title, link, i) {
  const color = getSeverityColor(i);

  const marker = new google.maps.Marker({
    position,
    map,
    title,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.7,
      strokeWeight: 1,
      scale: 10,
    },
  });

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

  marker.addListener("click", () => {
    markers.forEach((m) => m.infoWindow?.close());
    infoWindow.open(map, marker);
  });

  marker.infoWindow = infoWindow;

  markers.push(marker);
}

// Search functionality
function refreshPage() {
  location.reload();
}
function searchRegion() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const alertItems = document.querySelectorAll(".alert-item");
  let i = 0;

  // Use location coordinates from config
  const locationCoords = config.LOCATION_COORDS;

  // Clear previous "no results" message
  const existingNoResults = document.querySelector(".alert-item h3");
  if (
    existingNoResults &&
    existingNoResults.textContent.includes("No Alerts Found")
  ) {
    existingNoResults.parentElement.remove();
  }

  // Reset map markers
  markers.forEach((marker) => marker.setMap(map));

  // Center map on searched location if coordinates exist
  const searchLocation = Object.keys(locationCoords).find((loc) =>
    searchTerm.includes(loc)
  );
  if (searchLocation) {
    map.setCenter(locationCoords[searchLocation]);
    map.setZoom(5);
  }

  alertItems.forEach((item, index) => {
    const text = item.textContent.toLowerCase();
    let showItem = text.includes(searchTerm);

    if (showItem) {
      markers[index]?.setMap(map);
      item.style.display = "block";
      i++; /* Existing styles */

      /* Other styles */
    } else {
      markers[index]?.setMap(null);
      item.style.display = "none";
    }
  });

  if (i === 0) {
    const div = document.createElement("div");
    div.className = "alert-item";
    div.innerHTML = `<h3>No Alerts Found Near ${searchTerm}</h3>`;
    alertsList.appendChild(div);
  }

  document.getElementById("notificationBadge").textContent = `Alerts : ${i}`;
}
// Initialize and set up intervals
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  fetchDisasterAlerts();

  // Use interval from config
  setInterval(fetchDisasterAlerts, config.UPDATE_INTERVAL);
});
window.addEventListener("resize", () => {
  if (map) {
    google.maps.event.trigger(map, "resize");
    map.setCenter(map.getCenter());
  }

  const searchContainer = document.querySelector(".search-container");
  searchContainer.style.flexWrap = window.innerWidth < 768 ? "wrap" : "nowrap";
});

const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchRegion();
  }
});


document.querySelector("#refreshBtn").addEventListener("click" ,function(){
  refreshPage();
})

document.querySelector("#searchBtn").addEventListener("click" , function(){
  searchRegion();
})