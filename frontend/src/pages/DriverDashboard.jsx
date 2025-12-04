
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
    const rejectRide = () => {
        if (!request) return;
        socket.emit('decline_ride', { rideId: request.rideId, driverId: user._id });
        setRequest(null); 
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white min-h-screen border-x">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Driver Portal</h1>
                <div className="flex gap-2">
                    <Link to="/history" className="text-blue-600 text-sm font-semibold pt-2">History</Link>
                    <button 
                        onClick={toggleAvailability}
                        className={`px-4 py-2 text-sm rounded-full font-bold ${isOnline ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                        {isOnline ? "Online" : "Offline"}
                    </button>
                </div>
            </div>

            {request && (
                <div className="bg-yellow-100 p-5 rounded-lg border border-yellow-400 shadow-lg mb-6">
                    <h3 className="font-bold text-lg text-yellow-800">New Ride Request!</h3>
                    {/* ... details ... */}
                    <div className="flex gap-2 mt-3">
                        <button onClick={rejectRide} className="flex-1 bg-red-500 text-white py-3 rounded-lg font-bold">
                            Reject
                        </button>
                        <button onClick={acceptRide} className="flex-1 bg-black text-white py-3 rounded-lg font-bold">
                            Accept
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
};
export default DriverDashboard;
