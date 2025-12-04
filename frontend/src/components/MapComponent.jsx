import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to auto-zoom to fit all markers
const FitBounds = ({ markers }) => {
    const map = useMap();
    useEffect(() => {
        if (markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [markers, map]);
    return null;
};

const MapComponent = ({ pickup, dropoff, driverLocation }) => {
    const defaultCenter = [12.9716, 77.5946]; // Bangalore
    
    // Collect all active points for auto-zoom
    const activeMarkers = [];
    if (pickup) activeMarkers.push(pickup);
    if (dropoff) activeMarkers.push(dropoff);
    if (driverLocation) activeMarkers.push(driverLocation);

    // Trip Route (Pickup -> Dropoff)
    const tripRoute = (pickup && dropoff) 
        ? [[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]] 
        : null;

    // Driver Approach (Driver -> Pickup)
    const approachRoute = (driverLocation && pickup) 
        ? [[driverLocation.lat, driverLocation.lng], [pickup.lat, pickup.lng]] 
        : null;

    return (
        <div className="h-64 w-full rounded-lg overflow-hidden shadow-md relative z-0 border-2 border-white">
            <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                
                {/* Markers */}
                {pickup && <Marker position={[pickup.lat, pickup.lng]}><Popup>Pickup: {pickup.address}</Popup></Marker>}
                {dropoff && <Marker position={[dropoff.lat, dropoff.lng]}><Popup>Dropoff: {dropoff.address}</Popup></Marker>}
                {driverLocation && <Marker position={[driverLocation.lat, driverLocation.lng]}><Popup>Driver</Popup></Marker>}

                {/* Lines */}
                {tripRoute && <Polyline positions={tripRoute} color="blue" weight={4} opacity={0.7} />}
                {approachRoute && <Polyline positions={approachRoute} color="black" dashArray="10, 10" weight={3} />}

                {/* Auto Zoom */}
                <FitBounds markers={activeMarkers} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;