import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const RatingModal = ({ rideId, onClose }) => {
    const [rating, setRating] = useState(5);

    const submitRating = async () => {
        try {
            await axios.post('http://localhost:5000/api/rides/rate', { rideId, rating });

            alert("Thanks for rating!");
            onClose();
        } catch (error) {
            console.error(error);

            toast.success("Thanks for rating!");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Error submitting rating");
        }
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
                <h2 className="text-xl font-bold mb-4">Rate your Driver</h2>
                <div className="flex justify-center gap-2 mb-6">

        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center transform transition-all scale-100">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Trip Completed!</h2>
                <p className="text-gray-500 mb-6">How was your driver?</p>
                
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                            key={star} 
                            onClick={() => setRating(star)}

                            className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            className={`text-4xl transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <button 
                    onClick={submitRating}
                    className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
                
                <button 
                    onClick={submitRating}
                    className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
                    Submit Rating
                </button>
            </div>
        </div>
    );
};

export default RatingModal;
