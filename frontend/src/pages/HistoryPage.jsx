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
                const { data } = await axios.get(http://localhost:5000/api/rides/history/${user.role}/${user._id});
                setRides(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHistory();
    }, []);

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
                            <div className="flex justify-between mb-1">
                                <span className={px-2 py-0.5 rounded text-xs font-bold uppercase ${ride.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}}>
                                    {ride.status}
                                </span>
                                <span className="font-bold">${ride.fare}</span>
                            </div>
                            <p className="text-sm text-gray-800 truncate"><strong>From:</strong> {ride.pickupLocation.address}</p>
                            <p className="text-sm text-gray-800 truncate"><strong>To:</strong> {ride.dropoffLocation.address}</p>
                            <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                <span>{new Date(ride.createdAt).toLocaleDateString()}</span>
                                <span>{ride.rating ? ⭐ ${ride.rating} : 'No Rating'}</span>
                            </div>
                        </div>
                    ))}
                    {rides.length === 0 && <p className="p-4 text-center text-gray-500">No rides yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;