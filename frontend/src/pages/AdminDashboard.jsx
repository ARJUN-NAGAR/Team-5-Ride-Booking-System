import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [pendingDrivers, setPendingDrivers] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchPendingDrivers();
    }, []);

    const fetchPendingDrivers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/pending-drivers');
            setPendingDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const handleVerify = async (driverId) => {
        try {
            await axios.post('http://localhost:5000/api/admin/verify-driver', { driverId });
            alert('Driver verified successfully!');
            fetchPendingDrivers();
        } catch (error) {
            console.error('Verification error:', error);
            alert('Failed to verify driver');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-black text-white p-4 flex justify-between">
                    <h2 className="text-xl font-bold">Admin Dashboard</h2>
                    <button onClick={() => {
                        localStorage.removeItem('userInfo');
                        navigate('/');
                    }} className="text-sm underline">Logout</button>
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Pending Driver Verifications</h3>
                    
                    {pendingDrivers.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No pending verifications</p>
                    ) : (
                        <div className="space-y-4">
                            {pendingDrivers.map((driver) => (
                                <div key={driver._id} className="border rounded-lg p-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">{driver.name}</p>
                                        <p className="text-sm text-gray-600">{driver.email}</p>
                                    </div>
                                    <button
                                        onClick={() => handleVerify(driver._id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Verify Driver
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;