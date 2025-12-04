import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPendingDrivers();
    }, []);

    const fetchPendingDrivers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/pending-drivers');
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching drivers");
        }
    };

    const verifyDriver = async (driverId) => {
        try {
            await axios.post('http://localhost:5000/api/admin/verify-driver', { driverId });
            alert("Driver Verified!");
            fetchPendingDrivers(); // Refresh list
        } catch (error) {
            alert("Error verifying driver");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
                    <button onClick={() => navigate('/')} className="text-red-500 font-bold">Logout</button>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Pending Driver Verifications</h2>
                
                {drivers.length === 0 ? (
                    <p className="text-gray-500">No pending verifications.</p>
                ) : (
                    <div className="grid gap-4">
                        {drivers.map(driver => (
                            <div key={driver._id} className="border p-4 rounded flex justify-between items-center bg-gray-50">
                                <div>
                                    <p className="font-bold text-lg">{driver.name}</p>
                                    <p className="text-gray-600">{driver.email}</p>
                                    <div className="text-sm mt-1 text-gray-500">
                                        <span className="mr-4">🚗 {driver.vehicleDetails?.model}</span>
                                        <span>🆔 {driver.vehicleDetails?.plateNumber}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => verifyDriver(driver._id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Approve
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;