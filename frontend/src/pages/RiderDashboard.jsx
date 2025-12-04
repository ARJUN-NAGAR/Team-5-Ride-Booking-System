

import { Link, useNavigate } from 'react-router-dom'; 
import RatingModal from '../components/RatingModal.jsx'; 

const RiderDashboard = () => {
    const navigate = useNavigate();
    const [showRating, setShowRating] = useState(false); 
    const [completedRideId, setCompletedRideId] = useState(null); 

    useEffect(() => {
        socket.on('trip_status_update', (data) => {
            setStatus(`Trip Status: ${data.status}`);
            if(data.status === 'completed') {
    
                setShowRating(true); 
            }
        });
        
        socket.on('ride_accepted', (data) => {
             setStatus(`Driver ${data.driver.name} Accepted!`);
             setCompletedRideId(data.rideId); 
        });

    }, [socket]);

    return (
        <div className="p-4 max-w-md mx-auto bg-white min-h-screen border-x">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Hello, {user?.name}</h1>
                <Link to="/history" className="text-blue-600 text-sm font-semibold">History</Link>
            </div>
            
            <MapComponent pickup={pickup} dropoff={dropoff} driverLocation={driverLocation} />

             <div className="mt-6">

import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import MapComponent from '../components/MapComponent';

const RiderDashboard = () => {
    const socket = useSocket();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    
    // Hardcoded locations for Demo
    const [pickup] = useState({ lat: 12.9716, lng: 77.5946, address: "MG Road" });
    const [dropoff] = useState({ lat: 12.9352, lng: 77.6245, address: "Koramangala" });
    
    const [status, setStatus] = useState("Idle");
    const [driverLocation, setDriverLocation] = useState(null);

    useEffect(() => {
        if (!socket) return;
        socket.emit('join_room', user._id);

        socket.on('ride_accepted', (data) => {
            setStatus(`Driver ${data.driver.name} Accepted!`);
        });

        socket.on('driver_live_location', (coords) => {
            setDriverLocation(coords);
        });

        socket.on('trip_status_update', (data) => {
            setStatus(`Trip Status: ${data.status}`);
            if(data.status === 'completed') alert("Trip Completed! Please pay $15.");
        });

        socket.on('no_drivers_found', () => setStatus("No drivers nearby."));

        return () => socket.off();
    }, [socket]);

    const requestRide = () => {
        setStatus("Searching for Driver...");
        socket.emit('request_ride', { riderId: user._id, pickup, dropoff });
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white min-h-screen border-x">
            <h1 className="text-xl font-bold mb-4">Hello, {user?.name}</h1>
            <MapComponent pickup={pickup} dropoff={dropoff} driverLocation={driverLocation} />
            
            <div className="mt-4 bg-gray-50 p-4 rounded shadow-sm">
                <p className="text-gray-600 text-sm">Pickup</p>
                <p className="font-semibold">{pickup.address}</p>
                <div className="h-4 border-l-2 border-gray-300 ml-1 my-1"></div>
                <p className="text-gray-600 text-sm">Dropoff</p>
                <p className="font-semibold">{dropoff.address}</p>
            </div>

            <div className="mt-6">

                <p className="text-center font-bold text-blue-600 mb-2">{status}</p>
                {status === "Idle" && (
                    <button onClick={requestRide} className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800">
                        Request Ride
                    </button>
                )}
            </div>

            {showRating && completedRideId && (
                <RatingModal rideId={completedRideId} onClose={() => setShowRating(false)} />
            )}
        </div>
    );
};
export default RiderDashboard;
=======
        </div>
    );
};

export default RiderDashboard;

