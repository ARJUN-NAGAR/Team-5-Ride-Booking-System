import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ pickup, dropoff, driverLocation }) => {
    // Default Center: Bangalore
    const center = [12.9716, 77.5946]; 

    return (
        <div className="h-64 w-full rounded-lg overflow-hidden shadow-md relative z-0">
            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                {pickup && <Marker position={[pickup.lat, pickup.lng]}><Popup>Pickup</Popup></Marker>}
                {dropoff && <Marker position={[dropoff.lat, dropoff.lng]}><Popup>Dropoff</Popup></Marker>}
                {driverLocation && <Marker position={[driverLocation.lat, driverLocation.lng]}><Popup>Driver</Popup></Marker>}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
