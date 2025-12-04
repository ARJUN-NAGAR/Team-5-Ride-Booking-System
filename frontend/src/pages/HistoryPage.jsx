import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
    const [rides, setRides] = useState([]);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return navigate('/');
        
        const fetchHistory = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/ride/history`, {
                    params: {
                        userId: user._id,
                        role: user.role
                    }
                });
                setRides(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHistory();
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'ACCEPTED': return 'bg-blue-100 text-blue-800';
            case 'STARTED': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-lg mx-auto bg-white rounded shadow-md overflow-hidden">
                <div className="bg-black text-white p-4 flex justify-between">
                    <h2 className="text-xl font-bold">Your Trips</h2>
                    <button onClick={() => navigate(-1)} className="text-sm underline">Back</button>
                </div>
                
                <div className="divide-y divide-gray-200">
                    {rides.map((ride) => (
                        <div key={ride._id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between mb-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getStatusColor(ride.status)}`}>
                                    {ride.status}
                                </span>
                                <span className="font-bold text-lg">₹{ride.fare}</span>
                            </div>
                            
                            {user.role === 'rider' && ride.driver && (
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Driver:</strong> {ride.driver.name}
                                </p>
                            )}
                            
                            {user.role === 'driver' && ride.rider && (
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Rider:</strong> {ride.rider.name}
                                </p>
                            )}
                            
                            <div className="mt-2 text-xs text-gray-500">
                                <span>{new Date(ride.createdAt).toLocaleDateString()} at {new Date(ride.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))}
                    {rides.length === 0 && (
                        <p className="p-8 text-center text-gray-500">No rides yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;