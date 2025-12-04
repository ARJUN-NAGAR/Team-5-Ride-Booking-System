const calculateFare = (distanceKm) => {
    const BASE_RATE = 50;
    const PER_KM = 12;
    return Math.round(BASE_RATE + (distanceKm * PER_KM));
};

// Simple distance function (can use 'haversine' library instead)
const getDistance = (lat1, lon1, lat2, lon2) => {
    // simplified for hackathon speed (Pythagoras on flat earth for small distances)
    // For production use proper Haversine
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2)) * 111; 
};

module.exports = { calculateFare, getDistance };