import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'rider' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Registration Successful! Please Login.');
            navigate('/');
        } catch (error) {
            alert('Error Registering');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>
                <input className="w-full mb-2 p-2 border" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input className="w-full mb-2 p-2 border" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
                <input className="w-full mb-2 p-2 border" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
                <select className="w-full mb-4 p-2 border" onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="rider">Rider</option>
                    <option value="driver">Driver</option>
                </select>
                <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
