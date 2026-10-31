/**
 * SHAHRAVA — English Translations (Secondary Language)
 */
export const en = {
  brand: {
    name: 'SHAHRAVA',
    latin: 'SHAHRAVA',
    tagline: 'Global Smart City Exploration & Dynamic Visual Identity Platform',
    badge: 'Global Edition'
  },
  nav: {
    discover: 'Discover',
    featured: 'Featured Cities',
    map: 'Interactive Map',
    compare: 'Compare Cities',
    favorites: 'Favorites',
    sound: 'Audio Atmosphere',
    themeToggle: 'Switch Theme',
    langToggle: 'فارسی'
  },
  search: {
    placeholder: 'Search any city or country worldwide (Persian or English)...',
    kbdHint: 'Shortcut',
    quickFilters: 'Quick Filter:',
    allContinents: 'All Continents',
    middleEast: 'Middle East',
    asia: 'Asia',
    europe: 'Europe',
    americas: 'Americas',
    africa: 'Africa',
    oceania: 'Oceania',
    recentSearches: 'Recent Searches',
    clearRecents: 'Clear',
    noResults: 'No destinations found matching your query.',
    searching: 'Searching global Nominatim database...'
  },
  hero: {
    explorePrompt: 'Begin a virtual voyage into the beating heart of the city',
    liveWeather: 'Live Weather',
    localTime: 'Local Time',
    coordinates: 'Coordinates',
    population: 'Total Population',
    elevation: 'Elevation',
    area: 'Urban Area',
    density: 'Population Density',
    meters: 'm',
    sqKm: 'km²',
    personsPerSqKm: 'people / km²',
    surpriseMe: 'Surprise Me with a City',
    compareAction: 'Add to Compare',
    favoriteAction: 'Add to Favorites',
    favoritedAction: 'Saved to Favorites',
    viewAttractions: 'Explore Landmarks',
    viewCharts: 'Climate & Growth Data'
  },
  weather: {
    title: 'Atmospheric Conditions & Open-Meteo Forecast',
    feelsLike: 'Feels Like',
    humidity: 'Relative Humidity',
    windSpeed: 'Wind Speed',
    precipitation: 'Precipitation Chance',
    uvIndex: 'UV Index',
    hourlyForecast: '24-Hour Forecast',
    dailyForecast: '7-Day Outlook',
    liveDataBadge: 'Live Open-Meteo Satellite Data',
    kmh: 'km/h',
    percent: '%',
    mm: 'mm'
  },
  visualizations: {
    climateTitle: 'Annual Climate Cycle & Precipitation Pattern',
    climateSubtitle: 'Interactive D3.js chart: Monthly high/low temperatures & precipitation volume',
    highTemp: 'High Temp (°C)',
    lowTemp: 'Low Temp (°C)',
    rainfall: 'Monthly Rainfall (mm)',
    month: 'Month',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthsEnShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    populationTitle: 'Historical Population Trajectory & Growth',
    populationSubtitle: 'Interactive D3.js area chart with historical census metrics from 1950 to present',
    year: 'Year',
    inhabitants: 'Population (Millions)',
    comparisonTitle: 'Multi-Dimensional City Comparison (D3 Radar)',
    comparisonSubtitle: 'Comparing livability, density, elevation, climate balance and cultural heritage',
    globeTitle: 'Planetary Position & Orthographic View',
    globeSubtitle: 'Interactive D3 3D Globe Projection — Click and drag to rotate'
  },
  attractions: {
    title: 'Signature Landmarks, Heritage & Urban Wonders',
    subtitle: 'Historical, cultural, and architectural highlights located on the interactive map',
    filterAll: 'All Categories',
    filterHistorical: 'Historical',
    filterCultural: 'Cultural',
    filterArchitectural: 'Modern Architecture',
    filterNature: 'Parks & Nature',
    filterMuseums: 'Museums',
    filterShopping: 'Bazaars & Shopping',
    viewOnMap: 'Pin on Map',
    readMoreWiki: 'Read on Wikipedia',
    noAttractionsFound: 'No landmarks found in this category.'
  },
  comparisonModal: {
    title: 'Global City Comparison Table',
    subtitle: 'Simultaneously analyze two metropolitan centers across climate, population, and culture',
    city1Label: 'First City:',
    city2Label: 'Second City:',
    radarChart: 'Comparative Spider Chart (D3 Radar)',
    metrics: {
      population: 'Population',
      density: 'Density',
      elevation: 'Elevation',
      climateMildness: 'Climate Mildness',
      heritage: 'Historical Heritage',
      attractionsCount: 'Landmark Variety'
    },
    vs: 'VS',
    winner: 'Higher Metric',
    close: 'Close Comparison'
  },
  favoritesModal: {
    title: 'Your Bookmarked Cities',
    emptyTitle: 'No cities saved yet',
    emptyDesc: 'Click the heart icon on any city card to save it here for instant access.',
    exploreBtn: 'Discover Cities'
  },
  soundModal: {
    title: 'City Sound Atmosphere',
    activeThemeSound: 'Theme-Specific Resonance Harmony',
    tip: 'Audio frequencies are synthesized live using the browser Web Audio API tailored to each city identity.'
  },
  footer: {
    aboutTitle: 'About SHAHRAVA Platform',
    aboutText: 'SHAHRAVA is an advanced frontend platform for exploring global cities through dynamic visual identities, D3.js data visualizations, and live geospatial APIs.',
    apiCredits: 'Powered by Open-Meteo, OpenStreetMap, Nominatim, Wikimedia, and REST Countries',
    rights: 'All rights reserved — Crafted with modern web engineering standards.'
  },
  errors: {
    fetchWeather: 'Failed to retrieve live weather data from Open-Meteo server.',
    fetchCity: 'City details not found. Please verify your connection.',
    networkRetry: 'Retry Request'
  }
};
