
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
