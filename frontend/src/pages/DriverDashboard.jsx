import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriverDashboard = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    
    const [isOnline, setIsOnline] = useState(false);
    const [currentRide, setCurrentRide] = useState(null);
    const [rideRequest, setRideRequest] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'driver') {
            navigate('/');
            return;
        }

        if (!socket) return;

        socket.emit('join_user_room', user._id);

        // Listen for new ride requests
        socket.on('new_ride_request', (data) => {
            console.log('New ride request:', data);
            setRideRequest(data);
            
            // Auto-reject after 15 seconds if not accepted
            setTimeout(() => {
                if (rideRequest && rideRequest.rideId === data.rideId) {
                    handleDecline();
                }
            }, 15000);
        });

        socket.on('ride_accepted', () => {
            setRideRequest(null);
        });

        return () => {
            socket.off('new_ride_request');
            socket.off('ride_accepted');
        };
    }, [socket, user, navigate]);

    const toggleOnlineStatus = async () => {
        try {
            const newStatus = !isOnline;
            await axios.put('http://localhost:5000/api/driver/status', {
                driverId: user._id,
                status: newStatus
            });
            setIsOnline(newStatus);
            
            if (newStatus) {
                startLocationTracking();
            } else {
                stopLocationTracking();
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Failed to update status');
        }
    };

    let locationInterval;

    const startLocationTracking = () => {
        // Simulate location updates every 3 seconds
        locationInterval = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        updateLocation(latitude, longitude);
                    },
                    () => {
                        // Fallback to mock location if geolocation fails
                        const mockLat = 12.9716 + (Math.random() * 0.01 - 0.005);
                        const mockLng = 77.5946 + (Math.random() * 0.01 - 0.005);
                        updateLocation(mockLat, mockLng);
                    }
                );
            }
        }, 3000);
    };

    const stopLocationTracking = () => {
        if (locationInterval) {
            clearInterval(locationInterval);
        }
    };

    const updateLocation = async (lat, lng) => {
        try {
            await axios.put('http://localhost:5000/api/driver/location', {
                driverId: user._id,
                lat,
                lng
            });

            // If on active ride, emit location to rider
            if (currentRide) {
                socket.emit('update_driver_location', {
                    driverId: user._id,
                    riderId: currentRide.riderId,
                    lat,
                    lng
                });
            }
        } catch (error) {
            console.error('Location update error:', error);
        }
    };

    const handleAcceptRide = async () => {
        if (!rideRequest) return;

        try {
            const response = await axios.put('http://localhost:5000/api/ride/accept', {
                rideId: rideRequest.rideId,
                driverId: user._id
            });

            setCurrentRide({
                ...response.data.ride,
                riderId: response.data.ride.rider
            });
            setRideRequest(null);
        } catch (error) {
            console.error('Accept ride error:', error);
            alert('Failed to accept ride. It may have been taken by another driver.');
            setRideRequest(null);
        }
    };

    const handleDecline = () => {
        if (rideRequest) {
            socket.emit('decline_ride', {
                rideId: rideRequest.rideId,
                driverId: user._id
            });
        }
        setRideRequest(null);
    };

    const handleStartTrip = () => {
        if (currentRide) {
            socket.emit('trip_status_update', {
                riderId: currentRide.riderId,
                status: 'started'
            });
            setCurrentRide({ ...currentRide, status: 'STARTED' });
        }
    };

    const handleCompleteTrip = async () => {
        if (!currentRide) return;

        try {
            await axios.put('http://localhost:5000/api/ride/complete', {
                rideId: currentRide._id
            });

            socket.emit('trip_status_update', {
                riderId: currentRide.riderId,
                status: 'completed'
            });

            alert(`Trip completed! Fare: ₹${currentRide.fare}`);
            setCurrentRide(null);
        } catch (error) {
            console.error('Complete ride error:', error);
            alert('Failed to complete ride');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Driver Dashboard</h2>
                    <button 
                        onClick={() => navigate('/history')} 
                        className="text-sm underline"
                    >
                        History
                    </button>
                </div>

                {/* Driver Info */}
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Welcome, {user?.name}!</h3>
                    <p className="text-sm text-gray-600">Driver ID: {user?._id}</p>
                </div>

                {/* Online/Offline Toggle */}
                <div className="p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Status:</span>
                        <button
                            onClick={toggleOnlineStatus}
                            className={`px-6 py-2 rounded-lg font-bold transition ${
                                isOnline 
                                    ? 'bg-green-500 text-white hover:bg-green-600' 
                                    : 'bg-gray-400 text-white hover:bg-gray-500'
                            }`}
                        >
                            {isOnline ? '🟢 ONLINE' : '🔴 OFFLINE'}
                        </button>
                    </div>
                    {isOnline && (
                        <p className="text-xs text-green-600 mt-2">
                            📍 Location tracking active
                        </p>
                    )}
                </div>

                {/* Ride Request Alert */}
                {rideRequest && (
                    <div className="m-4 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg animate-pulse">
                        <h3 className="font-bold text-yellow-800 text-lg mb-2">
                            🔔 NEW RIDE REQUEST!
                        </h3>
                        <div className="space-y-1 text-sm mb-3">
                            <p><strong>Fare:</strong> ₹{rideRequest.fare}</p>
                            <p className="text-xs text-gray-600">
                                Pickup nearby • Accept within 15 seconds
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAcceptRide}
                                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
                            >
                                ✓ ACCEPT
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700"
                            >
                                ✗ DECLINE
                            </button>
                        </div>
                    </div>
                )}

                {/* Current Ride */}
                {currentRide && (
                    <div className="m-4 p-4 bg-blue-50 border-2 border-blue-400 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-lg mb-3">
                            🚗 Active Ride
                        </h3>
                        <div className="space-y-2 text-sm mb-4">
                            <p><strong>Fare:</strong> ₹{currentRide.fare}</p>
                            <p><strong>Status:</strong> {currentRide.status}</p>
                        </div>
                        
                        {currentRide.status !== 'STARTED' ? (
                            <button
                                onClick={handleStartTrip}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
                            >
                                START TRIP
                            </button>
                        ) : (
                            <button
                                onClick={handleCompleteTrip}
                                className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
                            >
                                COMPLETE TRIP
                            </button>
                        )}
                    </div>
                )}

                {/* Waiting State */}
                {!rideRequest && !currentRide && (
                    <div className="p-8 text-center text-gray-500">
                        {isOnline ? (
                            <>
                                <p className="text-lg font-semibold mb-2">
                                    Waiting for ride requests...
                                </p>
                                <p className="text-sm">
                                    You'll be notified when a passenger nearby needs a ride
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-lg font-semibold mb-2">
                                    You're offline
                                </p>
                                <p className="text-sm">
                                    Go online to start receiving ride requests
                                </p>
                            </>
                        )}
                    </div>
                )}

                {/* Logout */}
                <div className="p-4 border-t">
                    <button
                        onClick={() => {
                            stopLocationTracking();
                            localStorage.removeItem('userInfo');
                            navigate('/');
                        }}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;