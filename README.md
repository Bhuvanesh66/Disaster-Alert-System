# Disaster Alert System 🚨

A real-time web application that displays and tracks global disaster alerts using the GDACS (Global Disaster Alert and Coordination System) API. The system provides an interactive map interface to visualize disaster locations and their severity levels worldwide.

## 🌐 Live Demo
[Disaster Alert System](https://disaster-alert-system-6u3x.onrender.com)

## ✨ Features

- **Real-time Disaster Tracking**: Fetches and displays the latest disaster alerts from GDACS
- **Interactive Map**: Uses Google Maps to visualize disaster locations
- **Color-coded Alerts**: Different colors indicate varying severity levels of disasters
  - 🟢 Green: Low severity
  - 🟡 Orange: Medium severity
  - 🔴 Red: High severity
    **Note Severity based on [GDACS Score](https://www.gdacs.org/Knowledge/models_EQ.aspx)
- **Search Functionality**: Search for alerts by location/region
- **Auto-refresh**: Periodically updates alert data
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Detailed Information**: Click on markers to view more details about each alert

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **JavaScript**: Core functionality and API integration
- **Google Maps API**: Map visualization
- **GDACS API**: Real-time disaster data
- **DOM Parser**: XML data processing

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Bhuvanesh66/Disaster-Alert-System.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Disaster-Alert-System
   ```

3. Update the Google Maps API key in `config.js`:
   ```javascript
   GOOGLE_MAPS_API_KEY: "your-api-key-here"
   ```

4. Open `index.html` in your web browser

## 💻 Local Development

1. Make sure you have a valid Google Maps API key
2. Update the configuration in `config.js` if needed
3. Use a local development server to avoid CORS issues:
   - You can use Python's built-in server:
     ```bash
     python -m http.server 8000
     ```
   - Or Node's http-server:
     ```bash
     npx http-server
     ```
4. Access the application at `http://localhost:8000` or the port provided by your local server

## 📱 Features & Usage

1. **View Alerts**:
   - All current disaster alerts are displayed on the map
   - Click on markers to view detailed information

2. **Search**:
   - Use the search bar to find alerts in specific regions
   - Click the search icon or press Enter to search

3. **Refresh**:
   - Click the refresh icon to fetch the latest alerts
   - Data auto-refreshes every 5 minutes

4. **Alert Details**:
   - View alert title, description, and severity
   - Click "More info" for detailed information from GDACS

## 🔧 Configuration

The application can be configured through `config.js`:
- API endpoints
- Update intervals
- Map default settings
- Location coordinates for search
- Proxy settings for API calls

## 🌟 Future Enhancements

- Filter alerts by disaster type
- Custom alert notifications
- Historical data visualization
- Weather data integration
- Mobile app version
- Enhanced search capabilities
- User preferences storage

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

- **Bhuvanesh**
- GitHub: [@Bhuvanesh66](https://github.com/Bhuvanesh66)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/Bhuvanesh66/Disaster-Alert-System/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💌 Support

Give a ⭐️ if you like this project!

## 🙏 Acknowledgments

- GDACS for providing the disaster alert data
- Google Maps Platform for the mapping functionality
- All contributors who help improve this project
