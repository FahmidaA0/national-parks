# 🌳 Planet Over Profit: NYC Parks Funding Disparities

*A data visualization project exposing inequality in New York City park maintenance budgets*

## 🔍 Problem Statement
New York City's parks suffer from severe funding inequality:
- **Wealthy neighborhoods** benefit from private conservancies (e.g., Central Park's $24M private funding)
- **Low-income areas** rely on shrinking public budgets (e.g., Canarsie Park's $62K total budget)
- 80% of private park funding goes to just 5% of parks

## ✨ Features
- **Interactive Map**  
  Visualize funding disparities across all 5 boroughs
- **Park Comparison Tool**  
  Contrast maintenance budgets in different neighborhoods
- **Volunteer Call-to-Action**  
  Find opportunities to support underfunded parks

## 🛠️ Technical Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Mapping**: Mapbox GL JS
- **Data**: NYC OpenData + Manual Research (GeoJSON)
- **Design**: Glassmorphism UI, Responsive Layout

## 🚀 Installation
1. Clone repo:
   ```bash
   git clone https://github.com/FahmidaA0/national-parks.git
   cd national-parks
   
2. Add Mapbox token:
   ```bash
   echo "mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFtZCIsImEiOiJjbWE3Z2R6bWoxMTRqMmpvb2w1bWFoc3JyIn0.MXbj8s15iXVTL05K61apyw'" > config.js
3. Run a local server:
   ```bash
   * VS Code Live Server (recommended)
     1. Open this folder in VS Code.
     2. Right-click index.html → “Open with Live Server.”
   * Node.js “serve” CLI (alternative)

## 🌐 Live Demo
This site is deployed on Netlify:
https://planet-over-profit.netlify.app

## 📊 Data
The data/nyc_parks.geojson file is a FeatureCollection of ~50 NYC parks.
Each Feature has:
- properties:
- park, borough, maintenance_funding, private_funding, volunteers (Boolean)
- geometry: Point with [lng, lat]

"Public green spaces shouldn't depend on zip code wealth"


