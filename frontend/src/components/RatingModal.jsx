import React, { useState } from 'react';
import axios from 'axios';

const RatingModal = ({ rideId, onClose }) => {
    const [rating, setRating] = useState(5);

    const submitRating = async () => {
        try {
            await axios.post('http://localhost:5000/api/rides/rate', { rideId, rating });
            alert("Thanks for rating!");
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
                <h2 className="text-xl font-bold mb-4">Rate your Driver</h2>
                <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                            key={star} 
                            onClick={() => setRating(star)}
                            className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <button 
                    onClick={submitRating}
                    className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
                >
                    Submit Rating
                </button>
            </div>
        </div>
    );
};

export default RatingModal;
